<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0">
        <v-card color="grey-darken-3 pa-2 ma-2">
          <slot name="actions"></slot>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0">
        <v-card class="pa-2 mr-2 ml-2" color="grey-darken-3">
          <slot name="table"></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <slot></slot>
</template>

<script>
export default {
  name: "BaseTableLayout"
}
</script>

<style scoped>

</style>