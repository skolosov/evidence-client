<template>
  <v-dialog
      v-model="dialog"
      width="auto"
  >
    <v-card :class="dialogVariant" min-width="600">
      <v-card-title v-if="title">
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text v-if="$slots.content">
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-card-text>
      <v-card-actions v-if="$slots.actions">
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BasicDialog",
  emits: ['toggle'],
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    title: {
      type: [String, null],
      default: null,
    },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    dialogVariant() {
      switch (this.variant) {
        case 'error':
          return 'bg-red-darken-4';
        default:
          return 'bg-grey-darken-3';
      }
    },
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    }
  }
}
</script>

<style scoped>

</style>