// Constantes endpoints
const BASE_URL = 'http://localhost:5188';
const ENDPOINTS = {
  GAME: '/game',
  PLAYER: '/player',
};

// Opciones base
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

/**
 * @typedef {Object} ApiError
 * @property {number} status
 * @property {string} message
 */

/**
 * Función base para peticiones HTTP
 * @throws {ApiError}
 */
const http = async (path, method, data) => {
  try {
    const response = await fetch(path, {
      ...DEFAULT_OPTIONS,
      method: method || 'GET',
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText || 'Error en la petición',
      };
    }

    return response.json();
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      message: 'Error de conexión',
    };
  }
};

const useGet = async (path) => {
  return http(path, 'GET');
};

const usePost = async (path, data) => {
  return http(path, 'POST', data);
};

const useDelete = async (path, data) => {
  return http(path, 'DELETE', data);
};

const usePatch = async (path, data) => {
  return http(path, 'PATCH', data);
};

export default {
  createGame(width, height) {
    const url = `${BASE_URL}${ENDPOINTS.GAME}`;
    const data = {
      width: width,
      height: height,
    };
    return usePost(url, data);
  },
  getGame() {
    const url = `${BASE_URL}${ENDPOINTS.GAME}`;
    return useGet(url);
  },
  addPlayer(name) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYER}`;
    const data = {
      username: name,
    };
    return usePost(url, data);
  },
  getPlayer(player) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYER}?username=${player}`;
    return useGet(url);
  },
  removePlayer(player) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYER}`;
    const data = {
      username: player,
    };
    return useDelete(url, data);
  },
  movePlayer(player, row, col) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYER}/${player}`;
    const data = [
      {
        op: 'replace',
        path: '/Position',
        value: { Row: row, Column: col },
      },
    ];
    return usePatch(url, data);
  },
};
