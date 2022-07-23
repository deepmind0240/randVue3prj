<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Sort by</option>
    <option v-for="option in options" :key="option.value" :value="option.value"> {{ option.name }} </option>
  </select>
</template>

<script>
export default {
  name: 'drop-menu',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
}

</script>

<style>
select {
  background-color: #A0BCC2;
}
</style>