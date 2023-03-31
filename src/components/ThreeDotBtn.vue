<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
  >
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" size="small"></v-btn>
    </template>
    <v-list class="bg-grey-darken-3">
          <v-list-item
              @click="onClickOption(item)"
              :append-icon="item.icon"
              v-for="(item, i) in options"
              :key="i"
              :title="item.label"
          />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ThreeDotBtn",
  components: {},
  emits: ['changeList'],
  props: {
    options: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  methods: {
    onClickOption(item) {
      this.menu = false;
      this.$emit('changeList', item);
    }
  }
}
</script>

<style scoped>

</style>