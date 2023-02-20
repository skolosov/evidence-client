<template>
  <v-app>
    <header-component />
    <v-main style="height: 100vh">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/Header.vue";

export default {
  name: 'App',
  components: {HeaderComponent},
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
