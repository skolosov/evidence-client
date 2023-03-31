<template>
  <v-form fast-fail @submit.prevent="submit">
    <v-row style="width: 800px">
      <v-col cols="6">
        <v-select
            :items="evidenceTypes"
            label="Тип вещественного доказательства"
            :rules="[rules.required]"
            variant="outlined"
            v-model="model.resource_type"
            item-title="name"
            item-value="id"
        ></v-select>
        <v-select
            :items="storageLocationsRows"
            label="Место хранения"
            :rules="[rules.required]"
            item-title="name"
            item-value="id"
            variant="outlined"
            v-model="model.storage_location_id"
        ></v-select>

        <v-text-field
            class="mb-2"
            variant="outlined"
            v-model="model.name"
            label="Наименование вещественного доказательства"
            :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <v-text-field
            v-for="(item, idx) in inputFields"
            :key="idx"
            :type="item.type === 'number' ? 'number' : 'text'"
            class="mb-2"
            variant="outlined"
            v-model="model[item.model]"
            :label="item.label"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-btn type="submit" block class="mt-2">{{ labelButton }}</v-btn>
    <v-btn type="button" color="secondary" block class="mt-2" @click="closeForm">Закрыть</v-btn>
  </v-form>
</template>

<script>
import rules from "../../formsRules";
import {mapGetters} from "vuex";

export default {
  name: "EvidencesForm",
  emits: ['close', 'form-sub'],
  props: {
    active: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    model: {
      resource_type: 1,
      storage_location_id: null,
      name: null,
      liter: null,
      weight: null,
      amount: null,
      engine_number: null,
      registration_number: null,
      brand: null,
      color: null,
      release_date: null,
      series: null,
      number: null,
      detail: null,
      designation: null,
      quantity: null,
    },
    fields: {
      1: [
        {model: 'liter', label: 'Объем в литрах', type: 'number'},
      ],
      2: [
        {model: 'weight', label: 'Вес в граммах', type: 'number'},
      ],
      3: [
        {model: 'amount', label: 'Сумма в рублях', type: 'number'},
      ],
      4: [
        {model: 'engine_number', label: 'Номер двигателя', type: 'text'},
        {model: 'registration_number', label: 'Регистрационный номер', type: 'text'},
        {model: 'brand', label: 'Модель', type: 'text'},
        {model: 'color', label: 'Цвет', type: 'text'},
        {model: 'release_date', label: 'Год выпуска', type: 'text'},
      ],
      5: [
        {model: 'brand', label: 'Модель', type: 'text'},
        {model: 'series', label: 'Серия', type: 'text'},
        {model: 'number', label: 'Номер', type: 'text'},
        {model: 'detail', label: 'Наименование детали', type: 'text'},
        {model: 'release_date', label: 'Год выпуска', type: 'text'},
      ],
      6: [
        {model: 'designation', label: 'Наименование', type: 'text'},
        {model: 'quantity', label: 'Количество', type: 'text'},
        {model: 'amount', label: 'Сумма', type: 'text'},
        {model: 'series', label: 'Серия', type: 'text'},
        {model: 'number', label: 'Серийный номер', type: 'text'},
        {model: 'release_date', label: 'Год выпуска', type: 'text'},
      ]
    },

    rules,
  }),
  beforeMount() {
    this.model = {
      ...this.model,
      storage_location_id: +this.$route?.params?.id,
    };
    if (this.active) {
      this.model = {...this.model, ...this.getActiveDataModel};
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['storageLocationsRows', 'evidenceTypes']),
    inputFields() {
      return this.fields[this.model.resource_type];
    },
    currentModel() {
      const data = {
        resource_type: this.model.resource_type,
        storage_location_id: this.model.storage_location_id,
        name: this.model.name,
      };
      this.inputFields.forEach((item) => {
        data[item.model] = this.model[item.model];
      });
      return data;
    },
    labelButton() {
      return this.active ? 'Изменить' : 'Добавить';
    },
    getActiveDataModel() {
      const fields = {};
      Object.keys(this.model).forEach((item) => {
        if (this.active.resource?.[item]) {
          fields[item] = this.active.resource[item];
        }
      });
      return {
        resource_type: this.active.resource_type,
        ...fields,
        storage_location_id: this.active.storage_location_id,
      };
    }
  },
  methods: {
    async submit(event) {
      const results = await event
      const {valid} = results;
      if (valid) {
        this.$emit('form-sub', this.currentModel);
      }
    },
    closeForm() {
      this.$emit('close');
    }
  },
}
</script>

<style scoped>

</style>