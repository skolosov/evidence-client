<template>
  <base-table-layout>
    <template v-slot:table>
      <v-alert v-if="!evidenceRows.length" class="text-black">
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
            v-for="item in evidenceRows"
            :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.resource.name }}</td>
          <td>{{
              item.resource.quantity
              || item.resource.amount
              || item.resource.weight
              || item.resource.liter
              || null
            }}
          </td>
          <td>
            {{
              item.resource.number
              || item.resource.registration_number
              || null
            }}
          </td>
          <td class="text-center">
            <v-btn
                variant="outlined"
                size="small"
                icon="mdi-text-box-edit-outline"
                color="success"
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
    </template>
  </base-table-layout>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DialogComponent from "../../components/Dialog.vue";
import LoaderComponent from "../../components/Loader.vue";
import BaseTableLayout from "../Layouts/BaseTableLayout.vue";

export default {
  name: "Evidences",
  components: {
    BaseTableLayout,
    LoaderComponent,
    DialogComponent,
  },
  data: () => ({
    columns: [
      '№ п\\п',
      'Наименование',
      'Кол-во(Сумма, литры, граммы)',
      'Номер',
      'Изменить',
      'Удалить',
    ],
  }),
  mounted() {
    this.$store.commit('setEvidences');
    this.getEvidencesData({storage_Location_id: +this.storageLocationId});
  },
  computed: {
    ...mapGetters(['evidenceRows']),
    storageLocationId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions([
      'getEvidencesData',
      'storeEvidencesRow',
      'updateEvidencesRow',
      'destroyEvidencesRow',
    ]),
  },
}
</script>

<style scoped>

</style>