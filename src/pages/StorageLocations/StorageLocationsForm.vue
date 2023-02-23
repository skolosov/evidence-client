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

    <v-btn type="submit" block class="mt-2">Войти</v-btn>
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
      default: {},
    }
  },
  data: () => ({
    storage: '',
    division: null,
    rules,
  }),
  mounted() {
    this.storage = this.active?.name || '';
    this.division = this.active?.id || null;
  },
  computed: {
    ...mapGetters(['divisionsOptions'])
  },
  methods: {
    async submit(event) {
      const results = await event
      console.log(results);
    }
  }
}
</script>

<style scoped>

</style>