<template>
  <div id="Properties">
    <AdminLayout />

    <v-row class="m-0 mt-6">
      <v-col md="12" cols="12" class="  pa-0 ">
        <v-card flat class="h-25  ma-0 pa-0">
          <!-- Table Card -->
          <v-app-bar height="60" tile flat>
            MANAGE PROPERTIES
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              hide-details
              dense
              class="shrink mx-4 my-4"
            ></v-text-field>
            <!-- desc -->
            <v-btn icon small text>
              <v-icon small>mdi-sort-descending</v-icon>
            </v-btn>
            <!-- asc -->
            <v-btn icon small text>
              <v-icon small>mdi-sort-ascending</v-icon>
            </v-btn>
            <!-- filter options -->
            <v-menu left origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small text v-bind="attrs" v-on="on">
                  <v-icon small>mdi-filter</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(i, index) in filterOptions" :key="index">
                  <v-list-item-title>{{ i.option }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- exports -->
            <v-btn icon small text>
              <v-icon small>mdi-file-export</v-icon>
            </v-btn>

            <!-- print -->
            <v-btn icon small text>
              <v-icon small>mdi-printer</v-icon>
            </v-btn>

            <!-- copy to clipboard -->
            <v-btn icon small text>
              <v-icon small>mdi-content-copy</v-icon>
            </v-btn>

            <!-- add -->
            <v-btn icon small text @click="newItem">
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </v-app-bar>

          <!-- DataTable -->
          <v-data-table
            :headers="headers"
            height="750px"
            :items="products"
            :search="search"
            :single-select="singleSelect"
            :itemsPerPage="20"
            :footer-props="{
              'items-per-page-options': [5, 20, 30, 40, 50, -1],
            }"
            dense
            item-key="id"
            :fixed-header="true"
          >
            <!-- id -->
            <template v-slot:[`item.id`]="{ item, index }">
              <!-- state & id -->
              <div class="row float float-left ml-2">
                <div
                  class="bg-danger active_state "
                  v-if="item.state === 'pending'"
                ></div>

                <div
                  class="bg-success active_state "
                  v-if="item.state === 'active'"
                ></div>
                <p class="m-1">{{ index + 1 }}</p>
              </div>
            </template>

            <!-- checkbox -->
            <template v-slot:[`item.check`]="{ item }">
              <div class="row  m-0">
                <div>
                  <v-checkbox
                    class="p-0 m-0"
                    color="indigo"
                    :value="item"
                    @change="selectedCheckbox($event)"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </template>

            <!-- actions -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                icon
                class="mr-2 blue-grey lighten-3"
                color="white"
                small
                @click="editItem(item)"
              >
                <v-icon x-small>
                  mdi-content-copy
                </v-icon>
              </v-btn>

              <v-btn
                icon
                class="mr-2 orange darken-2"
                color="white"
                small
                @click="editItem(item)"
              >
                <v-icon x-small>
                  mdi-pencil
                </v-icon>
              </v-btn>

              <v-btn
                icon
                class="mr-2 bg-danger"
                color="white"
                small
                @click="editItem(item)"
              >
                <v-icon x-small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <!-- Dialog -->
          <v-dialog
            v-model="FormDialog"
            max-width="1100px"
            persistent
            content-class="form-dialog"
            scrollable
          >
            <v-card>
              <v-card-title class="cyan lighten-4 pt-1 pb-1 pa-0 pl-5 pr-5">
                <span class="headline">{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <v-btn icon text @click="closeFormDialog"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-card-title>
              <v-card-text class="  pa-0  ">
                <v-container class="  ma-0">
                  <!-- form -->
                  <ValidationObserver ref="form">
                    <v-row class="pa-0 ma-0 pt-3">
                      <v-col cols="6" sm="6" md="4" class=" pl-3">
                        <ValidationProvider
                          rules="required|min:5"
                          name="Propery Name"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.PropertyName"
                            :label="errors[0] ? errors[0] : 'Property Name'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="6" sm="6" md="2" class=" pl-3">
                        <ValidationProvider
                          rules="required|numeric"
                          name="Rent Amount"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.RentAmount"
                            :label="errors[0] ? errors[0] : 'Rent Amount'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-currency-usd
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="6" sm="6" md="2" class=" pl-3">
                        <ValidationProvider
                          rules="required|numeric"
                          name="Deposit Amount"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.DepositAmount"
                            :label="errors[0] ? errors[0] : 'Deposit Amount'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-currency-usd
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="6" sm="6" md="4" class=" pl-3">
                        <v-menu
                          ref="DatePickerMenu"
                          v-model="editedItem.DatePickerMenu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <ValidationProvider
                              rules="required"
                              name="Availability"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                class="pa-0"
                                dense
                                v-model="date"
                                :label="errors[0] ? errors[0] : 'Availability'"
                                :error-messages="errors"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              >
                                <template v-slot:prepend-inner>
                                  <v-icon small>
                                    mdi-calendar
                                  </v-icon>
                                </template>
                              </v-text-field>
                            </ValidationProvider>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="DatePickerMenu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.DatePickerMenu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class=" pl-3">
                        <ValidationProvider
                          rules="required|numeric"
                          name="Rental Period"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.RentalPeriod"
                            :label="errors[0] ? errors[0] : 'Rental Period'"
                            :error-messages="errors"
                            dense
                            :suffix="
                              editedItem.RentalPeriod == 1 ? 'Month' : 'Months'
                            "
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class=" pl-3">
                        <ValidationProvider
                          rules="required|numeric"
                          name="Suitable for"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.Suitable"
                            :label="errors[0] ? errors[0] : 'Suitable for'"
                            :error-messages="errors"
                            dense
                            :suffix="
                              editedItem.Suitable == '1' ? 'Person' : 'Persons'
                            "
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <!-- cleaning -->
                      <v-col cols="6" sm="6" md="6" class=" pl-3">
                        <ValidationProvider
                          rules="required"
                          name="Cleaning"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.Cleaning"
                            :label="errors[0] ? errors[0] : 'Cleaning'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="6" sm="6" md="3" class=" pl-3">
                        <ValidationProvider
                          rules="required"
                          name="Size"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.Size"
                            :label="errors[0] ? errors[0] : 'Size'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class=" pl-3">
                        <ValidationProvider
                          rules="required"
                          name="Pets"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="pa-0"
                            v-model="editedItem.pets"
                            :label="errors[0] ? errors[0] : 'Pets'"
                            :error-messages="errors"
                            dense
                            hide-details=""
                          >
                            <template v-slot:prepend-inner>
                              <v-icon small>
                                mdi-pencil
                              </v-icon>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class=" pl-3">
                        <!-- <ValidationProvider
                          rules="required"
                          name="image"
                          v-slot="{ errors }"
                        > -->
                        <v-file-input
                          truncate-length="15"
                          :error-messages="errors"
                          dense
                          hide-details=""
                          multiple
                          accept="image/*"
                          @change="onImageUpload($event)"
                          :label="errors[0] ? errors[0] : 'Upload Images'"
                        ></v-file-input>
                        <!-- </ValidationProvider> -->
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        class="d-flex justify-center align-center "
                      >
                        <v-col
                          cols="2"
                          md="2"
                          sm="1"
                          v-for="(item, i) in images_arr"
                          :key="i"
                          class="blue-grey lighten-3 ma-1 pa-1 rounded "
                        >
                          <v-menu open-on-hover top offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-avatar size="50">
                                <v-img
                                  :src="item"
                                  width="75"
                                  height="75"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-img>
                              </v-avatar>
                            </template>

                            <v-list>
                              <v-img
                                :src="item"
                                width="100%"
                                height="200px"
                              ></v-img>
                            </v-list>
                          </v-menu>

                          <v-btn icon color="red" @click="removeImage(item, i)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-col>
                      <!-- 
                      <v-card class="mx-auto" max-width="300" tile>
                        <v-list flat>
                          <v-subheader>Images</v-subheader>
                          <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                          >
                            <v-list-item
                              v-for="(item, i) in images_arr"
                              :key="i"
                            >
                              <v-list-item-content>
                                <v-avatar>
                                  <v-img
                                    :src="item"
                                    width="100"
                                    height="100"
                                  ></v-img>
                                </v-avatar>
                              </v-list-item-content>
                              <v-list-item-icon>
                                <v-btn icon color="red" small>
                                  <v-icon>mdi-delete</v-icon></v-btn
                                >
                              </v-list-item-icon>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card> -->
                    </v-row>
                  </ValidationObserver>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text>
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminLayout from "../../components/AdminLayout";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "Properties",
  components: {
    AdminLayout,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      products: [],
      filterOptions: [
        { option: "option 1" },
        { option: "option 2" },
        { option: "option 3" },
        { option: "option 4" },
      ],
      date: "",
      DatePickerMenu: false,
      singleSelect: false,
      FormDialog: true,
      selected: [],
      search: "",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
          width: "4%",
        },
        {
          type: "checkbox",
          align: "start",
          sortable: false,
          value: "check",
          width: "4%",
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "PropertyName",
        },
        {
          text: "Description",
          align: "start",
          sortable: true,
          value: "description",
        },
        { text: "Actions", value: "actions", sortable: false, width: "12%" },
      ],
      selectedData: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      images_arr: [],
      img: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Property" : "Edit Property";
    },
  },

  mounted() {
    this.products = [
      {
        id: 1,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 2,
        PropertyName: "bcd",
        description: "example description",
        state: "active",
      },
      {
        id: 3,
        PropertyName: "efg",
        description: "example description",
        state: "pending",
      },
      // {
      //   id: 4,
      //   PropertyName: "bcd",
      //   description: "example description",
      //   state: "active",
      // },
      // {
      //   id: 5,
      //   PropertyName: "efg",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 6,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 7,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 8,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 9,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 10,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 11,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 12,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 13,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 14,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 15,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 16,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 17,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 18,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 19,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 20,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 21,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 22,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 23,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 24,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 25,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
      // {
      //   id: 26,
      //   PropertyName: "abc",
      //   description: "example description",
      //   state: "pending",
      // },
    ];
  },
  methods: {
    selectedCheckbox(i) {
      this.selectedData.push(i);
      console.log(this.selectedData);
    },
    closeFormDialog() {
      this.FormDialog = false;
    },
    newItem() {
      this.FormDialog = true;
    },
    editItem(item) {
      console.log(item);

      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.FormDialog = true;
    },
    onImageUpload(e) {
      console.log(e);
      this.images_arr.splice(0);

      e.forEach((element) => {
        console.log(element);
        let reader = new FileReader();
        reader.onload = (fileArray) => {
          // console.log(reader.result);
          this.images_arr.push(reader.result);
        };
        reader.readAsDataURL(element);
      });
    },
    removeImage(e, i) {
      console.log(i);
      this.images_arr.splice(i, 1);
    },
    save() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        console.log("form saved");

        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], this.editedItem);
          console.log("update");
        } else {
          this.products.push(this.editedItem);
          console.log("saved");
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
          });
        }

        this.$nextTick(() => {
          this.$refs.form.reset();
          console.log("cleared");
        });
      });
    },
  },
};
</script>

<style scropped>
.active_state {
  padding-left: 3px;
  width: 3px;
  height: 25px;
}
.form-dialog {
  align-self: flex-start;
  position: relative;
  top: 90px;
}
</style>
