import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Edit} from '../edit.svg';
import ScoreKeyboard from "./ScoreKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootState } from "../store/store";
import { CurrentGame } from "../Models/CurrentGame";
import { Teams } from "../Models/Teams";
import { Player } from "../Models/Player";
import '../Form.css';
import { fetchCurrentGame, updateInningsCurrentPlayerScore, updateInningsCurrentPlayerWicket, updateInningsExtras } from "../Services/GameService";
import { ScoreKey } from "../Models/ScoreKey";

const Innings = () => {
    const { inningsId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [battingTeam, setBattingTeam] = useState<Teams>(Teams.One);
    const [bowlingTeam, setBowlingTeam] = useState<Teams>(Teams.One);
    const [currentPlayer1, setCurrentPlayer1] = useState<Player>();
    const [currentPlayer2, setCurrentPlayer2] = useState<Player>();
    const [currentBatsman, setCurrentBatsman] = useState<Player>();
    const [currentBowler, setCurrentBowler] = useState<Player>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
        setBowlingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.Two : Teams.One);
        if(inningsId == "1") {
            setCurrentPlayer1(currentGame.game.innings1CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings1CurrentPlayer2);
            setCurrentBowler(currentGame.game.innings1CurrentBowler);    
        } else {
            setCurrentPlayer1(currentGame.game.innings2CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings2CurrentPlayer2);
            setCurrentBowler(currentGame.game.innings2CurrentBowler);
        }
    }, [currentGame]);

    const choosePlayer = (playerBowler: string, currentPlayerId: number) => {
        const nonCurrentPlayer = (currentPlayerId === 1 ? currentPlayer2: currentPlayer1);
        let playersToChooseFrom = [];
        if(playerBowler === 'player') { //batsman
            if(currentGame.game.teamBattingFirst == Teams.One && inningsId == "1") {
                playersToChooseFrom = currentGame.game.team1.filter(p => p.name !== nonCurrentPlayer?.name);
            } else {
                playersToChooseFrom = currentGame.game.team2.filter(p => p.name !== nonCurrentPlayer?.name);
            }
        } else { //bowler
            if(currentGame.game.teamBattingFirst == Teams.One && inningsId == "1") {
                playersToChooseFrom = currentGame.game.team2;
            } else {
                playersToChooseFrom = currentGame.game.team1;
            }
        }
        navigate(`/current/${playerBowler}/selection/${inningsId}/${currentPlayerId}`, {state: {playersToChooseFrom}});
    };

    const onClickScoreKey = async (scoreKey: ScoreKey) => {
        setError('');
        if((currentBowler?.name?.length ??0) === 0 || (currentBatsman?.name?.length ??0) === 0){
            setError('Select current players and bowlers');
            return;
        }
        if((scoreKey === ScoreKey.Wide)) { /* This also applies to NoBall */
            await dispatch(updateInningsExtras({gameId: currentGame.gameId, inningsId: inningsId!, score: scoreKey})).unwrap();
        } else if(scoreKey == ScoreKey.Wicket) {
            await dispatch(updateInningsCurrentPlayerWicket({gameId: currentGame.gameId, inningsId: inningsId!, player: currentBatsman!, currentPlayerKey: (currentBatsman?.name === currentPlayer1?.name ? `innings${inningsId}CurrentPlayer1` : `innings${inningsId}CurrentPlayer2` )})).unwrap();
            setCurrentBatsman(undefined);
        } else {
            await dispatch(updateInningsCurrentPlayerScore({gameId: currentGame.gameId, inningsId: inningsId!, player: currentBatsman!, score: scoreKey})).unwrap();
        }
        
        await dispatch(fetchCurrentGame()).unwrap();
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <div>Innings: 1</div>
                </div>
                <br />
                <div className="GameCard-header">
                    <div>Batting: T{battingTeam}</div>
                    <div>Bowling: T{bowlingTeam}</div>
                </div>
                <br />
                {(inningsId === "1") ? 
                    <>
                        <div className="GameCard-header">
                            <div>Runs: {currentGame.game[`innings1TotalRuns`] ?? 0}</div>
                            <div>Overs: {Math.floor((currentGame.game.innings1TotalBalls ?? 0) / 6)}.{(currentGame.game.innings1TotalBalls ?? 0) % 6}</div>
                        </div>
                        <br/>
                        <div className="GameCard-header">
                            <div>Extras: {currentGame.game.innings1Extras ?? 0}</div>
                            <div>Wickets: {currentGame.game.innings1Wickets ?? 0}</div>
                        </div>
                        <br/>
                    </>
                    : 
                    <>
                        <div className="GameCard-header">
                            <div>Runs: {currentGame.game[`innings2TotalRuns`] ?? 0}</div>
                            <div>Overs: {Math.floor((currentGame.game.innings2TotalBalls ?? 0) / 6)}.{(currentGame.game.innings2TotalBalls ?? 0) % 6}</div>
                        </div>
                        <br/>
                        <div className="GameCard-header">
                            <div>Extras: {currentGame.game.innings2Extras ?? 0}</div>
                            <div>Wickets: {currentGame.game.innings2Wickets ?? 0}</div>
                        </div>
                        <br/>
                    </>
                }
                
                <div>display 5/7 balls</div>
                <div className="GameCard-header">
                    <div>Bowler:</div>
                </div>
                <div className="GameCard-header">
                    <button className="CurrentPlayerButton">{currentBowler?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('bowler', 1)}}/>
                </div>
                <div className="GameCard-header">
                    <div>Batsmen:</div>
                </div>
                <div className="GameCard-header">
                    <button className={`${(currentBatsman?.name === currentPlayer1?.name) ? 'CurrentPlayerButton ButtonSelected' : 'CurrentPlayerButton' }`} onClick={() => setCurrentBatsman(currentPlayer1)}>{currentPlayer1?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('player', 1)}}/>
                    <button className={`${(currentBatsman?.name === currentPlayer2?.name) ? 'CurrentPlayerButton ButtonSelected' : 'CurrentPlayerButton' }`} onClick={() => setCurrentBatsman(currentPlayer2)}>{currentPlayer2?.name}</button>
                    <Edit style={{height: "40px", width: "40px"}} onClick={() => {choosePlayer('player', 2)}}/>
                </div>
                <br />
                <ScoreKeyboard onClick={onClickScoreKey} />
                {
                    error.length > 0 &&
                    <div className="error"> 
                        <p> { error } </p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Innings;