<template>
  <base-table-layout>
    <template v-slot:actions>
      <v-btn
          color="success"
          @click="toggleDialogCreate"
      >
        Создать место хранения
      </v-btn>
    </template>
    <template v-slot:table>
      <v-alert v-if="!storageLocationsRows.length" class="text-black">
        <span>Нет данных</span>
      </v-alert>
      <v-table
          v-else
          ref="tt"
          class="v-table--density-comfortable border"
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
            @dblclick="goToEvidence(item.id)"
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
                @click="toggleDialogDelete(item)"
            />
          </td>
        </tr>
        </tbody>
      </v-table>
    </template>
  </base-table-layout>

  <dialog-component
      title="Создать место хранения"
      :is-open="isOpenDialogCreate"
      @toggle="toggleDialogCreate"
  >
    <template v-slot:content>
      <storage-locations-form @form-sub="storeStorageLocations" @close="toggleDialogCreate"/>
    </template>
  </dialog-component>
  <dialog-component
      title="Изменение места хранения"
      :is-open="isOpenDialogEdit"
      @toggle="toggleDialogEdit"
  >
    <template v-slot:content>
      <storage-locations-form :active="activeRow" @form-sub="updateStorageLocation" @close="toggleDialogEdit"/>
    </template>
  </dialog-component>
  <dialog-component
      title="Изменение места хранения"
      :is-open="isOpenDialogEdit"
      @toggle="toggleDialogEdit"
  >
    <template v-slot:content>
      <storage-locations-form :active="activeRow" @form-sub="updateStorageLocation" @close="toggleDialogEdit"/>
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
      <v-btn variant="elevated" @click="destroyStorageLocation" color="error">Удалить</v-btn>
      <v-btn variant="elevated" @click="toggleDialogDelete">Отмена</v-btn>
    </template>
  </dialog-component>
</template>

<script>
import DialogComponent from "../../components/Dialog.vue";
import StorageLocationsForm from "./StorageLocationsForm.vue";
import {mapActions, mapGetters} from 'vuex';
import LoaderComponent from "../../components/Loader.vue";
import BaseTableLayout from "../Layouts/BaseTableLayout.vue";

export default {
  name: "StorageLocations",
  components: {BaseTableLayout, LoaderComponent, StorageLocationsForm, DialogComponent},
  data() {
    return {
      isOpenDialogEdit: false,
      isOpenDialogDelete: false,
      isOpenDialogCreate: false,
      activeRow: null,
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
    !this.storageLocationsRows.length && this.getStorageLocationsData();
    this.getDivisionsData();
  },
  methods: {
    ...mapActions([
      'getStorageLocationsData',
      'getDivisionsData',
      'updateStorageLocationsRow',
      'destroyStorageLocationsRow',
      'storeStorageLocationsRow',
    ]),
    toggleDialogEdit(active) {
      this.activeRow = active;
      this.isOpenDialogEdit = !this.isOpenDialogEdit;
    },
    toggleDialogDelete(active) {
      this.activeRow = active;
      this.isOpenDialogDelete = !this.isOpenDialogDelete;
    },
    toggleDialogCreate() {
      this.isOpenDialogCreate = !this.isOpenDialogCreate;
    },
    async storeStorageLocations(props) {
      await this.storeStorageLocationsRow({data: props});
      this.isOpenDialogCreate = false;
      this.scrollToEnd();
    },
    updateStorageLocation(props) {
      this.updateStorageLocationsRow({id: this.activeRow.id, data: props});
      this.isOpenDialogEdit = false;
    },
    destroyStorageLocation() {
      this.destroyStorageLocationsRow({id: this.activeRow.id});
      this.isOpenDialogDelete = false;
    },
    scrollToEnd() {
      this.$refs.tt.$el.firstElementChild.scrollTop = this.$refs.tt.$el.firstElementChild.scrollHeight;
    },
    goToEvidence(id) {
      this.$router.push({ name: 'evi', params: { id } });
    },
  }
}
</script>

<style scoped>

</style>