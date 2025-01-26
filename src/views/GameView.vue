<template>
  <div>
    <b-container class="container-game"
      ><b-row>
        <b-col class="col-game-buttons">
          <CTAButton button-text="Reniciar juego" @click="clearGame" />
          <CTAButton
            is-invert
            button-text="Seleccionar personaje"
            @show-modal="showModal"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <GameTable v-if="game" :current-player="playerToPosition" />
        </b-col>
      </b-row>
    </b-container>
    <ModalChoosePlayer ref="modalChoosePlayerref" size="lg">
      <p class="modal-title">Selecciona un personaje.</p>
      <p>Al seleccionar uno se borrará el anterior</p>
      <div class="row-players">
        <div
          v-for="player in playersList"
          :key="player.name"
          class="col-players"
          :class="{
            selected: selectedPlayer && selectedPlayer.name === player.name,
          }"
          :style="{
            borderColor:
              selectedPlayer && selectedPlayer.name === player.name
                ? player.color
                : 'transparent',
          }"
          @click="selectPlayer(player)"
        >
          <img :src="player.imageUrl" :alt="player.name" class="img-player" />
        </div>
      </div>
      <p class="modal-error text-danger">{{ errorSelection }}</p>
      <CTAButton
        button-text="Seleccionar personaje"
        :disabled="!selectedPlayer"
        @click="saveSelectedPlayer"
      />
    </ModalChoosePlayer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import GameTable from '@/components/GameTable.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import ModalChoosePlayer from '@/components/common/Modal.vue';
import { usePlayerModal } from '@/composables/gameView/usePlayerModal';
import { usePlayerSelection } from '@/composables/gameView/usePlayerSelection';
import { useGameState } from '@/composables/gameView/useGameState';

const { modalChoosePlayerref, errorSelection, showModal, closeModal } =
  usePlayerModal();

const {
  playersList,
  selectedPlayer,
  playerToPosition,
  selectPlayer,
  saveSelectedPlayer,
  loadPlayers,
} = usePlayerSelection({ closeModal, errorSelection });

const { game, clearGame, initializeGame } = useGameState({ showModal });

onMounted(() => {
  initializeGame({ loadPlayers, playerToPosition });
});
</script>

<style lang="scss" scoped>
.container-game {
  max-width: 100%;
}
.col-game-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  @media (min-width: 768px) {
    gap: 12px;
  }
}
.row-players {
  gap: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
  .col-players {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: calc(50% - 8px);
    border-radius: 8px;
    cursor: pointer;
    border: 4px solid transparent;
    transition: border-color 0.3s;
    position: relative;
    &.selected {
      //default
      border-color: $color-gold-regular;
    }
  }
  @media (min-width: 992px) {
    gap: $spacing-regular;
    margin-bottom: $spacing-regular;
    .col-players {
      gap: $spacing-regular;
      width: calc(33% - 14px);
    }
  }
}
.modal-title {
  font-size: 22px;
}
.img-player {
  width: 100%;
  height: 100%;
}
</style>
