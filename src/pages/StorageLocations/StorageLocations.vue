<template>
  <table-component :columns="columns" :data="storageLocationsRows">
    <template v-slot:actions>
      <v-btn
          @click="onToggle('createDialog')"
          color="deep-orange-accent-2"
          prepend-icon="mdi-plus"
      >
        Создать
      </v-btn>
    </template>
    <template v-slot:item-edit="row">
      <ThreeDotBtn
          @changeList="(list) => onChange(list, row)"
          :options="threeDotOptions"
      />
    </template>
    <template v-slot:item-open="{props}">
      <v-btn @click="goToEvidence(props)">Открыть</v-btn>
    </template>
  </table-component>
  <basic-dialog ref="createDialog" title="Добавить">
    <template v-slot:content>
      <storage-locations-form
          :active="activeRow"
          @close="onClose('createDialog')"
          @form-sub="createStorageLocation"
      />
    </template>
  </basic-dialog>
  <basic-dialog ref="editDialog" title="Редактировать">
    <template v-slot:content>
      <storage-locations-form
          :active="activeRow"
          @close="onClose('editDialog')"
          @form-sub="updateStorageLocation"
      />
    </template>
  </basic-dialog>
  <basic-dialog variant="error" ref="deleteDialog" title="Удалить">
    <template v-slot:content>
      <span>Вы точно хотите удалить вещественное доказательство?</span>
    </template>
    <template v-slot:actions>
      <v-btn variant="elevated" @click="destroyStorageLocation" color="error">Удалить</v-btn>
      <v-btn variant="elevated" @click="onClose('deleteDialog')">Отмена</v-btn>
    </template>
  </basic-dialog>
</template>

<script>
import StorageLocationsForm from "./StorageLocationsForm.vue";
import {mapActions, mapGetters} from 'vuex';
import DialogComponent from "../../components/Dialog.vue";
import LoaderComponent from "../../components/Loader.vue";
import BaseTableLayout from "../Layouts/BaseTableLayout.vue";
import ThreeDotBtn from "../../components/ThreeDotBtn.vue";
import ActionsMenu from "../../components/ActionsMenu.vue";
import BasicDialog from "../../components/Dialogs/BasicDialog.vue";
import TableComponent from "../../components/TableComponent.vue";
import {DIVISIONS_REQUEST, STORAGE_LOCATIONS_REQUEST} from "../../store/baseRequest";



export default {
  name: "StorageLocations",
  components: {
    BaseTableLayout,
    LoaderComponent,
    StorageLocationsForm,
    DialogComponent,
    ThreeDotBtn,
    ActionsMenu,
    BasicDialog,
    TableComponent,
  },
  data() {
    return {
      isOpenDialogEdit: false,
      isOpenDialogDelete: false,
      isOpenDialogCreate: false,
      activeRow: null,
      columns: [
        {value: 'id', text: '№ п\\п', direction: 'center', sortable: true, width: 30},
        {value: 'name', text: 'Наименование', sortable: true},
        {value: 'qty', text: 'Кол-во хранимых вещественных доказательств'},
        {value: 'edit', text: 'Действие', direction: 'center', width: 30},
        {value: 'open', text: 'ВД', direction: 'center', width: 30},
      ],
      threeDotOptions: [
        {label: 'Изменить', name: 'edit', icon: 'mdi-text-box-edit-outline'},
        {label: 'Удалить', name: 'delete', icon: 'mdi-delete'},
      ]
    }
  },
  computed: {
    ...mapGetters(['storageLocationsRows']),
  },
  beforeMount() {
    this.index(STORAGE_LOCATIONS_REQUEST);
    this.index(DIVISIONS_REQUEST);
  },
  methods: {
    ...mapActions([
      'index',
      'store',
      'update',
      'destroy',
    ]),
    // ...mapActions([
    //   'getStorageLocationsData',
    //   'getDivisionsData',
    //   'updateStorageLocationsRow',
    //   'destroyStorageLocationsRow',
    //   'storeStorageLocationsRow',
    // ]),
    onChange({name}, {props}) {
      this.activeRow = props;
      switch (name) {
        case 'edit':
          this.onToggle('editDialog');
          break;
        case 'delete':
          this.onToggle('deleteDialog');
          break;
      }
    },
    onToggle(dialog) {
      this.$refs?.[dialog]?.toggleDialog();
    },
    onClose(dialog) {
      this.activeRow = null;
      this.onToggle(dialog)
    },
    createStorageLocation(props) {
      this.store({
        ...STORAGE_LOCATIONS_REQUEST,
        props,
      });
      this.onToggle('createDialog');
    },
    updateStorageLocation(props) {
      this.update({
        ...STORAGE_LOCATIONS_REQUEST,
        props,
        id: this.activeRow.id,
      })
      this.onToggle('editDialog');
    },
    destroyStorageLocation() {
      this.destroy({
        ...STORAGE_LOCATIONS_REQUEST,
        id: this.activeRow.id,
      });
      this.onToggle('deleteDialog');
    },
    onSubmit(props) {
      this.onToggle();
    },
    goToEvidence(props) {
      console.log(props)
      this.$router.push({ name: 'evi', params: { id: props.id } });
    },
    // toggleDialogEdit(active) {
    //   this.activeRow = active;
    //   this.isOpenDialogEdit = !this.isOpenDialogEdit;
    // },
    // toggleDialogDelete(active) {
    //   this.activeRow = active;
    //   this.isOpenDialogDelete = !this.isOpenDialogDelete;
    // },
    // toggleDialogCreate() {
    //   this.isOpenDialogCreate = !this.isOpenDialogCreate;
    // },
    // async storeStorageLocations(props) {
    //   await this.storeStorageLocationsRow({data: props});
    //   this.isOpenDialogCreate = false;
    //   this.scrollToEnd();
    // },
    // updateStorageLocation(props) {
    //   this.updateStorageLocationsRow({id: this.activeRow.id, data: props});
    //   this.isOpenDialogEdit = false;
    // },
    // destroyStorageLocation() {
    //   this.destroyStorageLocationsRow({id: this.activeRow.id});
    //   this.isOpenDialogDelete = false;
    // },
    // scrollToEnd() {
    //   this.$refs.tt.$el.firstElementChild.scrollTop = this.$refs.tt.$el.firstElementChild.scrollHeight;
    // },
  }
}
</script>

<style scoped>

</style>