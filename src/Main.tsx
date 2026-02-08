import React, { useState } from "react";
import './Button.css';
import './Input.css';
import { useNavigate } from "react-router-dom";
import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const Main = () => {
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, loading, error] = useAuthState(auth);

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
    if(user) {
        return (
            <div className="App">
                <header className="App-header">
                    <button className="Button" onClick={() => {navigate('/gameSelection')}}> Start a game </button>
                </header>
            </div>
        );
    } else {
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

    
};

export default Main;