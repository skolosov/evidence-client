<template>
  <v-form fast-fail @submit.prevent="submit">
    <v-text-field
        class="mb-2"
        variant="outlined"
        v-model="storage"
        label="Наименование места хранения"
        :rules="[rules.required]"
    ></v-text-field>

    <v-select
        v-model="division"
        :items="divisionsOptions"
        item-title="name"
        item-value="id"
        label="Подразделение"
        :rules="[rules.required]"
        variant="outlined"
    ></v-select>

    <v-btn type="submit" block class="mt-2">{{ labelButton }}</v-btn>
    <v-btn type="button" color="secondary" block class="mt-2" @click="closeForm">Закрыть</v-btn>
  </v-form>
</template>

<script>
import rules from "../../formsRules";
import {mapGetters} from 'vuex';

export default {
  name: "StorageLocationsForm",
  props: {
    active: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    storage: '',
    division: null,
    rules,
  }),
  mounted() {
    this.storage = this.active?.name || '';
    this.division = this.active?.division_id || null;
  },
  computed: {
    ...mapGetters(['divisionsOptions']),
    labelButton() {
      return this.active ? 'Обновить' : 'Создать';
    },
  },
  methods: {
    async submit(event) {
      const results = await event
      const {valid} = results;
      if (valid) {
        this.$emit('form-sub', {
          name: this.storage,
          division_id: this.division,
        });
      }
    },
    closeForm() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>