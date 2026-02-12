import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
// import { getPlayers } from "../Services/PlayerService";
import { Player } from "../Models/Player";
import { useDispatch, useSelector } from "react-redux";
// import { assignAllPlayers } from "../store/slices/playerSlice";
import { setTeamBattingFirst } from "../store/slices/gameSlice";
import { IRootDispatch, IRootState } from "../store/store";
import { Teams } from "../Models/Teams";
import { fetchAllPlayers } from "../Services/PlayerService";

const GameSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const team1Players = useSelector<IRootState, Player[]>(state => state.player.team1Players);
    const team2Players = useSelector<IRootState, Player[]>(state => state.player.team2Players);
    const teamBattingFirst = useSelector<IRootState, Teams>(state => state.game.teamBattingFirst);

    useEffect(() => {
        dispatch(fetchAllPlayers());
    }, [dispatch]);

    return (
        <div className="Form">
            Game Selection
            <div className="GameCard">
                <div className="GameCard-header">
                    <div >Team 1</div>
                    <button className="Button" onClick={() => {navigate('/teamSelection/1')}}>Edit</button>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: {team1Players.map(p => p.name).join(", ")}
                </p>
            </div>
            <div className="GameCard">
                <div className="GameCard-header">
                    <div >Team 2</div>
                    <button className="Button" onClick={() => {navigate('/teamSelection/2')}}>Edit</button>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: {team2Players.map(p => p.name).join(", ")}
                </p>
            </div>
            <div className="line"></div>
            <div className="GameCard">
                <div> Batting: </div>
                <div className="GameCard-header">                    
                    <button className={teamBattingFirst === Teams.One? "ButtonSelected" : "Button"}
                            onClick={() => dispatch(setTeamBattingFirst({teamBattingFirst: Teams.One}))}>Team 1</button>
                    <button className={teamBattingFirst === Teams.Two? "ButtonSelected" : "Button"}
                            onClick={() => dispatch(setTeamBattingFirst({teamBattingFirst: Teams.Two}))}>Team 2</button>
                </div>
            </div>
            <button className="ActionButton" onClick={() => navigate('/game')}>Start game</button>
            
        </div>
    )
};

export default GameSelection;
