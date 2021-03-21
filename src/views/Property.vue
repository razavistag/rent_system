<template>
  <div id="Property">
    <v-container id="container">
      <v-row>
        <v-col md="12" sm="12" cols="12">
          <h4>Furnished apartment with parking spot in Hamburg-Uhlenhorst</h4>
          <span style="font-size:15px;"> No. 171 Matale Rd, Akurana</span>
        </v-col>
        <v-col md="7" sm="7" cols="12">
          <PropertyCarousel />
        </v-col>
        <v-col md="5" sm="5" cols="12">
          <v-row>
            <v-col md="6" sm="6" cols="12">
              <b>Rent:</b> <br />
              1350 $/month
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Availability</b>: <br />
              21/03/2021 open-end
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Deposit</b>: <br />
              $800
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Rental period</b>: <br />
              minimum 3 Months
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Cleaning</b>: <br />
              Optional regular cleaning (extra cost)
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Suitable for</b>: <br />
              2 Persons
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Size</b>: <br />
              54 m², 2 Room/s
            </v-col>
            <v-col md="6" sm="6" cols="12">
              <b>Pets</b>: <br />
              not allowed
            </v-col>
            <v-col md="12" sm="12" cols="12">
              <v-btn color="green" dark block
                ><v-icon small dark left>mdi-book-check</v-icon> BOOK NOW</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="8" sm="8" cols="12">
          <h2>Description</h2>
          <h6>Details apartment</h6>
          <p class="text-justify">
            open kitchen, full bath with window and toilet, chamber, drying
            floor, built in 1910, apartment, 1st floor, own parking lot,
            laminate flooring, fireplace, non-smoking apartment
          </p>
          <h6>Details furnishings</h6>
          <p class="text-justify">
            WLAN, DSL, 100 MBit, radio license fee excl., Flat screen TV, cable
            connection, washing machine in the kitchen, kettle, toaster,
            induction cooker (5 hobs), extractor hood, microwave, double bed,
            bed linen, duvets
          </p>
          <h6>Surroundings</h6>
          <p class="text-justify">
            The apartment is very centrally located, on the outskirts of the
            beautiful composers' quarter, in close proximity to the Outer Alster
            and beautiful canals leading off from it. Various shops, boutiques,
            restaurants, cafés and bars are within easy walking distance. For
            everyday needs there are supermarkets and a pharmacy in the
            immediate vicinity. Sporty people can look forward to a swimming
            pool, a tennis hall, many green areas for jogging and the Alster for
            water sports. Culture enthusiasts enjoy the close proximity to
            Kampnagel and the Ernst-Deutsch Theater.
          </p>
        </v-col>
        <v-col md="4" sm="4" cols="12">
          <h4>Similar Properties</h4>
          <!-- slider  -->
          <agile>
            <div v-for="(x, i) in trending_properties" :key="i">
              <v-card class="mx-auto  " max-width="344" flat>
                <v-img :src="x.img" height="200px"></v-img>

                <v-card-title>
                  {{ x.name }}
                </v-card-title>

                <v-card-subtitle class=" ">
                  {{ x.description }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text>
                    Explore
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>

            <template slot="prevButton">
              <v-icon>mdi-arrow-left</v-icon>
            </template>
            <template slot="nextButton">
              <v-icon>mdi-arrow-right</v-icon>
            </template>
          </agile>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import PropertyCarousel from "../components/PropertyCarousel";
import Footer from "../components/Footer";

export default {
  name: "Property",
  components: {
    PropertyCarousel,
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
  mounted() {
    console.log("selected product: ", this.$route.params);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};
</script>

<style lang="css" scoped>
#Property {
  margin-top: -30px;
  background-color: #dcedc8;
  padding: 10px;
}
#container {
  background-color: white;
}

.agile {
  width: 100%;
}
.agile__actions {
  margin-top: 20px;
}
.agile__nav-button {
  background: transparent;
  border: none;
  color: green;
  cursor: pointer;
  font-size: 24px;
  transition-duration: 0.3s;
}
.agile__nav-button:hover {
  color: #888;
}
.agile__dot {
  margin: 5 10px;
}
.agile__dot button {
  background-color: green;
  border: none;
  border-radius: 50%;
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
  background-color: pink;
}
</style>
