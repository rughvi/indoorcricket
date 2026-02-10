import { configureStore } from '@reduxjs/toolkit'

import playerReducer from './slices/playerSlice';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer
  },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>