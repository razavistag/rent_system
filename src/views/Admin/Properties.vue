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
            dense
            item-key="id"
            :fixed-header="true"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
            :footer-props="{
              'items-per-page-options': [5, 20, 30, 40, 50, -1],
            }"
          >
            <!-- Expandable Row -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="bg-danger pa-4">
                {{ item.PropertyName }}
              </td>
            </template>

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

            <!-- name -->
            <template v-slot:[`item.PropertyName`]="{ item }">
              {{ item.PropertyName.substring(0, 20) }}
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
                @click="copyContent(item)"
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
                @click="deleteItem(item)"
              >
                <v-icon x-small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <!--Form  Dialog -->
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
              <v-card-text class="  pa-0  h-100  h-75">
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
                        <!-- date time picker -->
                        <!-- <v-menu
                          ref="DatePickerMenu"
                          v-model="DatePickerMenu"
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
                        </v-menu> -->
                        <v-menu
                          v-model="DatePickerMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
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
                                v-model="editedItem.DatePicker"
                                prepend-icon="mdi-calendar"
                                readonly
                                dense
                                :label="errors[0] ? errors[0] : 'Availability'"
                                :error-messages="errors"
                                hide-details=""
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </ValidationProvider>
                          </template>
                          <v-date-picker
                            v-model="editedItem.DatePicker"
                            @input="DatePickerMenu = false"
                          ></v-date-picker>
                        </v-menu>
                        <!-- {{ editedItem.DatePicker }}
                        {{ date }} 
                        date-->
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
                            v-model="editedItem.Pets"
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

                      <v-col cols="12" sm="6" md="6" class="pl-3">
                        <!-- <ValidationProvider
                          rules="required"
                          name="image"
                          v-slot="{ errors }"
                        >
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
                        </ValidationProvider> -->

                        <!-- <ValidationProvider
                          rules="required"
                          name="image"
                          v-slot="{ errors }"
                        >
                           <vue-upload-multiple-image
                            :error-messages="errors"
                            :dragText="'Upload Image'"
                            :errorFound="errors[0]"
                            browseText="Drag or Browse"
                            primaryText="Added"
                            markIsPrimaryText=""
                            :showPrimary="true"
                            v-model="imageSelected"
                            :maxImage="10"
                            popupText=" "
                            dropText="Drag Here"
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            @data-change="dataChange"
                            :data-images="images"
                          ></vue-upload-multiple-image>
                        </ValidationProvider> -->

                        <div
                          style="outline: none;"
                          @drag="preventEvent"
                          @dragstart="preventEvent"
                          @dragend="preventEvent"
                          @dragover="preventEvent"
                          @dragenter="preventEvent"
                          @dragleave="preventEvent"
                          @drop="preventEvent"
                        >
                          <div
                            class="image-container position-relative text-center"
                            v-if="!images.length"
                          >
                            <div
                              class="drag-upload-cover position-absolute"
                              v-if="isDragover"
                              @drop="onDrop"
                            >
                              <div
                                class="centered full-width text-center text-primary"
                              >
                                <v-icon>mdi-drop</v-icon>
                                <h4 class="drop-text-here">
                                  <b>{{ dropText }}</b>
                                </h4>
                              </div>
                            </div>
                            <div
                              v-else
                              class="image-center position-absolute display-flex flex-column justify-content-center align-items-center"
                              @dragover.prevent="onDragover"
                            >
                              <div>
                                <v-icon>mdi-hand</v-icon>
                              </div>
                              <div class="text-center">
                                <label
                                  class="drag-text text-danger"
                                  v-if="errorFound"
                                >
                                  Image file is required
                                </label>

                                <label class="drag-text" v-else>
                                  {{ dragText }}
                                </label>

                                <br />
                                <a class="browse-text">{{ browseText }}</a>
                              </div>
                              <div
                                class="image-input position-absolute full-width full-height"
                              >
                                <label
                                  :for="idUpload"
                                  class="full-width full-height cursor-pointer"
                                >
                                </label>
                              </div>
                            </div>
                          </div>

                          <div
                            class="image-container position-relative text-center image-list"
                            v-else
                          >
                            <div
                              class="drag-upload-cover position-absolute"
                              v-if="isDragover"
                              @drop="onDrop"
                            >
                              <div
                                class="centered full-width text-center text-primary"
                              >
                                <h4 class="drop-text-here">
                                  <b>{{ dropText }}</b>
                                </h4>
                              </div>
                            </div>
                            <div v-else @dragover.prevent="onDragover">
                              <div
                                class="preview-image full-width position-relative cursor-pointer"
                                @click="openGallery(currentIndexImage)"
                              >
                                <div
                                  class="image-overlay position-relative full-width full-height"
                                ></div>
                                <div class="image-overlay-details full-width">
                                  <v-icon color="white" size="60">
                                    mdi-magnify-scan
                                  </v-icon>
                                </div>
                                <!-- {{ errorFound }} -->
                                <!-- single Image Preview -->
                                <div class="show-image centered">
                                  <img
                                    class="show-img img-responsive"
                                    :src="imagePreview"
                                  />
                                </div>
                              </div>

                              <div
                                class="image-bottom display-flex position-absolute full-width align-items-center justify-content-between"
                                :class="!showPrimary && 'justify-content-end'"
                              >
                                <div
                                  class="image-bottom-left display-flex align-items-center"
                                  v-if="showPrimary"
                                >
                                  <div
                                    class="display-flex align-items-center"
                                    v-show="imageDefault"
                                  ></div>
                                  <a
                                    class="text-small mark-text-primary cursor-pointer"
                                    @click.prevent="
                                      markIsPrimary(currentIndexImage)
                                    "
                                    v-show="!imageDefault"
                                  >
                                    {{ markIsPrimaryText }}
                                  </a>
                                </div>

                                <div class="display-flex">
                                  <v-btn
                                    icon
                                    @click="
                                      cropDialogOpener(
                                        images[currentIndexImage]
                                      )
                                    "
                                  >
                                    <v-icon size="20">mdi-crop</v-icon>
                                  </v-btn>

                                  <!-- Crop Dialog -->
                                  <v-dialog
                                    v-model="cropDialog"
                                    width="500"
                                    persistent
                                  >
                                    <v-card>
                                      <v-card-title
                                        class="headline grey lighten-2"
                                      >
                                        CROP IMAGE
                                        <v-spacer></v-spacer>
                                        <v-icon @click="cropDialog = false"
                                          >mdi-close</v-icon
                                        >
                                      </v-card-title>

                                      <v-card-text class="pa-2">
                                        <Cropper
                                          :src="currentCropperImage"
                                          @change="change"
                                          :stencil-props="{
                                            movable: true,
                                            scalable: true,
                                            aspectRatio: 1,
                                          }"
                                        >
                                        </Cropper>
                                      </v-card-text>
                                      <v-divider></v-divider>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue" text>
                                          CANCEL
                                        </v-btn>
                                        <v-btn
                                          color="success"
                                          text
                                          @click="
                                            CropImage(images[currentIndexImage])
                                          "
                                        >
                                          CROP
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                  <label
                                    v-if="showEdit"
                                    class="image-edit display-flex cursor-pointer ma-1 pa-0 "
                                    :for="idEdit"
                                  >
                                    <v-icon color="blue" size="20"
                                      >mdi-pencil</v-icon
                                    >
                                  </label>

                                  <v-btn
                                    v-if="showDelete"
                                    icon
                                    @click.prevent="
                                      deleteImage(currentIndexImage)
                                    "
                                  >
                                    <v-icon color="red" size="20"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="image-list-container display-flex flex-wrap"
                            v-if="images.length && multiple"
                          >
                            <div
                              class="image-list-item position-relative cursor-pointer"
                              :class="image.highlight && 'image-highlight'"
                              v-for="(image, index) in images"
                              :key="index"
                              @click="changeHighlight(index)"
                            >
                              <!-- mini Image near to add button -->
                              <div class="centered">
                                <img
                                  class="show-img img-responsive"
                                  :src="image.path"
                                />
                              </div>
                            </div>
                            <div
                              class="image-list-item position-relative cursor-pointer display-flex justify-content-center align-items-center"
                              v-if="images.length < maxImage && showAdd"
                            >
                              <v-icon>mdi-plus</v-icon>

                              <div
                                class="input-add-image position-absolute full-width full-height"
                              >
                                <label
                                  :for="idUpload"
                                  class="display-block full-width full-height cursor-pointer"
                                >
                                </label>
                              </div>
                            </div>
                            <div
                              class="image-list-item position-relative cursor-pointer display-flex justify-content-center align-items-center"
                              v-if="images.length < maxImage && showAdd"
                            >
                              <v-icon color="green" @click="saveCropperImages"
                                >mdi-marker-check</v-icon
                              >
                            </div>
                          </div>

                          <div>
                            <input
                              :id="idUpload"
                              class="display-none"
                              @change="uploadFieldChange"
                              name="images"
                              :multiple="multiple"
                              :accept="accept"
                              type="file"
                              :disabled="disabled"
                            />

                            <input
                              class="display-none"
                              :id="idEdit"
                              @change="editFieldChange"
                              name="image"
                              :accept="accept"
                              type="file"
                              :disabled="disabled"
                            />
                          </div>

                          <vue-image-lightbox-carousel
                            ref="lightbox"
                            :show="showLightbox"
                            @close="showLightbox = false"
                            :images="images"
                            @change="changeHighlight"
                            :showCaption="false"
                          >
                          </vue-image-lightbox-carousel>

                          <!-- remove image dialog -->
                          <v-dialog
                            v-model="removeImageDialog"
                            persistent
                            max-width="450"
                          >
                            <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
                            <v-card>
                              <v-card-title class="headline blue lighten-2">
                                Deleting Confirmation
                              </v-card-title>
                              <v-card-text class="pa-3">
                                ARE YOU SURE, DO YOU WANT REMOVE THIS IMAGE?
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue"
                                  text
                                  @click="removeImageDialog = false"
                                >
                                  CANCEL
                                </v-btn>
                                <v-btn
                                  color="red"
                                  text
                                  @click="removeImage(currentIndexImage)"
                                >
                                  DELETE
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
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
// import VueUploadMultipleImage from "../../components/VueUploadMultipleImage";

