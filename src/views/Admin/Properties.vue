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
            <v-btn icon small text>
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
         
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminLayout from "../../components/AdminLayout";

export default {
  name: "Properties",
  components: {
    AdminLayout,
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
          value: "name",
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
    };
  },
  mounted() {
    this.products = [
      {
        id: 1,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 2,
        name: "bcd",
        description: "example description",
        state: "active",
      },
      {
        id: 3,
        name: "efg",
        description: "example description",
        state: "pending",
      },
      {
        id: 4,
        name: "bcd",
        description: "example description",
        state: "active",
      },
      {
        id: 5,
        name: "efg",
        description: "example description",
        state: "pending",
      },
      {
        id: 6,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 7,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 8,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 9,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 10,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 11,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 12,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 13,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 14,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 15,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 16,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 17,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 18,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 19,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 20,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 21,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 22,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 23,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 24,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 25,
        name: "abc",
        description: "example description",
        state: "pending",
      },
      {
        id: 26,
        name: "abc",
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
