import { ref } from 'vue';
import api from '@/services/api';
import { getPlayersData } from '@/services/dataPlayer';

export function usePlayerSelection({ closeModal, errorSelection }) {
  const playersList = ref([]);
  const selectedPlayer = ref(null);
  const playerToPosition = ref(null);

  const selectPlayer = (player) => {
    selectedPlayer.value = player;
    errorSelection.value = null;
  };

  const saveSelectedPlayer = async () => {
    try {
      const storedPlayer = localStorage.getItem('selectedPlayer');

      if (!selectedPlayer.value) return;

      if (!storedPlayer) {
        await api.addPlayer(selectedPlayer.value.name);
        localStorage.setItem(
          'selectedPlayer',
          JSON.stringify(selectedPlayer.value),
        );
        playerToPosition.value = selectedPlayer.value;
        errorSelection.value = null;
        closeModal();
      } else {
        if (selectedPlayer.value.name !== JSON.parse(storedPlayer).name) {
          await api.removePlayer(JSON.parse(storedPlayer).name);
          await api.addPlayer(selectedPlayer.value.name);
          localStorage.setItem(
            'selectedPlayer',
            JSON.stringify(selectedPlayer.value),
          );
          playerToPosition.value = selectedPlayer.value;
          errorSelection.value = null;
          closeModal();
        } else {
          errorSelection.value = 'Jugador actual. Selectiona otro jugador.';
        }
      }
    } catch (error) {
      console.error('Error al guardar jugador:', error);
      errorSelection.value = 'Error al guardar el jugador';
    }
  };

  const loadPlayers = async () => {
    playersList.value = await getPlayersData();
  };

  return {
    playersList,
    selectedPlayer,
    playerToPosition,
    selectPlayer,
    saveSelectedPlayer,
    loadPlayers,
  };
}
