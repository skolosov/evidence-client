export default {
    required: value => !!value || 'Должно быть заполнено',
    min: v => v.length >= 8 || 'Минимальное количество символов 8',
    email: v => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || 'Адрес электронной не корректен',
}