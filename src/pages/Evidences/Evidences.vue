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
      <tr v-for="item in evidences"
           :key="item.name"
           class="text-center"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
<!--        <td>{{ item.weight }}</td>-->
        <td> {{ item.liter ? item.liter+' литров':item.quantity ? item.quantity+' шт.':item.amount ? item.amount+' руб.': item.weight ? item.weight+' грамм':'1 шт.' }}</td>
        <td class="text-center">
          <v-btn
              variant="outlined"
              size="small"
              icon="mdi-text-box-edit-outline"
              color="success"
              @click="toggleDialogEdit"
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
  </v-sheet>
</template>

<script>
// import DialogComponent from "../../components/Dialog.vue";
// import StorageLocationsForm from "./StorageLocationsForm.vue";

export default {
  name: "Evidences",
  // components: {StorageLocationsForm, DialogComponent},
  data() {
    return {
      isOpenDialogEdit: false,
      isOpenDialogDelete: false,
      columns: [
        '№ п\\п',
        'Наименование',
        'Кол-во',
        'Номер',
        'Редактировать',
        'Удалить'
      ],
      evidences: [
        {
          id: '1',
          name: 'Героин (метилэфедрон)',
          weight: 280,
        },
        {
          id: '2',
          name: 'Alkohol - Vodka "palenka"',
          liter: 50,
        },
        {
          id: '3',
          name: 'Грузовик',
          brand: 'Volvo',
          color: 'Белосиний',
          engine_number: '34562345',
        },
      ],
    }
  },
  mounted() {
    console.log(this.desserts);
    // this.huy();
  },

  methods: {
    toggleDialogEdit() {
      this.isOpenDialogEdit = !this.isOpenDialogEdit;
    },
    toggleDialogDelete() {
      this.isOpenDialogDelete = !this.isOpenDialogDelete;
    },
    huy() {
      this.desserts = this.desserts.map((item) => {
        item.name = 'pp';
        return item;
      })
    },
  }
}
</script>

<style scoped>

</style>