<template>
  <b-button
    :class="`custom-primary ${props.isInvert ? 'invert' : ''}`"
    @click="handleClick"
    >{{ props.buttonText }}</b-button
  >
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Iniciar paseo',
  },
  isInvert: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['show-modal']);

const handleClick = () => {
  emit('show-modal');
};
</script>
