const PLAYER_IMAGES = {
  JAINA: () => import('@/assets/img/players/Jaina.jpg'),
  MALFURION: () => import('@/assets/img/players/Malfurion.jpg'),
  SYLVANAS: () => import('@/assets/img/players/Sylvanas.jpg'),
  THRALL: () => import('@/assets/img/players/Thrall.jpg'),
  UTHER: () => import('@/assets/img/players/Uther.jpg'),
  VALEERA: () => import('@/assets/img/players/Valeera.jpg'),
};
const PLAYER_COLORS = {
  BLUE: '#69ccf0',
  ORANGE: '#ff7d0a',
  GREEN: '#abd473',
  ROYAL_BLUE: '#0070de',
  PINK: '#f58cba',
  YELLOW: '#fff569',
};

const PLAYERS_CONFIG = [
  {
    id: 'jaina',
    name: 'Jaina',
    imageKey: 'JAINA',
    color: PLAYER_COLORS.BLUE,
  },
  {
    id: 'malfurion',
    name: 'Malfurion',
    imageKey: 'MALFURION',
    color: PLAYER_COLORS.ORANGE,
  },
  {
    id: 'sylvanas',
    name: 'Sylvanas',
    imageKey: 'SYLVANAS',
    color: PLAYER_COLORS.GREEN,
  },
  {
    id: 'thrall',
    name: 'Thrall',
    imageKey: 'THRALL',
    color: PLAYER_COLORS.ROYAL_BLUE,
  },
  {
    id: 'uther',
    name: 'Uther',
    imageKey: 'UTHER',
    color: PLAYER_COLORS.PINK,
  },
  {
    id: 'valeera',
    name: 'Valeera',
    imageKey: 'VALEERA',
    color: PLAYER_COLORS.YELLOW,
  },
];

const getPlayersData = async () => {
  const players = await Promise.all(
    PLAYERS_CONFIG.map(async (player) => {
      const imageModule = await PLAYER_IMAGES[player.imageKey]();
      return {
        ...player,
        imageUrl: imageModule.default,
      };
    }),
  );
  return players;
};

export { getPlayersData, PLAYER_COLORS };
