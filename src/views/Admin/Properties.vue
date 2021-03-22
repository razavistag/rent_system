<template>
  <div id="Properties">
    <AdminLayout />

    <v-row class="m-0">
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
                class="mr-2 bg-success"
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
                class="mr-2 bg-primary"
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
          <v-dialog v-model="FormDialog" max-width="90%" persistent>
            <v-card>
              <v-card-title class="cyan lighten-4 pt-1 pb-1 pa-0 pl-5 pr-5">
                <span class="headline">{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <v-btn icon text @click="closeFormDialog"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-card-title>
              <v-card-text class="  pa-0  ">
                <v-container class=" pa-0  ma-0">
                  <!-- form -->
                  <ValidationObserver ref="form">
                    <v-row class="pa-0 ma-0 pt-3">
                      <v-col cols="12" sm="6" md="4" class="pa-0 pl-1">
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

                      <v-col cols="12" sm="2" md="2" class="pa-0 pl-1">
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

                      <v-col cols="12" sm="2" md="2" class="pa-0 pl-1">
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
                    </v-row>
                  </ValidationObserver>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text>
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text>
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
      singleSelect: false,
      FormDialog: false,
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
      {
        id: 4,
        PropertyName: "bcd",
        description: "example description",
        state: "active",
      },
      {
        id: 5,
        PropertyName: "efg",
        description: "example description",
        state: "pending",
      },
      {
        id: 6,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 7,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 8,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 9,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 10,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 11,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 12,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 13,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 14,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 15,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 16,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 17,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 18,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 19,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 20,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 21,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 22,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 23,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 24,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 25,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 26,
        PropertyName: "abc",
        description: "example description",
        state: "pending",
      },
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
  },
};
</script>

<style scropped>
.active_state {
  padding-left: 3px;
  width: 3px;
  height: 25px;
}
</style>
