import { createSlice } from '@reduxjs/toolkit';
import { Teams } from '../../Models/Teams';

export interface GameSliceState {
    teamBattingFirst: Teams;
};

const gameSliceInitialState: GameSliceState = {
    teamBattingFirst: 1
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameSliceInitialState,
    reducers: {
        setTeamBattingFirst: (state, action) => {
            state.teamBattingFirst = action.payload.teamBattingFirst;
        }
    }
});

export const { setTeamBattingFirst } = gameSlice.actions;
export default gameSlice.reducer;