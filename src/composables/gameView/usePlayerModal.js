import { ref } from 'vue';

export function usePlayerModal() {
  const modalChoosePlayerref = ref(null);
  const errorSelection = ref(null);

  const showModal = () => {
    if (modalChoosePlayerref.value) {
      modalChoosePlayerref.value.showModal();
    }
  };

  const closeModal = () => {
    if (modalChoosePlayerref.value) {
      modalChoosePlayerref.value.closeModal();
    }
  };

  return {
    modalChoosePlayerref,
    errorSelection,
    showModal,
    closeModal,
  };
}
