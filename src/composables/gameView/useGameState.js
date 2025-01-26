import { useRouter } from 'vue-router';
import api from '@/services/api';

export function useGameState({ showModal }) {
  const router = useRouter();
  const game = localStorage.getItem('currentGame');

  const clearGame = () => {
    localStorage.removeItem('currentGame');
    localStorage.removeItem('selectedPlayer');
    router.push('/');
  };

  const initializeGame = async ({ loadPlayers, playerToPosition }) => {
    try {
      await loadPlayers();
      const storedPlayer = localStorage.getItem('selectedPlayer');

      if (!game) {
        router.push('/');
        return;
      }

      await api.getGame();

      if (!storedPlayer) {
        showModal();
      } else {
        playerToPosition.value = JSON.parse(storedPlayer);
      }
    } catch (error) {
      console.error('Error en la inicialización:', error);
      clearGame();
    }
  };

  return {
    game,
    clearGame,
    initializeGame,
  };
}
