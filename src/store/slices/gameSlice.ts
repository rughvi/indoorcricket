import { createSlice } from '@reduxjs/toolkit';
import { Teams } from '../../Models/Teams';
import { fetchCurrentGame } from '../../Services/GameService';
import { Status } from '../status';
import { CurrentGame } from '../../Models/CurrentGame';
import { InningsStatus } from '../../Models/InningsStatus';

export interface GameSliceState {
    fetchCurrentGameStatus: Status;
    fetchCurrentGameError: string;
    currentGame: CurrentGame;
};

const gameSliceInitialState: GameSliceState = {
    fetchCurrentGameStatus: Status.Idle,
    fetchCurrentGameError: '',
    currentGame: { gameId: '', game: { team1: [], team2: [], teamBattingFirst: Teams.One, innings1Status: InningsStatus.NotStarted, innings2Status: InningsStatus.NotStarted}}
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameSliceInitialState,
    reducers: {
        setTeamBattingFirst: (state, action) => {
            state.currentGame.game.teamBattingFirst = action.payload.teamBattingFirst;
        },
        assignPlayersToTeams: (state, action) => {
            if(action.payload.team === "1") {
                state.currentGame.game.team1 = Object.assign([], action.payload.players);
            } else if (action.payload.team === "2") {
                state.currentGame.game.team2 = Object.assign([], action.payload.players);
            }
        },
        clearTeamPlayers: (state) => {
            state.currentGame.game.team1 = []
            state.currentGame.game.team2 = []
        },
        updateInningsCurrentPlayer: (state, action) => {
            state.currentGame.game = { ...state.currentGame.game, [action.payload.key] : action.payload.value }
        },
        updateInningsCurrentBowler: (state, action) => {
            state.currentGame.game = { ...state.currentGame.game, [action.payload.key] : action.payload.value }
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

export const { setTeamBattingFirst, assignPlayersToTeams, clearTeamPlayers, updateInningsCurrentPlayer, updateInningsCurrentBowler } = gameSlice.actions;
export default gameSlice.reducer;