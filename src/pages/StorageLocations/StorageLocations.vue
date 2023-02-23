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
          v-for="item in storageLocationsRows"
          :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td></td>
        <td class="text-center">
          <v-btn
              variant="outlined"
              size="small"
              icon="mdi-text-box-edit-outline"
              color="success"
              @click="toggleDialogEdit(item)"
          />
        </td>
        <td class="text-center">
          <v-btn
              variant="outlined"
              size="small"
              icon="mdi-delete"
              color="error"
              @click="toggleDialogDelete"
          />
        </td>
      </tr>
      </tbody>
    </v-table>
    <dialog-component
        title="Изменение места хранения"
        :is-open="isOpenDialogEdit"
        @toggle="toggleDialogEdit"
    >
      <template v-slot:content>
        <storage-locations-form :active="activeRow"/>
      </template>
    </dialog-component>
    <dialog-component
        title="Удалить место хранения"
        :is-open="isOpenDialogDelete"
        variant="error"
        @toggle="toggleDialogDelete"
    >
      <template v-slot:content>
        <span>Вы точно хотите место хранения?</span>
      </template>
      <template v-slot:actions>
        <v-btn variant="elevated" color="error">Удалить</v-btn>
        <v-btn variant="elevated" @click="toggleDialogDelete">Отмена</v-btn>
      </template>
    </dialog-component>
  </v-sheet>
</template>

<script>
import DialogComponent from "../../components/Dialog.vue";
import StorageLocationsForm from "./StorageLocationsForm.vue";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "StorageLocations",
  components: {StorageLocationsForm, DialogComponent},
  data() {
    return {
      isOpenDialogEdit: false,
      isOpenDialogDelete: false,
      activeRow: {},
      columns: [
        '№ п\\п',
        'Наименование',
        'Кол-во хранимых вещественных доказательств',
        'Редактировать',
        'Удалить'
      ],
    }
  },
  computed: {
    ...mapGetters(['storageLocationsRows']),
  },
  mounted() {
    this.getStorageLocationsData();
    this.getDivisionsData();
  },
  methods: {
    ...mapActions(['getStorageLocationsData', 'getDivisionsData']),
    toggleDialogEdit(active) {
      this.activeRow = active;
      this.isOpenDialogEdit = !this.isOpenDialogEdit;
    },
    toggleDialogDelete() {
      this.isOpenDialogDelete = !this.isOpenDialogDelete;
    }
  }
}
</script>

<style scoped>

</style>