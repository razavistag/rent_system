<template>
  <div id="ImageCropper">
    <v-row class="ma-4">
      <v-col>
        <!-- :stencil-component="$options.components.CircleStencil" -->
        <!-- :default-visible-area="defaultVisibleArea"
             default-boundaries="fill"
             priority="visibleArea" -->
        <Cropper
          :src="img"
          :stencil-props="{ movable: true, scalable: true, aspectRatio: 1 }"
          :resize-image="{
            adjustStencil: true,
          }"
          :auto-zoom="true"
          @change="change"
        >
        </Cropper>

        <v-file-input
          truncate-length="15"
          outlined
          class="ma-2"
          dense
          label="Upload Image"
          accept="image/*"
          @change="onImageUpload($event)"
        ></v-file-input>

        <v-img :src="image" width="100%" height="400"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  name: "ImageCropper",
  components: {
    Cropper,
    CircleStencil,
  },
  data() {
    return {
      img:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
      image: "",
    };
  },
  methods: {
    defaultVisibleArea() {
      return {
        width: 800,
        height: 775,
        left: 63,
        top: 668,
      };
    },
    change({ coordinates, canvas }) {
    //   console.log(coordinates, canvas);
      this.image = canvas.toDataURL();
    //   console.log(canvas.toDataURL());
    },
    onImageUpload(e) {
      console.log(e);

      let reader = new FileReader();
      reader.onload = (fileArray) => {
        // console.log(reader.result);
        this.img = reader.result;
      };
      reader.readAsDataURL(e);
    },
  },
};
</script>

<style>
.Cropper {
  height: 600px;
  background: rgb(155, 10, 10);
}
</style>
