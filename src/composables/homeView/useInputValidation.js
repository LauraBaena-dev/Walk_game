import { ref } from 'vue';

export function useInputValidation() {
  const errors = ref({
    columnas: '',
    filas: '',
  });

  const validateColumnas = (value) => {
    errors.value.columnas = '';
    if (value !== null) {
      if (value <= 2 || value > 6) {
        errors.value.columnas = 'El número debe ser mayor que 2 y menor que 7.';
      }
    }
  };

  const validateFilas = (value) => {
    errors.value.filas = '';
    if (value !== null) {
      if (value <= 2 || value > 6) {
        errors.value.filas = 'El número debe ser mayor que 2 y menor que 7.';
      }
    }
  };

  const validateBoth = (columnas, filas) => {
    validateColumnas(columnas);
    validateFilas(filas);
  };

  return {
    errors,
    validateColumnas,
    validateFilas,
    validateBoth,
  };
}