import VueImageLightboxCarousel from "vue-image-lightbox-carousel";
import Popper from "vue-popperjs";

import { forEach, findIndex, orderBy, cloneDeep } from "lodash";
import { Cropper } from "vue-advanced-cropper";

import "vue-popperjs/dist/css/vue-popper.css";
import "vue-advanced-cropper/dist/style.css";

export default {
  name: "Properties",
  components: {
    AdminLayout,
    ValidationObserver,
    ValidationProvider,
    // VueUploadMultipleImage,
    VueImageLightboxCarousel,
    Popper,
    Cropper,
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
      singleExpand: false,
      expanded: [],
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
        // {
        //   type: "checkbox",
        //   align: "start",
        //   sortable: false,
        //   value: "check",
        //   width: "4%",
        // },
        { text: "", value: "data-table-expand" },

        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "PropertyName",
        },
        {
          text: "Rent Amount",
          align: "start",
          sortable: true,
          value: "RentAmount",
        },
        {
          text: "Dep Amount",
          align: "start",
          sortable: true,
          value: "DepositAmount",
        },
        {
          text: "Availablility",
          align: "start",
          sortable: true,
          value: "DatePicker",
        },
        {
          text: "Rental Period",
          align: "start",
          sortable: true,
          value: "RentalPeriod",
        },
        {
          text: "Suitable For",
          align: "start",
          sortable: true,
          value: "Suitable",
        },

        {
          text: "Size",
          align: "start",
          sortable: true,
          value: "Size",
        },
        {
          text: "Pets",
          align: "start",
          sortable: true,
          value: "Pets",
        },
        { text: "Actions", value: "actions", sortable: false, width: "12%" },
      ],
      selectedData: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      images_arr: [],
      // images: [],
      // imageSelected: "",
      flatList: [],
      currentIndexImage: 0,

      images: [],
      isDragover: false,
      showLightbox: false,
      arrLightBox: [],
      cropDialog: false,
      cropped: "",
      currentCropperImage: "",
      removeImageDialog: false,
      removeImageConfirmedState: false,
      errorFound: false,
      browseText: "Browse Files",
      idUpload: " image-upload",
      dragText: "Drag and Drop",
      multiple: true,
      accept: "image/gif,image/jpeg,image/png,image/bmp,image/jpg",
      disabled: false,
      showEdit: true,
      showDelete: true,
      showPrimary: true,
      showAdd: true,
      idEdit: " image-edit",
      markIsPrimaryText: "",
      maxImage: 10,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Property" : "Edit Property";
    },
    imagePreview() {
      let index = findIndex(this.images, { highlight: 1 });
      this.currentImage = this.images[this.currentIndexImage].path;
      if (index > -1) {
        return this.images[index].path;
      } else {
        return this.images.length ? this.images[0].path : "";
      }
    },
    imageDefault() {
      if (this.images[this.currentIndexImage]) {
        return this.images[this.currentIndexImage].default;
      }
    },
  },

  mounted() {
    document.body.addEventListener("dragleave", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.isDragover = false;
    });
  },
  created() {
    this.initialize();
    this.images = [];
  },
  methods: {
    saveCropperImages() {
      console.log("saved cropper images");
      // console.log(this.images);
      // this.flatList.push(this.images);
      console.log("stored to flatlist");
    },
    preventEvent(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    uploadFieldChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return false;
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false;
      }
      forEach(files, (value, index) => {
        this.createImage(value);
      });
      if (document.getElementById(this.idUpload)) {
        document.getElementById(this.idUpload).value = [];
      }
    },
    editFieldChange(e) {
      // console.log(e);
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return false;
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false;
      }
      forEach(files, (value, index) => {
        this.editImageVal(value);
      });
      if (document.getElementById(this.idEdit)) {
        document.getElementById(this.idEdit).value = "";
      }
    },
    changeHighlight(currentIndex) {
      console.log(currentIndex);

      this.currentIndexImage = currentIndex;
      let arr = this.images;
      this.images = [];
      arr.map((item, index) => {
        if (currentIndex === index) {
          item.highlight = 1;
        } else {
          item.highlight = 0;
        }
        return item;
      });
      this.images = arr;
    },
    deleteImage(currentIndex) {
      this.removeImageDialog = true;
    },
    removeImage(currentIndex) {
      console.log(currentIndex);
      if (this.images[currentIndex].default === 1) {
        this.images[0].default = 1;
      }
      this.images.splice(currentIndex, 1);
      this.currentIndexImage = 0;
      if (this.images.length) {
        this.images[0].highlight = 1;
      }
      this.removeImageDialog = false;
      console.log("array after deleted: ", this.images);
    },
    markIsPrimary(currentIndex) {
      this.images.map((item, index) => {
        if (currentIndex === index) {
          item.highlight = 1;
          item.default = 1;
        } else {
          item.highlight = 0;
          item.default = 0;
        }
        return item;
      });
      this.currentIndexImage = 0;
      this.images = orderBy(this.images, "default", "desc");
      this.$emit("mark-is-primary", currentIndex, this.images);
    },
    createImage(file) {
      if (this.disabled) return;
      let reader = new FileReader();
      let formData = new FormData();
      formData.append("file", file);
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          if (!this.images.length) {
            this.images.push({
              name: file.name,
              path: dataURI,
              highlight: 1,
              default: 1,
            });
            this.currentIndexImage = 0;
          } else {
            this.images.push({
              name: file.name,
              path: dataURI,
              highlight: 0,
              default: 0,
            });
          }
          this.uploadImageSuccess(
            formData,
            this.images.length - 1,
            this.images
          );
        }
      };
      reader.readAsDataURL(file);
      this.errorFound = false;
    },
    editImageVal(file) {
      if (this.disabled) return;
      let reader = new FileReader();
      let formData = new FormData();
      formData.append("file", file);
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          if (this.images.length && this.images[this.currentIndexImage]) {
            this.images[this.currentIndexImage].path = dataURI;
            this.images[this.currentIndexImage].name = file.name;
          }
        }
      };
      reader.readAsDataURL(file);
      // this.$emit("edit-image", formData, this.currentIndexImage, this.images);
      this.editImage(formData, this.currentIndexImage, this.images);
    },
    onDrop(e) {
      this.isDragover = false;
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;
      if (!files.length) {
        return false;
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false;
      }
      forEach(files, (value, index) => {
        this.createImage(value);
        if (!this.multiple) {
          return false;
        }
      });
      if (document.getElementById(this.idUpload)) {
        document.getElementById(this.idUpload).value = [];
      }
    },
    onDragover() {
      this.isDragover = true;
    },
    change({ coordinates, canvas }) {
      // console.log(coordinates, canvas);
      // console.log(this.images[this.currentIndexImage].path)
      this.cropped = canvas.toDataURL();
      // console.log(canvas.toDataURL());
    },
    CropImage(i) {
      console.log(i);
      console.log(this.images);
      // this.images.splice(i, 1);
      this.images.find((file) => {
        if (file.path === i.path) {
          file.path = this.cropped;
        }
      });
      console.log(" path updated");
      console.log(this.images);
      this.cropDialog = false;
    },
    cropDialogOpener(e) {
      console.log(e);
      this.cropDialog = true;
      this.currentCropperImage = e.path;
    },
    openGallery(index) {
      this.showLightbox = true;
      this.$refs.lightbox.showImage(index);
    },
    onOpenedLightBox(value) {
      if (value) {
        this.showLightbox = true;
      } else {
        this.showLightbox = false;
      }
    },
    isValidNumberOfImages(amount) {
      if (amount > this.maxImage) {
        this.$emit("limit-exceeded", amount);
        return false;
      } else {
        return true;
      }
    },

    //--------------------------------------
    initialize() {
      this.products = [
        {
          id: 1,
          PropertyName:
            "Furnished apartment with parking spot in Hamburg-Uhlenhorst",
          RentAmount: "460",
          DepositAmount: "300",
          DatePicker: "2021-03-10",
          RentalPeriod: "3",
          Suitable: "2",
          Cleaning: "Optional regular cleaning (extra cost)",
          Size: "54 m², 2 Room/s",
          Pets: "not allowed",
          cropperImage: [],
          state: "pending",
        },
        {
          id: 2,
          PropertyName: "Three Storied Architect Designed",
          RentAmount: "380",
          DepositAmount: "270",
          DatePicker: "2021-03-15",
          RentalPeriod: "5",
          Suitable: "5",
          Cleaning: "Optional regular cleaning (extra cost)",
          Size: "103 m², 2 Room/s",
          Pets: "not allowed",
          cropperImage: [],
          state: "pending",
        },
        {
          id: 3,
          PropertyName: "3 bedrooms - Ascon Residencies",
          RentAmount: "300",
          DepositAmount: "290",
          DatePicker: "2021-03-05",
          RentalPeriod: "1",
          Suitable: "2",
          Cleaning: "Optional regular cleaning (extra cost)",
          Size: "40 m², 2 Room/s",
          Pets: "not allowed",
          cropperImage: [],
          state: "pending",
        },
      ];
    },
    selectedCheckbox(i) {
      this.selectedData.push(i);
      console.log(this.selectedData);
    },
    closeFormDialog() {
      this.FormDialog = false;
    },
    newItem() {
      this.editedItem = {};
      this.editedItem.Images = [];
      this.date = "";
      this.FormDialog = true;
      this.images.splice(0);
    },
    editItem(item) {
      console.log(this.editedIndex);

      console.log(item);

      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.FormDialog = true;
      // this.editedItem.cropperImage.forEach((element) => {
      //   this.images.push(element);
      // });
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

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.products.splice(this.editedIndex, 1);
    },

    copyContent(item) {
      console.log(item);
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, item);
      this.FormDialog = true;
      console.log(this.editedItem);
    },

    save() {
      console.log(this.editedIndex);
      console.log("checkImage File", this.images);
      console.log("checkImage length", this.images.length);
      if (this.images.length == 0) this.errorFound = true;
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }
        if (this.errorFound) return;
        // console.log("form saved");

        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], this.editedItem);
          console.log("update");
        } else {
          // this.products.push(this.editedItem);
          this.products.push({
            PropertyName: this.editedItem.PropertyName,
            RentAmount: this.editedItem.RentAmount,
            DepositAmount: this.editedItem.DepositAmount,
            DatePicker: this.editedItem.DatePicker,
            RentalPeriod: this.editedItem.RentalPeriod,
            Suitable: this.editedItem.Suitable,
            Cleaning: this.editedItem.Cleaning,
            Size: this.editedItem.Size,
            Pets: this.editedItem.Pets,
            cropperImage: this.images,
            state: "pending",
          });
          console.log("saved");
        }

        this.close();

        this.$nextTick(() => {
          this.$refs.form.reset();
          console.log("cleared");
        });
      });
    },
    close() {
      this.FormDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", fileList);
      this.editedItem.Images = fileList;
      this.imageSelected = true;
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList, Boolen) {
      console.log("index", index, fileList, Boolen);
      console.log("delete triggered");

      if (Boolen == "true") {
        console.log("delete");
        done();
      } else {
        console.log("none");
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data :", formData, index, fileList);
    },
    dataChange(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="css" scropped>
.active_state {
  padding-left: 3px;
  width: 3px;
  height: 25px;
}
.form-dialog {
  align-self: flex-start;
  position: relative;
  top: 20px;
}
.text-small {
  font-size: 11px;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.text-center {
  text-align: center;
}
.text-primary {
  color: #2fa3e6;
}
.display-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.justify-content-center {
  justify-content: center;
}
.justify-content-between {
  justify-content: space-between;
}
.justify-content-end {
  justify-content: flex-end;
}
.align-items-center {
  align-items: center;
}
.full-width {
  width: 100%;
}
.full-height {
  height: 100%;
}
.cursor-pointer {
  cursor: pointer;
}
.centered {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
  display: block;
}
.image-container {
  /* width: 190px; */
  width: 100%;
  height: 180px;
  border: 1px dashed #d6d6d6;
  border-radius: 4px;
  background-color: #fff;
  /* background-color: red; */
}
.image-center {
  width: 100%;
  height: 100%;
}
.image-icon-drag {
  fill: #c9c8c8;
  height: 50px;
  width: 50px;
}
.drag-text {
  padding-top: 5px;
  color: #777;
  font-weight: 400;
  line-height: 1.5;
}
.browse-text {
  font-size: 86%;
  color: #206ec5;
  text-decoration: none;
}
.image-input {
  overflow: hidden;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
}
.image-input label {
  display: block;
}
.drag-upload-cover {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fcfeff;
  opacity: 0.9;
  z-index: 1;
  margin: 5px;
  border: 2px dashed #268ddd;
}
.drag-upload-cover {
  font-weight: 400;
  font-size: 20px;
}
.icon-drag-drop {
  height: 50px;
  width: 50px;
  fill: #2fa3e6;
}
.drop-text-here {
  margin: 0;
  line-height: 1.5;
}
.display-none {
  display: none;
}

/* list images*/
.image-list {
  border: 1px solid #d6d6d6;
}
.preview-image {
  height: 140px;
  padding: 5px;
  border-radius: 15px;
  box-sizing: border-box;
}
.image-overlay {
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}
.image-overlay-details {
  position: absolute;
  z-index: 11;
  opacity: 0;
  transform: translate(0, -50%);
  top: 50%;
}
.icon-overlay {
  width: 40px;
  height: 40px;
  fill: #fff;
}
.preview-image:hover .image-overlay,
.preview-image:hover .image-overlay-details {
  opacity: 1;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
.show-img {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}
/*image bottom*/
.image-bottom {
  bottom: 0;
  left: 0;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.image-primary {
  border-radius: 4px;
  background-color: #e3edf7;
  padding: 3px 7px;
  font-size: 11px;
  margin-right: 5px;
}
.image-icon-primary {
  width: 10px;
  height: 10px;
  margin-right: 2px;
}
.image-icon-delete {
  height: 14px;
  width: 14px;
  fill: #222;
}
.image-edit {
  margin-right: 10px;
}
.image-icon-edit {
  height: 14px;
  width: 14px;
  fill: #222;
}
.image-list-container {
  /* max-width: 190px; */
  max-width: 100%;
  min-height: 50px;
  margin-top: 10px;
}
.image-list-container .image-list-item {
  height: 32px;
  width: 32px;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
}
.image-list-container .image-list-item:not(:last-child) {
  margin-right: 5px;
  margin-bottom: 5px;
  /* background-color: red; */
  /* padding: 10px; */
}
.image-list-container .image-list-item .show-img {
  max-width: 25px;
  max-height: 17px;
}
.image-list-container .image-highlight {
  border: 1px solid #2fa3e7;
}
.add-image-svg {
  width: 12px;
  height: 12px;
  fill: #222;
}
.input-add-image {
  overflow: hidden;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 11;
}
.input-add-image label {
  display: block;
}
.image-icon-info {
  width: 14px;
  height: 14px;
  fill: #222;
}
.mark-text-primary {
  color: #034694;
}
.popper-custom {
  background: #000;
  padding: 10px;
  border: none;
  box-shadow: none;
  color: white;
  text-align: left;
  font-size: 12px;
}
</style>
<style lang="css">
.popper-custom .popper__arrow {
  border-color: #000 transparent transparent transparent !important;
}
.cropPreview {
  position: absolute;
  bottom: 70px;
  right: 8px;
  border: #fff solid 2px;
}
</style>
