<template>
  <div id="AgileCarousel">
    <v-row class="m-0">
      <v-col md="12" sm="12" cols="12" class="p-0">
        <agile
          :nav-buttons="false"
          :autoplay-speed="3500"
          :speed="2500"
          fade="fade"
          pause-on-hover="pause-on-hover"
          pause-on-dots-hover="pause-on-dots-hover"
          autoplay="autoplay"
          ><img
            class="slide"
            src="https://webthemez.com/demo/myhome-real-estate-website-template/img/slides/1.jpg"
          />
          <img
            class="slide"
            src="https://webthemez.com/demo/myhome-real-estate-website-template/img/slides/2.jpg"
          />
        </agile>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AgileCarousel",
};
</script>

<style lang="css" scopped>
.agile__dots {
  bottom: 10px;
  flex-direction: column;
  right: 30px;
  position: absolute;
}
.agile__dot {
  margin: 5px 0;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #fff;
}

.slide {
  display: block;
  height: 350px;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
}
</style>