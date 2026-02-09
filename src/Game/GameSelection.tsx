import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
import { getPlayers } from "../Services/PlayerService";
import { Player } from "../Models/Player";
import { useDispatch } from "react-redux";
import { assignAllPlayers } from "../store/slices/playerSlice";

const GameSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    <button className="Button" onClick={() => {navigate('/teamSelection')}}>Edit</button>
                </div>
            </div>
            <div className="GameCard">
                <div className="GameCard-header">
                    <div >Team 2</div>
                    <button className="Button">Edit</button>
                </div>
            </div>
            <button className="Button" onClick={() => {navigate('/teamsSelection')}}> Select teams </button>
            
        </div>
    )
};

export default GameSelection;
