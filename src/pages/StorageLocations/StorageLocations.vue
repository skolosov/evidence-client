<template>
  <v-btn variant="elevated" @click="huy">zahuy</v-btn>
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
    <dialog-component
        title="Изменение места хранения"
        :is-open="isOpenDialogEdit"
        @toggle="toggleDialogEdit"
    >
      <template v-slot:content>
        <storage-locations-form/>
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

export default {
  name: "StorageLocations",
  components: {StorageLocationsForm, DialogComponent},
  data() {
    return {
      isOpenDialogEdit: false,
      isOpenDialogDelete: false,
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
  mounted() {
    console.log(this.desserts);
    // this.huy();
    console.log(this.desserts);
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

    }
  }
}
</script>

<style scoped>

</style>