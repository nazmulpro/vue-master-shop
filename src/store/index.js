import Vue from "vue";
import Vuex from "vuex";

import ProductService from "@/services/productService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cartItems: [],
    totalProducts: 0
  },
  mutations: {
    ADD_CART(state, product) {
      state.cartItems.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        description: product.description
      });
    },
    INCREMENT_ITEM_QUANTITY(state, updateitem) {
      updateitem.quantity++;
    },
    REMOVE_CART(state, itemIndex) {
      state.cartItems.splice(itemIndex, 1);
    },
    DECREMENT_ITEM_QUANTITY(state, updateitem) {
      updateitem.quantity--;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_PRODUCTS_TOTAL(state, totalProducts) {
      state.totalProducts = totalProducts;
    }
  },
  actions: {
    addToCart({ commit, state }, product) {
      const cartItem = state.cartItems.find(
        element => element.id === product.id
      );
      /*
      const findItem = state.cartItems.find(element => {
        return element.id === product.id;
      }); */
      if (!cartItem) {
        commit("ADD_CART", product);
      } else {
        commit("INCREMENT_ITEM_QUANTITY", cartItem);
      }
    },
    removeFromCart({ commit, state }, product) {
      const cartItem = state.cartItems.find(
        element => element.id === product.id
      );
      if (cartItem) {
        if (cartItem.quantity <= 1) {
          const itemIndex = state.cartItems.findIndex(x => x.id === product.id);
          commit("REMOVE_CART", itemIndex);
        } else {
          commit("DECREMENT_ITEM_QUANTITY", cartItem);
        }
      }
    },
    removeItemFromCart({ commit, state }, id) {
      const itemIndex = state.cartItems.findIndex(x => x.id === id);
      commit("REMOVE_CART", itemIndex);
    },

    getProducts({ commit }, { perPage, page }) {
      ProductService.getProducts(perPage, page)
        .then(response => {
          commit(
            "SET_PRODUCTS_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          commit("SET_PRODUCTS", response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    getProduct({ commit }, id) {
      ProductService.getProduct(id)
        .then(response => {
          commit("SET_PRODUCT", response.data);
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    incrementProductQuantity({ commit, state }, id) {
      const cartItem = state.cartItems.find(element => element.id === id);
      if (cartItem) {
        commit("INCREMENT_ITEM_QUANTITY", cartItem);
      }
    },
    decrementProductQuantity({ commit, state }, id) {
      const cartItem = state.cartItems.find(element => element.id === id);
      if (cartItem) {
        commit("DECREMENT_ITEM_QUANTITY", cartItem);
      }
    }
  },
  modules: {},
  getters: {
    totalCartItem: state => {
      return state.cartItems.length;
    },
    updateProduct: (state, product) => {
      let findItem = state.cartItems.find(element => {
        return element.id === product.id;
      });
      if (findItem) {
        if (findItem.hasOwnProperty("quantity")) {
          return parseInt(state.findItem.quantity);
        }
        return 0;
      } else {
        return 0;
      }
    },
    cartTotal: state => {
      let total = 0;
      state.cartItems.forEach(product => {
        total += product.price * product.quantity;
      });
      return total;
    }
  }
});
