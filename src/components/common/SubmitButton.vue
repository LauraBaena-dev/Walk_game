<!-- SubmitButton.vue -->
<template>
  <button
    type="submit"
    class="custom-primary"
    :disabled="isSubmitting || hasErrors || !isFormComplete"
  >
    <span
      v-if="isSubmitting"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    <span v-else>Enviar</span>
  </button>
</template>

<script setup>
defineProps({
  isSubmitting: {
    type: Boolean,
    required: true,
  },
  hasErrors: {
    type: Boolean,
    required: true,
  },
  isFormComplete: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    default: 'Enviar',
  },
});
</script>

<style lang="scss" scoped>
button.custom-primary {
  min-width: 115px;
}
</style>
