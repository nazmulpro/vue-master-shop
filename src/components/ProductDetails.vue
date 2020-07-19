<template>
  <div>
    <b-modal
      centered
      no-fade
      hide-backdrop
      :id="'modal-productDetails-' + ProductDetails.id"
      scrollable
      :title="product.name"
      hide-footer
    >
      <template v-slot:default>
        <template>
          <div class="pd-image centeret">
            <b-img
              center
              width="200"
              height="200"
              :src="product.image"
              fluid
              alt="Responsive image"
            ></b-img>
          </div>

          <div class="pt-4 ">
            <h6 class="text-center">Price : {{ product.price | currency }}</h6>
            <p>{{ product.description }}</p>
            <div class="pt-4 pb-4 text-center">
              <b-button
                size="sm"
                v-show="product.quantity > 0"
                variant="danger"
                @click="removeFromCart"
                class=""
              >
                <font-awesome-icon icon="minus" class="mr-1" />
              </b-button>

              <b-button
                size="sm"
                v-show="product.quantity > 0"
                variant="warning"
                @click="addToCart"
                class=""
                >{{ product.quantity }} in cart</b-button
              >

              <b-button
                size="sm"
                v-show="product.quantity === 0"
                variant="primary"
                @click="addToCart"
                class=""
              >
                <font-awesome-icon icon="shopping-cart" class="mr-1" />Add to
                cart
              </b-button>

              <b-button
                size="sm"
                v-show="product.quantity > 0"
                variant="primary"
                @click="addToCart"
                class=""
              >
                <font-awesome-icon icon="plus" class="mr-1" />
              </b-button>
            </div>
          </div>
        </template>
        <template></template>
      </template>

      <template v-slot:modal-footer>
        <template else>
          <div></div>
        </template>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    ProductDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.product);
    },
    removeFromCart() {
      this.$store.dispatch("removeFromCart", this.product);
    }
  },
  computed: {
    product() {
      const findItem = this.cartItems.find(
        element => element.id === this.ProductDetails.id
      );
      if (findItem) {
        return findItem;
      } else {
        return {
          id: this.ProductDetails.id,
          name: this.ProductDetails.name,
          price: this.ProductDetails.price,
          image: this.ProductDetails.image,
          description: this.ProductDetails.description,
          quantity: 0
        };
      }
    },
    ...mapState(["cartItems"]),
    ...mapGetters(["cartTotal"])
  }
};
</script>

<style lang="scss" scoped></style>
