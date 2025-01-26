<template>
  <form @submit.prevent="handleSubmit">
    <b-row class="form-area">
      <InputField
        id="columnas"
        v-model="columnas"
        label="Columnas"
        :error="errors.columnas"
        @input="validateNumbers"
      />
      <InputField
        id="filas"
        v-model="filas"
        label="Filas"
        :error="errors.filas"
        @input="validateNumbers"
      />
    </b-row>
    <div class="submit-area">
      <SubmitButton
        :is-submitting="isSubmitting"
        :has-errors="hasErrors"
        :is-form-complete="isFormComplete"
      />
      <div v-if="submitError" class="text-danger mt-2">{{ submitError }}</div>
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue';
import { useGameForm } from '../composables/homeView/useGameForm';
import { useInputValidation } from '../composables/homeView/useInputValidation';
import SubmitButton from './common/SubmitButton.vue';
import InputField from './common/InputField.vue';

const { columnas, filas, isSubmitting, submitError, handleSubmit } =
  useGameForm();
const { errors, validateBoth } = useInputValidation();

const hasErrors = computed(() =>
  Object.values(errors.value).some((error) => error.length > 0),
);

const isFormComplete = computed(
  () =>
    columnas.value !== null &&
    filas.value !== null &&
    columnas.value > 0 &&
    filas.value > 0,
);
const validateNumbers = () => {
  validateBoth(columnas.value, filas.value);
};
</script>

<style lang="scss" scoped>
.spinner-border {
  margin-right: 5px;
}
button.custom-primary {
  margin: $spacing-regular;
  margin-bottom: 0px;
}
</style>
