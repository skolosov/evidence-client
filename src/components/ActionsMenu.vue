<template>
  <div class="action-menu bg-grey-darken-3 flex-row align-center pa-4" style="height: 50px;display: flex">
    <slot name="breadcrumbs"></slot>
    <v-spacer/>
    <slot name="actions"/>
  </div>
</template>

<script>
export default {
  name: "ActionsMenu"
}
</script>

<style scoped>
  .action-menu {
    border-bottom: 1px solid #EEEEEE;
  }
</style>