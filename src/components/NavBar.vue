<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
      <router-link to="/">
        <b-navbar-brand>Master Shop</b-navbar-brand>
      </router-link>
      <b-navbar-nav class="d-xl-none d-lg-none d-md-inline d-sm-inline">
        <b-nav-item v-b-modal.modal-scrollable class="active">
          <font-awesome-icon icon="shopping-cart" size="lg" />
          <b-badge variant="light">{{ totalCartItem }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-b-modal.modal-scrollable
            class="active d-none d-xl-inline d-lg-inline d-md-none"
          >
            <font-awesome-icon icon="shopping-cart" size="lg" />
            <b-badge variant="light">{{ totalCartItem }}</b-badge>
          </b-nav-item>
          <b-nav-item href="#">Login</b-nav-item>
          <b-nav-item tag="router-link" :to="{ path: '/about' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["totalCartItem"])
  }
};
</script>

<style scoped>
.badge-light {
  color: #212529;
  /* background-color: #f8f9fa; */
  position: relative;
  left: -6px;
  top: -10px;
  color: #000;
  background: orange;
}
</style>
