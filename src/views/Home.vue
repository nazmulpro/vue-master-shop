<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <div class="col-lg-12 mt-4">
          <div class="row">
            <product v-for="product in products" :key="product.id" :productPros="product" />
          </div>

          <!-- /.row -->
        </div>
        <!-- /.col-lg-9 -->
      </b-row>

      <div class="row mb-5">
        <div class="col-lg-12">
          <template v-if="page != 1">
            <b-link :to="{ name: 'home', query: { page: page - 1 } }" rel="prev">Prev Page</b-link>
            <template v-if="hasNextPage">|</template>
          </template>
          <b-link
            v-if="hasNextPage"
            :to="{ name: 'home', query: { page: page + 1 } }"
            rel="next"
          >Next Page</b-link>
        </div>
      </div>
      <!-- /.row -->
    </b-container>
    <!-- /.container -->
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: { Product },
  data() {
    return {
      categories: ["HP", "Dell", "Asus", "Mac"]
    };
  },
  methods: {},
  created() {
    this.perPage = 12;
    this.$store.dispatch("getProducts", {
      perPage: this.perPage,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.totalProducts > this.page * this.perPage;
    },
    ...mapState(["products", "totalProducts"])
  }
};
</script>
