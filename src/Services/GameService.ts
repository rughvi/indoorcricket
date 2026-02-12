import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentGame } from '../Models/CurrentGame';

const currentGameCollection = 'currentGame';
const currentGameDocument = 'details';

export const fetchCurrentGame = createAsyncThunk('currentGame/fetchCurrentGame', async () => {
    const fireStoreDB = getFirestore()
    const currentGameColl = doc(fireStoreDB, currentGameCollection, currentGameDocument);
    const currentGameSnapshot = await getDoc(currentGameColl);

    let currentGame: CurrentGame = { gameId: '' }
    if(currentGameSnapshot.exists()) {
        console.log('current game data')
        console.log(currentGameSnapshot.data);
    } 
    
    return currentGame;
});