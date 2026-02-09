import { Player } from "../Models/Player";
import firebaseApp from "../Firebase/firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export const getPlayers = async () => {
    const fireStoreDB = getFirestore()
    const playersColl = collection(fireStoreDB, 'players');
    const playersSnapshot = await getDocs(playersColl);
    const cityList = playersSnapshot.docs.map(doc => doc.data());
    console.log(cityList);
    return [];
};