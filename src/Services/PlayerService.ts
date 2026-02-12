import { Player } from "../Models/Player";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllPlayers = createAsyncThunk('players/fetchAllPlayers', async () => {
    const fireStoreDB = getFirestore()
    const playersColl = collection(fireStoreDB, 'players');
    const playersSnapshot = await getDocs(playersColl);
    const players = playersSnapshot.docs.map(doc => <Player>{ name: doc.data().name });
    return players;
});