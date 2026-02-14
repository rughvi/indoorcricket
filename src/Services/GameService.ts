import { getFirestore, doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore/lite';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentGame } from '../Models/CurrentGame';
import { db } from '../Firebase/firebase';
import { Game } from '../Models/Game';
import { Teams } from '../Models/Teams';
import { InningsStatus } from '../Models/InningsStatus';
import { Player } from '../Models/Player';

const currentGameCollection = 'currentGame';
const gamesCollection = 'games';
const currentGameDocument = 'details';

export const fetchCurrentGame = createAsyncThunk('currentGame/fetchCurrentGame', async () => {
    const currentGameDoc = doc(db, currentGameCollection, currentGameDocument);
    const currentGameSnapshot = await getDoc(currentGameDoc);
    const game: Game = { team1: [], team2: [], teamBattingFirst: Teams.One, innings1Status: InningsStatus.NotStarted, innings2Status: InningsStatus.NotStarted};
    let currentGame: CurrentGame = { gameId: '', game };
    if(currentGameSnapshot.exists()) {
        currentGame.gameId = currentGameSnapshot.data().gameId;

        const gameDoc = doc(db, gamesCollection, currentGame.gameId);
        const gameSnapshot = await getDoc(gameDoc);
        if(gameSnapshot.exists()){
            currentGame.game = { 
                team1: gameSnapshot.data().team1, 
                team2: gameSnapshot.data().team2, 
                teamBattingFirst: gameSnapshot.data().teamBattingFirst, 
                innings1Status:  gameSnapshot.data().innings1Status,
                innings2Status: gameSnapshot.data().innings2Status,
                innings1CurrentPlayer1: gameSnapshot.data().innings1CurrentPlayer1,
                innings1CurrentPlayer2: gameSnapshot.data().innings1CurrentPlayer2,
                innings2CurrentPlayer1: gameSnapshot.data().innings2CurrentPlayer1,
                innings2CurrentPlayer2: gameSnapshot.data().innings2CurrentPlayer2
            };
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

export const updateInningsCurrentPlayer = createAsyncThunk('game/updateGame', async (input: {gameId: string, key: string, value: Player}) => {
    if(input.gameId) {
        const gameDocRef = doc(db, 'games', input.gameId);
        await setDoc(gameDocRef, { [input.key] : input.value}, {merge: true});
    }
});
