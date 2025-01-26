<template>
  <div class="col-12 col-md-6">
    <label :for="id" class="form-label">
      {{ props.label }}
      <span class="required">*</span>
    </label>
    <input
      :id="props.id"
      :value="props.modelValue"
      type="number"
      class="form-control"
      min="3"
      required
      @input="handleInput"
    />
    <div v-if="props.error" class="text-danger">
      {{ props.error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'input']);

const handleInput = (event) => {
  const value = event.target.value ? Number(event.target.value) : null;
  emit('update:modelValue', value);
  emit('input', value);
};
</script>

<style lang="scss" scoped>
.form-label {
  .required {
    color: $color-red-border-regular;
  }
}
.form-control:focus {
  box-shadow: 0 0 0 0.25rem $color-beige;
  border-color: $color-bg;
}
</style>
