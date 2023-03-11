<template>
  <v-app-bar
      color="grey-darken-1 pl-4 pr-4"
      prominent
  >
    <v-toolbar-title>
      <router-link :to="{name: 'home'}">
        Вещественные доказательства
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!auth">
      <router-link :to="{name: 'reg'}">
        <v-btn prepend-icon="mdi-account-plus">
          Регистрация
        </v-btn>
      </router-link>
      <router-link :to="{name: 'login'}">
        <v-btn prepend-icon="mdi-login">
          Вход
        </v-btn>
      </router-link>
    </template>
    <v-btn @click="logoutUser" v-else prepend-icon="mdi-logout">
      Выход
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(['auth']),
  },
  methods: {
    ...mapActions(['logoutUser']),
  }
}
</script>

<style scoped>

</style>