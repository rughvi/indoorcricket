import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Edit} from '../edit.svg';
import ScoreKeyboard from "./ScoreKeyboard";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { CurrentGame } from "../Models/CurrentGame";
import { Teams } from "../Models/Teams";
import { Player } from "../Models/Player";
import '../Form.css';

const Innings = () => {
    const { inningsId } = useParams();
    const navigate = useNavigate();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [battingTeam, setBattingTeam] = useState<Teams>(Teams.One);
    const [currentPlayer1, setCurrentPlayer1] = useState<Player>();
    const [currentPlayer2, setCurrentPlayer2] = useState<Player>();
    const [currentBowler, setCurrentBowler] = useState<Player>();

    console.log(currentGame);
    useEffect(() => {
        setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
        if(inningsId == "1") {
            setCurrentPlayer1(currentGame.game.innings1CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings1CurrentPlayer2);    
        } else {
            setCurrentPlayer1(currentGame.game.innings2CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings2CurrentPlayer2);
        }

        setCurrentBowler(currentGame.game.inningsCurrentBowler);
    }, [currentGame]);

    const choosePlayer = (playerBowler: string, currentPlayerId: number) => {
        navigate(`/current/${playerBowler}/selection/${inningsId}/${currentPlayerId}`);
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <div>Innings: 1</div>
                   <div>Batting: T{battingTeam}</div>
                </div>
                <br />
                <div className="GameCard-header">
                   <div>Runs: {1500}</div>
                   <div>Overs: {198.9}</div>
                   <div>Wickets: {99}</div>
                </div>
                <br/>
                <div>display 5/7 balls</div>
                <div className="GameCard-header">
                    <button className="CurrentPlayerButton">{currentBowler?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('bowler', 1)}}/>
                </div>
                <div className="GameCard-header">
                    <button className="CurrentPlayerButton">{currentPlayer1?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('player', 1)}}/>
                    <button className="CurrentPlayerButton">{currentPlayer2?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('player', 2)}}/>
                </div>
                <br />
                <ScoreKeyboard />
            </div>
        </div>
    );
};

export default Innings;