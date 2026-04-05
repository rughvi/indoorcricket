import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IRootDispatch, IRootState } from "../store/store";
import { Player } from "../Models/Player";
import { CurrentGame } from "../Models/CurrentGame";
import { addPlayerToTeam, updateInningsCurrentBowler, updateInningsCurrentPlayer } from "../Services/GameService";
import { gameSlice } from "../store/slices/gameSlice";
import { ReactComponent as Back } from '../back.svg';
import { Teams } from "../Models/Teams";

const CurrentPlayerSelection = () => {
    const { playerbowler, inningsId, currentPlayerId } = useParams();
    const location = useLocation();
    const [playerBowler, setPlayerBowler] = useState<string>('');
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

    const onPlayerAdd = async (player: Player) => {
        if(playerbowler === 'player') {
            if(inningsId === "1") {
                if(currentGame.game.teamBattingFirst === Teams.One) {
                    // add batsmen to team 1
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team1", player})).unwrap();
                } else {
                    // add batsmen to team 2
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team2", player})).unwrap();
                }
            } else {
                if(currentGame.game.teamBattingFirst === Teams.One) {
                    // add batsmen to team 2
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team2", player})).unwrap();
                } else {
                    // add batsmen to team 1
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team1", player})).unwrap();
                }
            }
            const inningsCurrentPlayer: string = `innings${inningsId}CurrentPlayer${currentPlayerId}`;
            await dispatch(updateInningsCurrentPlayer({gameId: currentGame.gameId, key: inningsCurrentPlayer, value: player })).unwrap();
            await dispatch(gameSlice.actions.updateInningsCurrentPlayer({key: inningsCurrentPlayer, value: player}));
        } else {
            if(inningsId === "1") {
                if(currentGame.game.teamBattingFirst === Teams.One) {
                    // add bowler to team 2
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team2", player})).unwrap();
                } else {
                    // add bowler to team 1
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team1", player})).unwrap();
                }
            } else {
                if(currentGame.game.teamBattingFirst === Teams.One) {
                    // add bowler to team 1
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team1", player})).unwrap();
                } else {
                    // add bowler to team 2
                    await dispatch(addPlayerToTeam({gameId: currentGame.gameId, team: "team2", player})).unwrap();
                }
            }

            const inningsCurrentBowler: string = `innings${inningsId}CurrentBowler`;
            await dispatch(updateInningsCurrentBowler({gameId: currentGame.gameId, key: inningsCurrentBowler, value: player })).unwrap();
            await dispatch(gameSlice.actions.updateInningsCurrentBowler({key: inningsCurrentBowler, value: player}));
        }
        navigate(`/innings/${inningsId}`);
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <Back style={{width: "30px", height:"30px"}} onClick={() => {navigate(`/innings/${inningsId}`)}}></Back>
                    Select {playerbowler === 'player'? 'player ' + currentPlayerId : 'bowler'}
                    <div style={{width: "30px"}}></div>
                </div>
            </div>
            <div className="GameCard">
                <ul className="TeamSelectionUL">
                    {teamPlayers.map((player, index) => (
                        <li key={index}>
                            <button className="Button" onClick={() => { onPlayerSelectionDone(player) }}> {player.name} </button>
                        </li>
                    ))}
                </ul>
                <div className="line"></div>
                <br/>
                <input style={{height: '30px', width: '50%',fontSize: '18px' }} value={playerBowler} onChange={(event) => {setPlayerBowler(event.target.value)}}/>
                <button className="Button" onClick={() => { onPlayerAdd({name: playerBowler}) }}>Add {playerbowler === 'player'? 'player ' + currentPlayerId : 'bowler'}</button>
            </div>
        </div>
    );
};

export default CurrentPlayerSelection;