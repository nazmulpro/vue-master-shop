<template>
  <div id="app">
    <NavBar />
    <router-view :key="$route.fullPath" />
    <!-- Using modifiers -->

    <Cart />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cart from "@/components/Cart.vue";
export default {
  components: {
    NavBar,
    Cart
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#modal-scrollable .modal-dialog {
  position: absolute;
  right: 0;
  top: 55px;
  margin: auto;
  width: 320px;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

#modal-scrollable .modal-content {
  height: 100%;
  overflow-y: auto;
}

#modal-scrollable .modal-body {
  padding: 0px;
}

/*Right*/

/* ----- MODAL STYLE ----- */
#modal-scrollable .modal-content {
  border-radius: 0;
  border: none;
}

#modal-scrollable .modal-header {
  border-bottom-color: #eeeeee;
  background-color: #fafafa;
}
</style>
