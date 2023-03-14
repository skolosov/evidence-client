<template>
  <v-alert
      class="error-alert"
      v-if="error.message"
      color="error"
      icon="mdi-alert-circle"
      title="Ошибка"
      :text="error.message"
      closable
      @update:modelValue="onClose"
  ></v-alert>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ErrorDialog",
  computed: {
    ...mapGetters(['error']),
  },
  mounted() {
    setTimeout(() => this.error && this.onClose(), 10000);
  },
  methods: {
    ...mapMutations(['setError']),
    onClose() {
      this.$store.commit('setError', null);
    }
  }
}
</script>

<style scoped>
.error-alert {
  position: absolute;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>