<template>
  <div>
    <div class="table-container">
      <div v-for="row in rows" :key="row" class="row-table">
        <div
          v-for="column in columns"
          :key="column"
          class="col-table"
          :class="[
            {
              shadowToCurrentCell: shouldShowImage(row, column),
              shadow: addShadow(row, column),
              'col-table-size-6': columns.length === 6,
              'col-table-size-5': columns.length === 5,
              clickable: cellToMove(row, column),
            },
            currentPlayer?.id,
          ]"
          @click="positionToMove(row, column)"
        >
          <img
            v-if="shouldShowImage(row, column)"
            :src="currentPlayer.imageUrl"
            :alt="currentPlayer.name"
            class="img-current-player"
            @click.stop="showInfoModal"
          />
        </div>
      </div>
    </div>
    <modal-info-player
      v-if="currentPlayer"
      ref="modalInfoPlayer"
      size="sm"
      class="modal-info-player"
    >
      <div class="img-container">
        <img
          :src="currentPlayer.imageUrl"
          :alt="currentPlayer.name"
          class="img-current-player-info"
        />
      </div>

      <div class="player-content">
        <p>{{ currentPlayer.name }}</p>
        <p class="player-moves-container">
          Movimientos:
          <span
            v-for="(position, index) in posicionesPlayer"
            :key="position"
            class="player-moves"
          >
            <span v-if="index >= 1"> - </span>
            {{ position.row + position.column }}
          </span>
        </p>
      </div>
    </modal-info-player>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import api from '../services/api';
import ModalInfoPlayer from '@/components/common/Modal.vue';
import { usePlayer } from '@/composables/gameView/usePlayer';

