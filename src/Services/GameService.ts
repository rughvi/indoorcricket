import { getFirestore, doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentGame } from '../Models/CurrentGame';
import { db } from '../Firebase/firebase';
import { Game } from '../Models/Game';
import { Teams } from '../Models/Teams';

const currentGameCollection = 'currentGame';
const gamesCollection = 'games';
const currentGameDocument = 'details';

export const fetchCurrentGame = createAsyncThunk('currentGame/fetchCurrentGame', async () => {
    const currentGameDoc = doc(db, currentGameCollection, currentGameDocument);
    const currentGameSnapshot = await getDoc(currentGameDoc);

    let currentGame: CurrentGame = { gameId: '', game: {team1: [], team2: [], teamBattingFirst: Teams.One}};
    if(currentGameSnapshot.exists()) {
        currentGame.gameId = currentGameSnapshot.data().gameId;

        const gameDoc = doc(db, gamesCollection, currentGame.gameId);
        const gameSnapshot = await getDoc(gameDoc);
        if(gameSnapshot.exists()){
            currentGame.game = { team1: gameSnapshot.data().team1, team2: gameSnapshot.data().team2, teamBattingFirst: gameSnapshot.data().teamBattingFirst };
        }        
    }
    return currentGame;
});

export const createNewGame = createAsyncThunk('game/createNewGame', async (game: Game) => {
    const gameDocRef = await addDoc(collection(db, "games"), game);

    const currentGameDocRef = doc(db, currentGameCollection, currentGameDocument);
    await setDoc(currentGameDocRef, <CurrentGame>{ gameId: gameDocRef.id });

    return gameDocRef.id;
});
