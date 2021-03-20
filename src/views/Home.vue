<template>
  <div class="home"> 
    <Carousel style="margin-top:-25px;" />
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "../components/AgileCarousel ";
export default {
  name: "Home",
  components: {
    Carousel,
  },
};
</script>
