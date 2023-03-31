<template>
    <actions-menu>
      <template v-slot:breadcrumbs>
        <slot name="breadcrumbs"></slot>
      </template>
      <template v-slot:actions>
        <slot name="actions"></slot>
      </template>
    </actions-menu>
  <easy-data-table
      :headers="columns"
      :items="data"
      table-class-name="customize-table"
      fixed-header
      alternating
      border-cell
      buttons-pagination
  >
    <template v-for="(slot, index) of slotsNames" :key="index" v-slot:[slot]="props">
      <slot :name="slot" :props="props"></slot>
    </template>
  </easy-data-table>
</template>

<script>
import ActionsMenu from "./ActionsMenu.vue";

export default {
  name: "TableComponent",
  components: {ActionsMenu},
  props: {
    data: Array,
    columns: Array,
  },
  mounted() {
    console.log(this.$slots)
  },
  computed: {
    slotsNames() {
      return Object.keys(this.$slots).filter((item) => !['default', 'actions'].includes(item));
    },
  }
}
</script>

<style>
.customize-table {
  height: calc(100% - 68px);
  border: none;
  --easy-table-border: none;
  --easy-table-row-border: 1px solid #EEEEEE;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #424242;

  /*--easy-table-header-item-padding: 4px 4px;*/

  /*--easy-table-body-even-row-font-color: #fff;*/
  /*--easy-table-body-even-row-background-color: #4c5d7a;*/

  /*--easy-table-body-row-font-color: #c0c7d2;*/
  /*--easy-table-body-row-background-color: #2d3a4f;*/
  /*--easy-table-body-row-height: 12px;*/
  /*--easy-table-body-row-font-size: 12px;*/

  /*--easy-table-body-row-hover-font-color: #2d3a4f;*/
  /*--easy-table-body-row-hover-background-color: #eee;*/

  /*--easy-table-body-item-padding: 2px 2px;*/

  --easy-table-footer-background-color: #424242;
  --easy-table-footer-font-color: #c1cad4;
  /*--easy-table-footer-font-size: 14px;*/
  /*--easy-table-footer-padding: 0px 10px;*/
  /*--easy-table-footer-height: 50px;*/

  /*--easy-table-rows-per-page-selector-width: 70px;*/
  /*--easy-table-rows-per-page-selector-option-padding: 10px;*/
  /*--easy-table-rows-per-page-selector-z-index: 1;*/


  /*--easy-table-scrollbar-track-color: #2d3a4f;*/
  /*--easy-table-scrollbar-color: #2d3a4f;*/
  /*--easy-table-scrollbar-thumb-color: #4c5d7a;;*/
  /*--easy-table-scrollbar-corner-color: #2d3a4f;*/

  /*--easy-table-loading-mask-background-color: #2d3a4f;*/
}

.customize-table .vue3-easy-data-table__main {
  height: calc(100% - 18px);
}
</style>