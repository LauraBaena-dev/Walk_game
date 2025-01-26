<template>
  <b-container class="home-container">
    <b-row class="justify-content-center">
      <b-col>
        <CTAButton button-text="Iniciar partida" @show-modal="showModal" />
        <modal-new-game ref="modalGame"
          ><p>Indica el numero de columnas y filas del tablero</p>
          <form-create-new-game />
        </modal-new-game>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';
import ModalNewGame from '@/components/common/Modal.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import FormCreateNewGame from '@/components/FormCreateNewGame.vue';

const modalGame = ref(null);
const showModal = () => modalGame.value?.showModal();
</script>

<style lang="scss" scoped>
.home-container {
  button.custom-primary {
    margin: 0 auto;
    display: block;
  }
}
</style>