export default {
  name: 'GameTable',
  components: { ModalInfoPlayer },
  props: {
    currentPlayer: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const storedGame = JSON.parse(localStorage.getItem('currentGame'));
    const storedPlayer = localStorage.getItem('selectedPlayer');
    const rows = ref(Array.from({ length: storedGame.height }, (_, i) => i));
    const columns = ref(Array.from({ length: storedGame.width }, (_, i) => i));
    const playerPosition = ref({ row: null, column: null });
    const playerInfo = ref(null);
    const modalInfoPlayer = ref(null);
    const posicionesPlayer = ref(null);
    const { transformRowsToLetters } = usePlayer();

    const getPlayerPosition = async () => {
      //pillamos la posicion actual
      try {
        playerInfo.value = await api.getPlayer(props.currentPlayer.name);
        playerPosition.value = playerInfo.value.player.position;
        posicionesPlayer.value = transformRowsToLetters(
          playerInfo.value.player.positions,
        );
      } catch (error) {
        console.error(error);
      }
    };

    const shouldShowImage = (row, col) => {
      //mostramos imagen en las coordenadas que tocan
      return (
        props.currentPlayer &&
        playerPosition.value &&
        row === playerPosition.value.row &&
        col === playerPosition.value.column
      );
    };

    const cellToMove = (row, col) => {
      //hacemos que se puedan seleccionar dichas casillas
      return (
        (row === playerPosition.value.row + 1 &&
          col === playerPosition.value.column) ||
        (row === playerPosition.value.row - 1 &&
          col === playerPosition.value.column) ||
        (col === playerPosition.value.column + 1 &&
          row === playerPosition.value.row) ||
        (col === playerPosition.value.column - 1 &&
          row === playerPosition.value.row)
      );
    };

    const addShadow = (row, col) => {
      if (playerInfo.value) {
        const positions = playerInfo.value.player.positions;
        for (let i = 0; i < positions.length; i++) {
          if (positions[i].row === row && positions[i].column === col) {
            return true;
          }
        }
      }
      return false;
    };

    const showInfoModal = () => {
      if (modalInfoPlayer.value) {
        modalInfoPlayer.value.showModal();
      }
    };

    const positionToMove = (row, col) => {
      api
        .movePlayer(playerInfo.value.player.username, row, col)
        .then((response) => {
          getPlayerPosition();
          return response;
        })
        .catch((error) => {
          return error;
        });
    };

    onMounted(() => {
      if (props.currentPlayer && storedPlayer) {
        getPlayerPosition();
      }
    });

    watch(
      () => props.currentPlayer,
      (newPlayer) => {
        if (newPlayer) {
          //cuando se cambia de pj, actualizamos posicion
          getPlayerPosition();
        }
      },
    );

    return {
      storedGame,
      rows,
      columns,
      shouldShowImage,
      showInfoModal,
      modalInfoPlayer,
      posicionesPlayer,
      cellToMove,
      positionToMove,
      addShadow,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: $spacing-light;
  width: auto;
  max-width: fit-content;
  margin: auto;
  margin-top: $spacing-regular;
  flex-direction: column;
  display: flex;
  gap: 4px;
  .row-table {
    display: flex;
    gap: 4px;
  }
  .col-table {
    height: 23vw;
    width: 23vw;
    max-width: 150px;
    max-height: 150px;
    border-radius: 5px;
    background-image: url('../assets/img/table/Land.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    pointer-events: none;
    &.col-table-size-6 {
      height: 13vw;
      width: 13vw;
    }
    &.col-table-size-5 {
      height: 15vw;
      width: 15vw;
    }
    &::after {
      display: block;
      position: absolute;
      content: '';
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-radius: 5px;
      transition: border-color 0.3s;
      pointer-events: none;
    }

    &.shadow,
    &.shadowToCurrentCell {
      &::after {
        //default
        border-color: $color-gold-regular;
        box-shadow: 0px 0px 5px 5px rgba($color-gold-regular, 0.61);
        -webkit-box-shadow: 0px 0px 5px 5px rgba($color-gold-regular, 0.61);
        -moz-box-shadow: 0px 0px 5px 5px rgba($color-gold-regular, 0.61);
      }
      &.jaina {
        &::after {
          border-color: $color-jaina;
          box-shadow: 0px 0px 5px 5px rgba($color-jaina, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-jaina, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-jaina, 0.61);
        }
      }
      &.uther {
        &::after {
          border-color: $color-uther;
          box-shadow: 0px 0px 5px 5px rgba($color-uther, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-uther, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-uther, 0.61);
        }
      }
      &.sylvanas {
        &::after {
          border-color: $color-sylvanas;
          box-shadow: 0px 0px 5px 5px rgba($color-sylvanas, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-sylvanas, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-sylvanas, 0.61);
        }
      }
      &.malfurion {
        &::after {
          border-color: $color-malfurion;
          box-shadow: 0px 0px 5px 5px rgba($color-malfurion, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-malfurion, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-malfurion, 0.61);
        }
      }
      &.thrall {
        &::after {
          border-color: $color-thrall;
          box-shadow: 0px 0px 5px 5px rgba($color-thrall, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-thrall, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-thrall, 0.61);
        }
      }
      &.valeera {
        &::after {
          border-color: $color-valeera;
          box-shadow: 0px 0px 5px 5px rgba($color-valeera, 0.61);
          -webkit-box-shadow: 0px 0px 5px 5px rgba($color-valeera, 0.61);
          -moz-box-shadow: 0px 0px 5px 5px rgba($color-valeera, 0.61);
        }
      }
    }
    &.clickable {
      cursor: pointer;
      pointer-events: all;
    }
  }
  @media (min-width: 768px) {
    padding: $spacing-regular;
    gap: 12px;
    max-width: fit-content;
    margin-top: $spacing-xl;
    .row-table {
      gap: 12px;
    }
  }
}
.img-current-player {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  pointer-events: auto;
}
.player-content {
  padding: $spacing-light;
  @media (min-width: 768px) {
    padding: $spacing-regular;
  }
}
.player-moves-container {
  margin: 0px;
}
.player-moves {
  text-transform: uppercase;
}
.img-container {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, #000000 0%, #00000000 30%);
    pointer-events: none;
  }
  .img-current-player-info {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    position: relative;
    display: block;
  }
}
</style>
