<template>
  <v-overlay
      :model-value="loaded"
      class="align-center justify-center"
  >
    <v-progress-circular
        color="primary"
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "LoaderComponent",
  computed: {
    ...mapGetters(['loaded'])
  }
}
</script>

<style scoped>

</style>