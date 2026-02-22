import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IRootDispatch, IRootState } from "../store/store";
import { Player } from "../Models/Player";
import { CurrentGame } from "../Models/CurrentGame";
import { updateInningsCurrentBowler, updateInningsCurrentPlayer } from "../Services/GameService";
import { gameSlice } from "../store/slices/gameSlice";

const CurrentPlayerSelection = () => {
    const { playerbowler, inningsId, currentPlayerId } = useParams();
    const location = useLocation();
    const currentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    let teamPlayers: Player[] = location.state.playersToChooseFrom ?? [];
    
    const dispatch = useDispatch<IRootDispatch>();
    const navigate = useNavigate();

    const onPlayerSelectionDone = async (player: Player) => {
        if(playerbowler === 'player') {
            const inningsCurrentPlayer: string = `innings${inningsId}CurrentPlayer${currentPlayerId}`;
            await dispatch(updateInningsCurrentPlayer({gameId: currentGame.gameId, key: inningsCurrentPlayer, value: player })).unwrap();
            await dispatch(gameSlice.actions.updateInningsCurrentPlayer({key: inningsCurrentPlayer, value: player}));
        } else {
            const inningsCurrentBowler: string = `innings${inningsId}CurrentBowler`;
            await dispatch(updateInningsCurrentBowler({gameId: currentGame.gameId, key: inningsCurrentBowler, value: player })).unwrap();
            await dispatch(gameSlice.actions.updateInningsCurrentBowler({key: inningsCurrentBowler, value: player}));
        }
        navigate(`/innings/${inningsId}`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Select {playerbowler === 'player'? 'player ' + currentPlayerId : 'bowler'}</p>
                    <ul className="TeamSelectionUL">
                        {teamPlayers.map((player, index) => (
                            <li key={index}>
                                <button className="Button" onClick={() => { onPlayerSelectionDone(player) }}> {player.name} </button>
                            </li>
                        ))}
                    </ul>
            </header>
        </div>
    );
};

export default CurrentPlayerSelection;