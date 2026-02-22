import { doc, getDoc, addDoc, collection, setDoc, updateDoc, FieldValue, arrayUnion, runTransaction } from 'firebase/firestore/lite';
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
                innings1CurrentBowler: gameSnapshot.data().innings1CurrentBowler,
                innings2CurrentBowler: gameSnapshot.data().innings2CurrentBowler,
                innings1CurrentPlayer1: gameSnapshot.data().innings1CurrentPlayer1,
                innings1CurrentPlayer2: gameSnapshot.data().innings1CurrentPlayer2,
                innings2CurrentPlayer1: gameSnapshot.data().innings2CurrentPlayer1,
                innings2CurrentPlayer2: gameSnapshot.data().innings2CurrentPlayer2,
                innings1PlayersScore: gameSnapshot.data().innings1PlayersScore,
                innings2PlayersScore: gameSnapshot.data().innings2PlayersScore,
                innings1TotalRuns: gameSnapshot.data().innings1TotalRuns,
                innings2TotalRuns: gameSnapshot.data().innings2TotalRuns,
                innings1TotalBalls: gameSnapshot.data().innings1TotalBalls,
                innings2TotalBalls: gameSnapshot.data().innings2TotalBalls,
                innings1Extras: gameSnapshot.data().innings1Extras,
                innings2Extras: gameSnapshot.data().innings2Extras,
                innings1Wickets: gameSnapshot.data().innings1Wickets,
                innings2Wickets: gameSnapshot.data().innings2Wickets,
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

export const endInnings = createAsyncThunk('game/endInnings', async (input: {gameId: string, inningsId: string}) => {
    if(input.gameId && input.inningsId) {
        const key = `innings${input.inningsId}Status`;
        const gameDocRef = doc(db, 'games', input.gameId);
        await setDoc(gameDocRef, { [key] : 'Finished'}, {merge: true});
    }
});

export const updateInningsCurrentPlayer = createAsyncThunk('game/updateGame', async (input: {gameId: string, key: string, value: Player}) => {
    if(input.gameId) {
        const gameDocRef = doc(db, 'games', input.gameId);
        await setDoc(gameDocRef, { [input.key] : input.value}, {merge: true});
    }
});

export const updateInningsCurrentBowler = createAsyncThunk('game/updateGame', async (input: {gameId: string, key: string, value: Player}) => {
    if(input.gameId) {
        const gameDocRef = doc(db, 'games', input.gameId);
        await setDoc(gameDocRef, { [input.key] : input.value}, {merge: true});
    }
});

export const updateInningsCurrentPlayerScore = createAsyncThunk('game/updateInningsCurrentPlayerScore', async (input: {gameId: string, inningsId: string, player: Player, score: number}) => {
    await runTransaction(db, async (transaction) => {
        const gameDocRef = doc(db, 'games', input.gameId);
        const gameDoc = await transaction.get(gameDocRef);
        if (!gameDoc.exists()) {
            throw "Document does not exist!";
        }

        const inningsScoreKey = (input.inningsId == "1"? 'innings1PlayersScore': 'innings2PlayersScore');
        const inningsTotalRunsKey = `innings${input.inningsId}TotalRuns`;
        const inningsTotalBallsKey = `innings${input.inningsId}TotalBalls`;
        
        const gameData = gameDoc.data();        
        const inningsScore = gameData[inningsScoreKey];
        const inningsPlayerScore = inningsScore[input.player.name];
        
        if(inningsPlayerScore) {
            await transaction.set(gameDocRef, {[inningsScoreKey]: { [`${input.player.name}`]: arrayUnion(`${input.score}`)}}, {merge: true});
        } else {
            await transaction.set(gameDocRef, {[inningsScoreKey]: { [`${input.player.name}`]: [input.score]}}, {merge: true});
        }


        await transaction.set(gameDocRef, {[inningsTotalRunsKey]: (gameData[inningsTotalRunsKey] + input.score) }, {merge: true})
        await transaction.set(gameDocRef, {[inningsTotalBallsKey]: (gameData[inningsTotalBallsKey] + 1) }, {merge: true})
    });
});

export const updateInningsCurrentPlayerWicket = createAsyncThunk('game/updateInningsCurrentPlayerWicket', async (input: {gameId: string, inningsId: string, player: Player, currentPlayerKey: string}) => {
    await runTransaction(db, async (transaction) => {
        const gameDocRef = doc(db, 'games', input.gameId);
        const gameDoc = await transaction.get(gameDocRef);
        if (!gameDoc.exists()) {
            throw "Document does not exist!";
        }

        const inningsWicketsKey = (input.inningsId == "1"? 'innings1Wickets': 'innings2Wickets');
        const inningsTotalBallsKey = `innings${input.inningsId}TotalBalls`;

        const gameData = gameDoc.data();

        await transaction.set(gameDocRef, {[inningsWicketsKey]: (gameData[inningsWicketsKey] + 1) }, {merge: true})
        await transaction.set(gameDocRef, {[inningsTotalBallsKey]: (gameData[inningsTotalBallsKey] + 1) }, {merge: true})
        await transaction.set(gameDocRef, {[input.currentPlayerKey] : null }, {merge: true});
    });
});

export const updateInningsExtras = createAsyncThunk('game/updateInningsExtras', async (input: {gameId: string, inningsId: string, score: number}) => {
    await runTransaction(db, async (transaction) => {
        const gameDocRef = doc(db, 'games', input.gameId);
        const gameDoc = await transaction.get(gameDocRef);
        if (!gameDoc.exists()) {
            throw "Document does not exist!";
        }

        const inningsExtrasKey = (input.inningsId == "1"? 'innings1Extras': 'innings2Extras');
        const inningsTotalRunsKey = `innings${input.inningsId}TotalRuns`;
        const inningsTotalBallsKey = `innings${input.inningsId}TotalBalls`;

        const gameData = gameDoc.data();

        await transaction.set(gameDocRef, {[inningsExtrasKey]: (gameData[inningsExtrasKey] + input.score) }, {merge: true})
        await transaction.set(gameDocRef, {[inningsTotalRunsKey]: (gameData[inningsTotalRunsKey] + input.score) }, {merge: true})
        await transaction.set(gameDocRef, {[inningsTotalBallsKey]: (gameData[inningsTotalBallsKey] + 1) }, {merge: true})
    });
});