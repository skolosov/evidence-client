<template>
  <table-component :columns="columns" :data="evidenceRows">
    <template v-slot:actions>
      <v-btn
          @click="onToggle('createDialog')"
          color="deep-orange-accent-2"
          prepend-icon="mdi-plus"
      >
        Создать
      </v-btn>
    </template>
    <template v-slot:item-qty="{props: {resource}}">
      <div>{{
          resource.quantity
          || resource.amount
          || resource.weight
          || resource.liter
          || null
        }}
      </div>
    </template>
    <template v-slot:item-number="{props: {resource}}">
      <div>{{
          resource.number
          || resource.registration_number
          || null
        }}
      </div>
    </template>
    <template v-slot:item-edit="row">
      <ThreeDotBtn
          @changeList="(list) => onChange(list, row)"
          :options="threeDotOptions"
      />
    </template>
  </table-component>
  <basic-dialog ref="createDialog" title="Добавить">
    <template v-slot:content>
      <evidences-form
          @close="onClose('createDialog')"
          @form-sub="createEvidence"
          :active="activeRow"
      />
    </template>
  </basic-dialog>
  <basic-dialog ref="editDialog" title="Редактировать">
    <template v-slot:content>
      <evidences-form
          @close="onClose('editDialog')"
          @form-sub="updateEvidence"
          :active="activeRow"
      />
    </template>
  </basic-dialog>
  <basic-dialog variant="error" ref="deleteDialog" title="Удалить">
    <template v-slot:content>
      <span>Вы точно хотите удалить вещественное доказательство?</span>
    </template>
    <template v-slot:actions>
      <v-btn variant="elevated" @click="destroyEvidence" color="error">Удалить</v-btn>
      <v-btn variant="elevated" @click="onClose('deleteDialog')">Отмена</v-btn>
    </template>
  </basic-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DialogComponent from "../../components/Dialog.vue";
import LoaderComponent from "../../components/Loader.vue";
import BaseTableLayout from "../Layouts/BaseTableLayout.vue";
import ThreeDotBtn from "../../components/ThreeDotBtn.vue";
import ActionsMenu from "../../components/ActionsMenu.vue";
import BasicDialog from "../../components/Dialogs/BasicDialog.vue";
import TableComponent from "../../components/TableComponent.vue";
import EvidencesForm from "./EvidencesForm.vue";
import {EVIDENCE_REQUEST, EVIDENCE_TYPE_REQUEST, STORAGE_LOCATIONS_REQUEST} from "../../store/baseRequest";


export default {
  name: "Evidences",
  components: {
    EvidencesForm,
    TableComponent,
    BasicDialog,
    ActionsMenu,
    ThreeDotBtn,
    BaseTableLayout,
    LoaderComponent,
    DialogComponent,
  },
  data: () => ({
    activeRow: null,
    columns: [
      {value: 'id', text: '№ п\\п', textDirection: 'center', sortable: true, width: 30},
      {value: 'resource.name', text: 'Наименование', sortable: true},
      {value: 'qty', text: 'Кол-во(Сумма, литры, граммы)'},
      {value: 'number', text: 'Номер'},
      {value: 'edit', text: 'Действие', width: 30},
    ],
    threeDotOptions: [
      {label: 'Изменить', name: 'edit', icon: 'mdi-text-box-edit-outline'},
      {label: 'Удалить', name: 'delete', icon: 'mdi-delete'},
    ]
  }),
  beforeMount() {
    this.index({
      ...EVIDENCE_REQUEST,
      props: {filter: {storage_location_id: +this.storageLocationId}}
    })
    !this.storageLocationsRows.length && this.index(STORAGE_LOCATIONS_REQUEST);
    !this.evidenceTypes.length && this.index(EVIDENCE_TYPE_REQUEST);
  },
  computed: {
    ...mapGetters([
      'evidenceRows',
      'evidenceTypes',
      'storageLocationsRows',
    ]),
    storageLocationId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions([
      'index',
      'store',
      'update',
      'destroy',
    ]),
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
    createEvidence(props) {
      console.log('createEvidence', props)
      this.store({
        ...EVIDENCE_REQUEST,
        props,
      });
      this.onToggle('createDialog');
    },
    updateEvidence(props) {
      this.update({
        ...EVIDENCE_REQUEST,
        props,
        id: this.activeRow.id,
      })
      this.onToggle('editDialog');
    },
    destroyEvidence() {
      this.destroy({
        ...EVIDENCE_REQUEST,
        id: this.activeRow.id,
      });
      this.onToggle('deleteDialog');
    },
    onSubmit(props) {
      console.log('submitForm', props)
      this.onToggle();
    }
  },
}
</script>

<style>

</style>