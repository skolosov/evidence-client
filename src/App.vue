<template>
  <v-app>
    <header-component/>
    <v-main style="height: 100vh" class="bg-grey-lighten-3">
      <loader-component/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import LoaderComponent from "./components/Loader.vue";

export default {
  name: 'App',
  components: {LoaderComponent, HeaderComponent},
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Foo',
        value: 'foo',
      },
      {
        title: 'Bar',
        value: 'bar',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
</style>
