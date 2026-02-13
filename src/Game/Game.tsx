import React from "react";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { Player } from "../Models/Player";
import { Teams } from "../Models/Teams";
const Game = () => {
    const navigate = useNavigate();
    const team1Players = useSelector<IRootState, Player[]>(state => state.game.currentGame.game.team1);
    const team2Players = useSelector<IRootState, Player[]>(state => state.game.currentGame.game.team2);
    const teamBattingFirst = useSelector<IRootState, Teams>(state => state.game.currentGame.game.teamBattingFirst);

    return (
        <div className="Form">
            Game
            <div className="GameCard">
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}}>Innings 1</div>                    
                    <button className="Button" onClick={() => {navigate('/innings/1')}}>Start</button>
                </div>
                <div className="GameCard-header">
                   <div>Runs: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Wickets: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Overs: {0.0}</div>
                </div>
                <br />
                <div className="GameCard-header">
                   <div>Batting: {teamBattingFirst === Teams.One? 'Team 1' : 'Team 2'}</div>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: {team1Players.map(p => p.name).join(", ")}
                </p>
            </div>
            <div className="GameCard">
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}} >Innings 2</div>                    
                    <button className="Button" onClick={() => {navigate('/innings/2')}}>Start</button>
                </div>
                <div className="GameCard-header">
                   <div>Runs: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Wickets: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Overs: {0.0}</div>
                </div>
                <br />
                <div className="GameCard-header">
                   <div>Batting: {teamBattingFirst === Teams.One? 'Team 2' : 'Team 1'}</div>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: {team2Players.map(p => p.name).join(", ")}
                </p>
            </div>
        </div>
    );
};

export default Game;