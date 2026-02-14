import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRootDispatch, IRootState } from "../store/store";
import { Player } from "../Models/Player";
import { CurrentGame } from "../Models/CurrentGame";
import { Teams } from "../Models/Teams";
import { Game } from "../Models/Game";
import { updateInningsCurrentPlayer } from "../Services/GameService";
import { gameSlice } from "../store/slices/gameSlice";

const CurrentPlayerSelection = () => {
    const { inningsId, currentPlayerId } = useParams();
    const currentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    let teamPlayers: Player[] = [];

    if(currentGame.game.teamBattingFirst == Teams.One && inningsId == "1") {
        teamPlayers = currentGame.game.team1;
    } else {
        teamPlayers = currentGame.game.team2;
    }
    const [selectedPlayer, setSelectedPlayer] = useState<Player>({name: ''});
    const dispatch = useDispatch<IRootDispatch>();
    const navigate = useNavigate();

    const onPlayerSelectionDone = async () => {
        const inningsCurrentPlayer: string = `innings${inningsId}CurrentPlayer${currentPlayerId}`;
        const game: Game = { ...currentGame.game, [inningsCurrentPlayer]: selectedPlayer };
        await dispatch(updateInningsCurrentPlayer({gameId: currentGame.gameId, key: inningsCurrentPlayer, value: selectedPlayer })).unwrap();
        await dispatch(gameSlice.actions.updateInningsCurrentPlayer({key: inningsCurrentPlayer, value: selectedPlayer}));
        navigate(`/innings/${inningsId}`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Select players for Team 1</p>
                    <ul className="TeamSelectionUL">
                        {teamPlayers.map((player, index) => (
                            <li key={index}>
                                <button className={`PlayerButton ${player.name === selectedPlayer.name? 'ButtonSelected' : 'Button'}`} onClick={() => { setSelectedPlayer(player) }}> {player.name} </button>
                            </li>
                        ))}
                    </ul>
                <button className="ActionButton" onClick={() => { onPlayerSelectionDone()}}>Ok</button>
            </header>
        </div>
    );
};

export default CurrentPlayerSelection;