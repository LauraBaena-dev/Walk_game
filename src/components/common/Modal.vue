<template>
  <b-modal v-model="isModalVisible" :size="size" hide-footer>
    <template #default>
      <slot></slot>
    </template>
  </b-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CustomModal',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
  },
  setup() {
    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    return {
      isModalVisible,
      showModal,
      closeModal,
    };
  },
};
</script>
