import React from "react";
import { useNavigate } from "react-router-dom";

const GameSelection = () => {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                Game Selection
                <button className="Button" onClick={() => {navigate('/teamsSelection')}}> Select teams </button>
            </header>
        </div>
    )
};

export default GameSelection;
