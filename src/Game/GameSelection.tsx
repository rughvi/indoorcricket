import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
import { getPlayers } from "../Services/PlayerService";
import { Player } from "../Models/Player";
import { useDispatch, useSelector } from "react-redux";
import { assignAllPlayers } from "../store/slices/playerSlice";
import { IRootState } from "../store/store";

const GameSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const team1Players = useSelector<IRootState, Player[]>(state => state.player.team1Players);
    const team2Players = useSelector<IRootState, Player[]>(state => state.player.team2Players);

    useEffect(() => {
        const getPlayersData = async () => {
            const players: Player[] = await getPlayers();
            
            dispatch(assignAllPlayers(players));
        };

        getPlayersData();
    }, []);

    return (
        <div className="Form">
            Game Selection
            <div className="GameCard">
                <div className="GameCard-header">
                    <div >Team 1</div>
                    <button className="Button" onClick={() => {navigate('/teamSelection/1')}}>Edit</button>
                </div>
                <p>
                    {team1Players.map(p => p.name).join(", ")}
                </p>
            </div>
            <div className="GameCard">
                <div className="GameCard-header">
                    <div >Team 2</div>
                    <button className="Button" onClick={() => {navigate('/teamSelection/2')}}>Edit</button>
                </div>
                <p>
                    {team2Players.map(p => p.name).join(", ")}
                </p>
            </div>
            <button className="ActionButton" onClick={() => {navigate('/teamsSelection/2')}}> Select teams </button>
            
        </div>
    )
};

export default GameSelection;
