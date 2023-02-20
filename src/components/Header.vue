<template>
  <v-app-bar
      color="grey-darken-1"
      prominent
  >

    <v-toolbar-title>Вещественные доказательства</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn prepend-icon="mdi-account-plus">
      <router-link :to="{name: 'reg'}">Регистрация</router-link>
    </v-btn>
    <v-btn prepend-icon="mdi-login">
      <router-link :to="{name: 'login'}">Вход</router-link>
    </v-btn>
    <!--    <v-btn prepend-icon="mdi-logout">Выход</v-btn>-->
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>

</style>