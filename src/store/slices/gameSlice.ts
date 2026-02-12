import { createSlice } from '@reduxjs/toolkit';
import { Teams } from '../../Models/Teams';
import { fetchCurrentGame } from '../../Services/GameService';
import { Status } from '../status';
import { CurrentGame } from '../../Models/CurrentGame';

export interface GameSliceState {
    fetchCurrentGameStatus: Status;
    fetchCurrentGameError: string;
    currentGame: CurrentGame;
    teamBattingFirst: Teams;
};

const gameSliceInitialState: GameSliceState = {
    fetchCurrentGameStatus: Status.Idle,
    fetchCurrentGameError: '',
    currentGame: { gameId: '' },
    teamBattingFirst: 1
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameSliceInitialState,
    reducers: {
        setTeamBattingFirst: (state, action) => {
            state.teamBattingFirst = action.payload.teamBattingFirst;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentGame.pending, (state) => {
                state.fetchCurrentGameStatus = Status.Pending;
            })
            .addCase(fetchCurrentGame.fulfilled, (state, action) => {
                state.fetchCurrentGameStatus = Status.Fulfilled;
                state.currentGame = action.payload;
            })
            .addCase(fetchCurrentGame.rejected, (state, action) => {
                state.fetchCurrentGameStatus = Status.Failed;
                state.fetchCurrentGameError = action.error.message || 'Failed to fetch current game';
            });
    }
});

export const { setTeamBattingFirst } = gameSlice.actions;
export default gameSlice.reducer;