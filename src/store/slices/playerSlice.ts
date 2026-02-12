import { createSlice } from '@reduxjs/toolkit';
import { Player } from '../../Models/Player';
import { Status } from '../status';
import { fetchAllPlayers } from '../../Services/PlayerService';

export interface PlayerSliceState {
    fetchAllPlayersStatus: Status,
    fetchAllPlayersError: string,
    allPlayers: Player[],
    team1Players: Player[],
    team2Players: Player[]
};

const playerSliceInitialState: PlayerSliceState = {
    fetchAllPlayersStatus: Status.Idle,
    fetchAllPlayersError: '',
    allPlayers: [],
    team1Players: [],
    team2Players: []
};

export const playerSlice = createSlice({
    name: 'player',
    initialState: playerSliceInitialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPlayers.pending, (state) => {
                state.fetchAllPlayersStatus = Status.Pending;
            })
            .addCase(fetchAllPlayers.fulfilled, (state, action) => {
                state.fetchAllPlayersStatus = Status.Fulfilled;
                state.allPlayers = action.payload;
            })
            .addCase(fetchAllPlayers.rejected, (state, action) => {
                state.fetchAllPlayersStatus = Status.Failed;
                state.fetchAllPlayersError = action.error.message || 'Failed to fetch all players'
            });
    }
});

// export const { assignPlayersToTeams, clearTeamPlayers } = playerSlice.actions;
export default playerSlice.reducer;