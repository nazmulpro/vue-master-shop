<template>
  <div>
    <b-modal
      no-fade
      hide-backdrop
      id="modal-scrollable"
      scrollable
      :title="
        cartItems.length === 1
          ? cartItems.length + ' Item'
          : cartItems.length + ' Items'
      "
    >
      <template v-slot:default>
        <template v-if="cartTotal > 0">
          <ul
            class="cart-Items"
            v-for="cartItem in cartItems"
            :key="cartItem.id"
          >
            <li>
              <div class="item-quantity mr-3">
                <b-button
                  class="vote up"
                  size="sm"
                  @click="incrementProductQuantity(cartItem.id)"
                >
                  <font-awesome-icon icon="angle-up" />
                </b-button>

                <div class="stat">
                  <span class="score">{{ cartItem.quantity }}</span>
                </div>
                <b-button
                  size="sm"
                  class="vote down"
                  @click="decrementProductQuantity(cartItem.id)"
                  :disabled="cartItem.quantity === 1"
                >
                  <font-awesome-icon
                    :class="{ disabledButton: cartItem.quantity === 1 }"
                    icon="angle-down"
                  />
                </b-button>
              </div>
              <div class="item-image mr-3 mt-3">
                <img :src="cartItem.image" width="40" height="40" />
              </div>

              <div class="item-name mr-3 mt-3">{{ cartItem.name }}</div>
              <div class="item-price mt-4">
                {{ (cartItem.quantity * cartItem.price) | currency }}
              </div>
              <div class="item-remove mt-4">
                <font-awesome-icon
                  icon="times"
                  class="mr-1"
                  @click="removeItemFromCart(cartItem.id)"
                />
              </div>
            </li>
          </ul>
        </template>
        <template v-if="cartTotal === 0">
          <h5 class="p-2">Your shopping cart is empty</h5>
        </template>
      </template>

      <template v-slot:modal-footer>
        <template v-if="cartTotal > 0">
          <b-button
            block
            class="cart-checkout-button"
            size="lg"
            variant="primary"
            @click="hide('forget')"
          >
            Checkout
            <b class="cart-total">{{ cartTotal | currency }}</b>
          </b-button>
        </template>
        <template else>
          <div style="disply:none"></div>
        </template>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  methods: {
    incrementProductQuantity(id) {
      this.$store.dispatch("incrementProductQuantity", id);
    },
    decrementProductQuantity(id) {
      this.$store.dispatch("decrementProductQuantity", id);
    },
    removeItemFromCart(id) {
      this.$store.dispatch("removeItemFromCart", id);
    }
  },
  computed: {
    ...mapState(["cartItems"]),
    ...mapGetters(["cartTotal"])
  }
};
</script>

<style lang="scss" scoped>
.down .fa-angle-down.disabledButton {
  color: #d6d6d6;
  cursor: none;
  pointer-events: none;
}

ul.cart-Items {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #f0f0f0;
}

ul.cart-Items li {
  display: inline-flex;
  margin-top: 10px;
  font-size: 13px;
  color: rgb(97, 94, 88);
  text-align: justify;
  padding: 0 8px 0 12px;
}

ul.cart-Items li .item-quantity,
ul.cart-Items li .item-price,
ul.cart-Items li .item-image,
ul.cart-Items li .item-name {
  float: left;
}

ul.cart-Items li .item-image {
}

ul.cart-Items li .item-name {
  width: 120px;
  padding: 0;
}

ul.cart-Items li .item-remove {
  position: absolute;
  right: 15px;
  color: brown;
  cursor: pointer;
}

.cart-checkout-button {
  /*background-color: gray;*/
  color: white;
  margin: 0;
  text-align: left;
}

.cart-total {
  float: right;
}

ul.cart-Items li .item-quantity {
  text-align: center;
}
.vote {
  font-size: 16px;
}
.up,
.down {
  color: #fff;
  padding: 0px 2px !important;
  margin: 0;
  background: #fff;
  outline: none;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -ms-border-radius: 0px;
  -o-border-radius: 0px;
  border-radius: 0px;
  outline: none;
  border: 0;
}

.item-quantity .btn-secondary:not(:disabled):not(.disabled):active {
  background-color: #fff !important;
  border: none !important;
  outline: 0;
}
.item-quantity .btn-secondary:focus {
  -webkit-box-shadow: none;
  box-shadow: none !important;
  outline: 0;
}

.down .fa-angle-down,
.up .fa-angle-up {
  color: gray;
}

.down .fa-angle-down:hover,
.up .fa-angle-up:hover {
  color: orange;
}
</style>
