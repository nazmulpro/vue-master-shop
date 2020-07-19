<template>
  <b-col xl="2" lg="3" md="3" sm="4" cols="12" class="mb-4">
    <b-card class="mb-4 border-0">
      <b-card-img-lazy :src="product.image" height="200"></b-card-img-lazy>
      <b-card-body>
        <b-card-title
          v-b-modal.modal-center
          @click="$bvModal.show('modal-productDetails-' + product.id)"
        >{{ product.name }}</b-card-title>
        <b-card-sub-title class="mb-2">{{ product.price | currency }}</b-card-sub-title>
      </b-card-body>

      <b-button
        size="sm"
        v-show="product.quantity > 0"
        variant="danger"
        @click="removeFromCart"
        class
      >
        <font-awesome-icon icon="minus" class="mr-1" />
      </b-button>

      <b-button
        size="sm"
        v-show="product.quantity > 0"
        variant="light"
        class
      >{{ product.quantity }} in cart</b-button>

      <b-button size="sm" v-show="product.quantity === 0" variant="light" @click="addToCart" class>
        <font-awesome-icon icon="shopping-cart" class="mr-1" />Add to cart
      </b-button>

      <b-button
        size="sm"
        v-show="product.quantity > 0"
        variant="secondary"
        @click="addToCart"
        class
      >
        <font-awesome-icon icon="plus" class="mr-1" />
      </b-button>

      <!--  <b-button
        v-b-modal
        class="float-left"
        size="sm"
        variant="warning"
        @click="$bvModal.show('modal-productDetails-' + product.id)"
        >Details</b-button
      >-->
    </b-card>

    <ProductDetails :ProductDetails="product" />
  </b-col>
</template>

<script>
import { mapState } from "vuex";
import ProductDetails from "@/components/ProductDetails.vue";

export default {
  components: {
    ProductDetails
  },
  props: {
    productPros: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      //product: this.getProduct
    };
  },
  methods: {
    addToCart() {
      //this.product.quantity++;
      this.$store.dispatch("addToCart", this.product);
    },
    removeFromCart() {
      // if (this.product.quantity === 0) {
      this.$store.dispatch("removeFromCart", this.product);
      //}
      //this.product.quantity--;
      //this.$store.dispatch("removeFromCart", this.product);
    }
  },
  computed: {
    product() {
      const findItem = this.cartItems.find(
        element => element.id === this.productPros.id
      );
      if (findItem) {
        return findItem;
      } else {
        return {
          id: this.productPros.id,
          name: this.productPros.name,
          price: this.productPros.price,
          image: this.productPros.image,
          description: this.productPros.description,
          quantity: 0
        };
      }
    },
    ...mapState(["cartItems"])
  }
};
</script>

<style lang="scss" scoped>
.card-body {
  padding: 6px 10px 20px 10px;
}
.card-title {
  cursor: pointer;
  font-size: 22px;
}
.card-title:hover {
  color: #007bff;
}
</style>
