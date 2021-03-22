<template>
  <div class="home">
    <!-- App bar Component -->
    <Appbar/>
    
    <!-- Carousel Image Component-->
    <Carousel style="margin-top:-25px;" />

    <!-- Trending Properties Card -->
    <v-row class="m-0 ">
      <v-col
        md="12"
        sm="12"
        cols="12"
        class="d-flex justify-center align-center mt-3"
      >
        <h3>
          <span style="color:#46bd55;">{{ $t("title.one") }}</span> <span>   {{ $t("title.two") }}</span>
        </h3>
      </v-col>
      <v-col
        md="3"
        sm="3"
        cols="12"
        v-for="(x, i) in trending_properties"
        :key="i"
      >
        <v-card class="mx-auto" max-width="300" flat>
          <v-img :src="x.img" height="200px"></v-img>

          <v-card-title>
            {{ x.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ x.description }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              to="/property"
              class="text-decoration-none"
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Form Component-->
    <ContactForm />

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Appbar from "../components/Appbar";
import Carousel from "../components/AgileCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
export default {
  name: "Home",
  components: {
    Appbar,
    Carousel,
    ContactForm,
    Footer,
  },
  data() {
    return {
      trending_properties: [
        {
          name: "Apartments",
          img:
            "https://webthemez.com/demo/myhome-real-estate-website-template/img/img1.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident",
        },
        {
          name: "Luxury Villas",
          img:
            "https://webthemez.com/demo/myhome-real-estate-website-template/img/img2.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident",
        },

        {
          name: "Gated Properties",
          img:
            "https://webthemez.com/demo/myhome-real-estate-website-template/img/img3.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident",
        },
        {
          name: "Luxury Apartments",
          img:
            "https://webthemez.com/demo/myhome-real-estate-website-template/img/img4.jpg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident",
        },
      ],
    };
  },
  
};
</script>
