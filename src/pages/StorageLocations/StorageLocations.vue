<template>
  <v-sheet width="1200" class="mx-auto pa-8">
    <v-table
        hover
        fixed-header
        height="800px"
    >
      <thead>
      <tr>
        <th v-for="column in columns" class="text-center bg-grey-darken-3">
          {{ column }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in desserts"
          :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.calories }}</td>
        <td class="text-center">
          <v-btn
              variant="outlined"
              size="small"
              icon="mdi-text-box-edit-outline"
              color="success"
              @click="toggleDialog"
          />
        </td>
        <td class="text-center">
          <v-btn
              variant="outlined"
              size="small"
              icon="mdi-delete"
              color="error"
          />
        </td>
      </tr>
      </tbody>
    </v-table>
    <dialog-component :is-open="isOpenDialog" @toggle="toggleDialog" />
  </v-sheet>
</template>

<script>
import DialogComponent from "../../components/Dialog.vue";

export default {
  name: "StorageLocations",
  components: {DialogComponent},
  data() {
    return {
      isOpenDialog: false,
      columns: [
        '№ п\\п',
        'Наименование',
        'Кол-во хранимых вещественных доказательств',
        'Редактировать',
        'Удалить'
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    toggleDialog() {
      this.isOpenDialog = !this.isOpenDialog;
    }
  }
}
</script>

<style scoped>

</style>