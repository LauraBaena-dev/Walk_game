import { describe, it, expect } from 'vitest';
import { useInputValidation } from '../../composables/homeView/useInputValidation';

describe('useInputValidation', () => {
  describe('validateColumnas', () => {
    it('Should return an error message when the value is less than or equal to 2', () => {
      const { validateColumnas, errors } = useInputValidation();

      validateColumnas(2);

      expect(errors.value.columnas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });

    it('Should return an error message when the value is greater than 6', () => {
      const { validateColumnas, errors } = useInputValidation();

      validateColumnas(7);

      expect(errors.value.columnas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });

    it('Should return an empty error message when the value is valid', () => {
      const { validateColumnas, errors } = useInputValidation();

      validateColumnas(4);

      expect(errors.value.columnas).toBe('');
    });

    it('Should return an empty error message when the value is null', () => {
      const { validateColumnas, errors } = useInputValidation();

      validateColumnas(null);

      expect(errors.value.columnas).toBe('');
    });
  });

  describe('validateFilas', () => {
    it('Should return an error message when the value is less than or equal to 2', () => {
      const { validateFilas, errors } = useInputValidation();

      validateFilas(2);

      expect(errors.value.filas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });

    it('Should return an error message when the value is greater than 6', () => {
      const { validateFilas, errors } = useInputValidation();

      validateFilas(7);

      expect(errors.value.filas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });

    it('Should return an empty error message when the value is valid', () => {
      const { validateFilas, errors } = useInputValidation();

      validateFilas(4);

      expect(errors.value.filas).toBe('');
    });

    it('Should return an empty error message when the value is null', () => {
      const { validateFilas, errors } = useInputValidation();

      validateFilas(null);

      expect(errors.value.filas).toBe('');
    });
  });

  describe('validateBoth', () => {
    it('Should validate both columns and rows', () => {
      const { validateBoth, errors } = useInputValidation();

      validateBoth(2, 7);

      expect(errors.value.columnas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
      expect(errors.value.filas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });

    it('Should validate both columns and rows correctly when both values are valid', () => {
      const { validateBoth, errors } = useInputValidation();

      validateBoth(4, 5);

      expect(errors.value.columnas).toBe('');
      expect(errors.value.filas).toBe('');
    });

    it('Should validate both columns and rows correctly when one value is valid and the other is not', () => {
      const { validateBoth, errors } = useInputValidation();

      validateBoth(4, 7);

      expect(errors.value.columnas).toBe('');
      expect(errors.value.filas).toBe(
        'El número debe ser mayor que 2 y menor que 7.',
      );
    });
  });

  describe('errors ref', () => {
    it('Should initialize with empty strings', () => {
      const { errors } = useInputValidation();

      expect(errors.value).toEqual({
        columnas: '',
        filas: '',
      });
    });
  });
});
