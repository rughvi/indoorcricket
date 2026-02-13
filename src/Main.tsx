import React, { useState, useEffect } from "react";
import './CSS/Button.css';
import './Input.css';
import { useNavigate } from "react-router-dom";
import firebaseApp from './Firebase/firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentGame } from "./Services/GameService";
import { IRootDispatch, IRootState } from "./store/store";
import { CurrentGame } from "./Models/CurrentGame";
import { Status } from "./store/status";


const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const auth = getAuth(firebaseApp);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, loading, error] = useAuthState(auth);
    const currentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const fetchCurrentGameStatus = useSelector<IRootState, Status>(state => state.game.fetchCurrentGameStatus);
    const fetchCurrentGameError = useSelector<IRootState, string>(state => state.game.fetchCurrentGameError);
    
    useEffect(() => {
        if(user) {
            dispatch(fetchCurrentGame());

        } else {
            console.log('user not present');
        }
    }, [user]);

    const login = () => {
        signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        signOut(auth);
    };

    if (loading) {
        return (
        <div>
            <p>Initialising User...</p>
        </div>
        );
    }
    if (error) {
        return (
        <div>
            <p>Error: </p>
        </div>
        );
    }

    if(!user) {
        return (
            <div className="App">
                <header className="App-header">
                    <input className="UserInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email id"></input>
                    <input className="UserInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                    <button className="Button" onClick={() => {login()}}> Login </button>
                </header>
            </div>
        );
    }

    if(fetchCurrentGameStatus === Status.Fulfilled) {
        if(currentGame.gameId !== '') {
            return (
                <div className="App">
                    <header className="App-header">
                        <button className="ActionButton" onClick={() => {navigate('/game')}}> Resume game </button>
                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <button className="ActionButton" onClick={() => {navigate('/gameSelection')}}> Play a game </button>
                    </header>
                </div>
            );
        }        
    } else if (fetchCurrentGameStatus === Status.Pending) {
        return (
            <div className="App"> 
                <header className="App-header">
                    Loading...
                </header>
            </div>
        );
    } else {
        return (
            <div className="App"> 
                <header className="App-header">
                    Error: {fetchCurrentGameError}
                </header>
            </div>
        );
    }
};

export default Main;