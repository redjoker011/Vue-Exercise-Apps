<template>
  <!-- Listen to input event to avoid unexpected behavior when clicking on alert -->
  <v-alert type="error" dismissible @input="onClose" :value="true">
    {{ error }}
  </v-alert>
</template>
<script>
export default {
  props: ['error'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
