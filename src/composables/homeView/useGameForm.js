import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

export function useGameForm() {
  const router = useRouter();
  const columnas = ref(null);
  const filas = ref(null);
  const isSubmitting = ref(false);
  const submitError = ref(null);

  const saveGameToStorage = (gameData) => {
    localStorage.setItem('currentGame', JSON.stringify(gameData));
  };

  const handleSubmit = async () => {
    isSubmitting.value = true;
    submitError.value = null;

    try {
      await api.createGame(columnas.value, filas.value);

      saveGameToStorage({
        width: columnas.value,
        height: filas.value,
      });

      router.push('/game');
    } catch (error) {
      console.error('Error:', error);
      submitError.value = 'Error al crear el tablero de juego.';
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    columnas,
    filas,
    isSubmitting,
    submitError,
    handleSubmit,
  };
}
