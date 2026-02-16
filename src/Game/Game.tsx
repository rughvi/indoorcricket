import React, { useEffect, useState } from "react";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootState } from "../store/store";
import { Player } from "../Models/Player";
import { Teams } from "../Models/Teams";
import { CurrentGame } from "../Models/CurrentGame";
import { InningsStatus } from "../Models/InningsStatus";
import { endInnings, fetchCurrentGame } from "../Services/GameService";
const Game = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [innings1Action, setInnings1Action] = useState<string>('Start');
    const [innings2Action, setInnings2Action] = useState<string>('Start');

    useEffect(() => {
        const initialize = async () => {
            await dispatch(fetchCurrentGame());
            switch(currentGame.game.innings1Status) {
                case InningsStatus.InProgress:
                    setInnings1Action('Resume');
                    break;
                case InningsStatus.Finished:
                    setInnings1Action('Finished');
                    break;
                default:
                    break;            
            };

            switch(currentGame.game.innings2Status) {
                case InningsStatus.InProgress:
                    setInnings2Action('Resume');
                    break;
                case InningsStatus.Finished:
                    setInnings2Action('Finished');
                    break;
                default:
                    break;            
            };
        };

        initialize();
    }, [dispatch]);

    const endFirstInnings = async () => {
        await dispatch(endInnings({gameId: currentGame.gameId, inningsId: "1"})).unwrap();
        await dispatch(fetchCurrentGame()).unwrap();
    };


    return (
        <div className="Form">
            Game
            <div className="GameCard">
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}}>Innings 1</div>                    
                    <button className="Button" onClick={() => {navigate('/innings/1')}}>{innings1Action}</button>
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
                   <div>Batting: {currentGame.game.teamBattingFirst === Teams.One? 'Team 1' : 'Team 2'}</div>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: { currentGame.game.teamBattingFirst === Teams.One?
                                 currentGame.game.team1.map(p => p.name).join(", "):
                                 currentGame.game.team2.map(p => p.name).join(", ") }
                </p>
                <button className="Button" disabled={innings1Action === 'Finished'} onClick={() => {endFirstInnings()}}>End innings</button>
            </div>
            <div className="GameCard">
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}} >Innings 2</div>                    
                    <button className="Button" disabled={innings1Action !== 'Finished'} onClick={() => {navigate('/innings/2')}}>{innings2Action}</button>
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
                   <div>Batting: {currentGame.game.teamBattingFirst === Teams.One? 'Team 2' : 'Team 1'}</div>
                </div>
                <p style={{fontSize: 15, "width": "100%"}}>
                    Players: {currentGame.game.teamBattingFirst === Teams.One?
                                 currentGame.game.team2.map(p => p.name).join(", "):
                                 currentGame.game.team1.map(p => p.name).join(", ")}
                </p>
            </div>
        </div>
    );
};

export default Game;