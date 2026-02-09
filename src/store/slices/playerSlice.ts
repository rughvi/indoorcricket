import { createSlice } from '@reduxjs/toolkit';
import { Player } from '../../Models/Player';

export interface PlayerSliceState {
    allPlayers: Player[],
    team1Players: Player[],
    team2Players: Player[]
};

const playerSliceInitialState: PlayerSliceState = {
    allPlayers: [],
    team1Players: [],
    team2Players: []
};

export const playerSlice = createSlice({
    name: 'player',
    initialState: playerSliceInitialState,
    reducers: {
        assignAllPlayers: (state, action) => {
            state.allPlayers = action.payload;
        },
        assignPlayersToTeams: (state, action) => {
            if(action.payload.team === "1") {
                state.team1Players = Object.assign([], action.payload.players);
            } else if (action.payload.team === "2") {
                state.team2Players = Object.assign([], action.payload.players);
            }
        },
        clearTeamPlayers: (state) => {
            state.team1Players = []
            state.team2Players = []
        }
    }
});

export const { assignAllPlayers, assignPlayersToTeams, clearTeamPlayers } = playerSlice.actions;
export default playerSlice.reducer;