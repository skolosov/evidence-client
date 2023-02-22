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
        :items="items"
        item-title="name"
        item-value="value"
        label="Подразделение"
        :rules="[rules.required]"
        variant="outlined"
    ></v-select>
<!--    <v-text-field-->
<!--        class="mb-2"-->
<!--        variant="outlined"-->
<!--        v-model="password"-->
<!--        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--        :rules="[rules.required, rules.min]"-->
<!--        :type="showPassword ? 'text' : 'password'"-->
<!--        label="Пароль"-->
<!--        @click:append="showPassword = !showPassword"-->
<!--    ></v-text-field>-->

    <v-btn type="submit" block class="mt-2">Войти</v-btn>
  </v-form>
</template>

<script>
import rules from "../../formsRules";

export default {
  name: "StorageLocationsForm",
  data: () => ({
    storage: '',
    division: null,
    items: [
      {name: 'ГУ МВД', value: 1},
      {name: 'Володарский', value: '2'}
    ],
    rules,
  }),
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