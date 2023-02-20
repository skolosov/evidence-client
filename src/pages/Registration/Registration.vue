<template>
  <v-sheet width="600" class="mx-auto pa-8">
    <v-form fast-fail @submit.prevent="submit">
      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="firstName"
          label="Имя"
          :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="lastName"
          label="Фамилия"
          :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="familyName"
          label="Отчество"
          :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="phone"
          label="Номер телефона"
          :rules="[rules.required]"
          v-mask="'+7(###)-###-##-##'"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="email"
          label="Адрес электронной почты"
          :rules="[rules.required, rules.email]"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          label="Пароль"
          @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-text-field
          class="mb-2"
          variant="outlined"
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Повторите пароль"
          @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Войти</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import rules from "../../formsRules";

export default {
  name: "Registration",
  data: () => ({
    firstName: '',
    lastName: '',
    familyName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
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