import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Edit } from '../edit.svg';
import { ReactComponent as Next } from '../next.svg';
import { ReactComponent as Previous } from '../previous.svg'; 
import { ReactComponent as Back } from '../back.svg';
import ScoreKeyboard from "./ScoreKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootState } from "../store/store";
import { CurrentGame } from "../Models/CurrentGame";
import { Teams } from "../Models/Teams";
import { Player } from "../Models/Player";
import '../Form.css';
import { fetchCurrentGame, updateInningsCurrentPlayerScore, updateInningsCurrentPlayerWicket, updateInningsExtras, updateInningsBowling } from "../Services/GameService";
import { ScoreKey } from "../Models/ScoreKey";
import { ScoreKeyEventType } from "../Models/ScoreKeyEvent";
import { BowlingOver } from "../Models/BowlingOver";
import { BowlerStats } from "../Models/BowlerStats";

const Innings = () => {
    const { inningsId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [battingTeam, setBattingTeam] = useState<Teams>(Teams.One);
    const [bowlingTeam, setBowlingTeam] = useState<Teams>(Teams.One);
    const [currentPlayer1, setCurrentPlayer1] = useState<Player>();
    const [currentPlayer1Scores, setCurrentPlayer1Scores] = useState<number[]>();
    const [currentPlayer2, setCurrentPlayer2] = useState<Player>();
    const [currentPlayer2Scores, setCurrentPlayer2Scores] = useState<number[]>();
    const [currentBatsman, setCurrentBatsman] = useState<Player>();
    const [currentBowler, setCurrentBowler] = useState<Player>();
    const [currentBowlerStats, setCurrentBowlerStats] = useState<BowlerStats>();
    const [error, setError] = useState<string>('');

    const initialize = () => {
        if(inningsId == "1") {
            setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
            setBowlingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.Two : Teams.One);
            setCurrentPlayer1(currentGame.game.innings1CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings1CurrentPlayer2);
            if(currentGame.game.innings1PlayersScore) {
                setCurrentPlayer1Scores(currentGame.game.innings1PlayersScore[(`${currentGame.game.innings1CurrentPlayer1?.name}`) as keyof typeof currentGame.game.innings1PlayersScore]);
                setCurrentPlayer2Scores(currentGame.game.innings1PlayersScore[(`${currentGame.game.innings1CurrentPlayer2?.name}`) as keyof typeof currentGame.game.innings1PlayersScore]);
            }
            setCurrentBowler(currentGame.game.innings1CurrentBowler);    
        } else {
            setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.Two : Teams.One);
            setBowlingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
            setCurrentPlayer1(currentGame.game.innings2CurrentPlayer1);
            setCurrentPlayer2(currentGame.game.innings2CurrentPlayer2);
            if(currentGame.game.innings2PlayersScore) {
                setCurrentPlayer1Scores(currentGame.game.innings2PlayersScore[(`${currentGame.game.innings2CurrentPlayer1?.name}`) as keyof typeof currentGame.game.innings2PlayersScore]);
                setCurrentPlayer2Scores(currentGame.game.innings2PlayersScore[(`${currentGame.game.innings2CurrentPlayer2?.name}`) as keyof typeof currentGame.game.innings2PlayersScore]);
            }
            setCurrentBowler(currentGame.game.innings2CurrentBowler);
        }

        setCurrentBowlerStats(calculateCurrentBowlerStats);
    };
    useEffect(() => {
        initialize();
    }, [currentGame]);

    const choosePlayer = (playerBowler: string, currentPlayerId: number) => {
        const nonCurrentPlayer = (currentPlayerId === 1 ? currentPlayer2: currentPlayer1);
        let playersToChooseFrom = [];
        if(playerBowler === 'player') { //batsman
            if(battingTeam === Teams.One) {
                playersToChooseFrom = currentGame.game.team1;
            } else {
                playersToChooseFrom = currentGame.game.team2;
            }
        } else { //bowler
            if(bowlingTeam === Teams.One) {
                playersToChooseFrom = currentGame.game.team1;
            } else {
                playersToChooseFrom = currentGame.game.team2;
            }
        }
        navigate(`/current/${playerBowler}/selection/${inningsId}/${currentPlayerId}`, {state: {playersToChooseFrom}});
    };

    const onClickScoreKey = async (scoreKeyEventType: ScoreKeyEventType) => {
        setError('');
        if((currentBowler?.name?.length ??0) === 0 || (currentBatsman?.name?.length ??0) === 0){
            setError('Select current players and bowlers');
            return;
        }
        if((scoreKeyEventType.type === ScoreKey.Wide) || (scoreKeyEventType.type === ScoreKey.NoBall) 
            || (scoreKeyEventType.type === ScoreKey.NoBallPlusOne) || (scoreKeyEventType.type === ScoreKey.NoBallPlusTwo) || (scoreKeyEventType.type === ScoreKey.NoBallPlusThree)
            || (scoreKeyEventType.type === ScoreKey.NoBallPlusFour) || (scoreKeyEventType.type === ScoreKey.NoBallPlusFive) || (scoreKeyEventType.type === ScoreKey.NoBallPlusSix)) {
            await dispatch(updateInningsExtras({gameId: currentGame.gameId, inningsId: inningsId!, score: scoreKeyEventType.value})).unwrap();
        } else if(scoreKeyEventType.type == ScoreKey.Wicket) {
            await dispatch(updateInningsCurrentPlayerWicket({gameId: currentGame.gameId, inningsId: inningsId!, player: currentBatsman!, currentPlayerKey: (currentBatsman?.name === currentPlayer1?.name ? `innings${inningsId}CurrentPlayer1` : `innings${inningsId}CurrentPlayer2` )})).unwrap();
            setCurrentBatsman(undefined);
        } else {
            await dispatch(updateInningsCurrentPlayerScore({gameId: currentGame.gameId, inningsId: inningsId!, player: currentBatsman!, score: scoreKeyEventType.value})).unwrap();
        }
        const input = {
            gameId: currentGame.gameId, 
            inningsId: inningsId!, 
            over: currentOver(), 
            bowler: currentBowler?.name!, 
            scoreWicket: scoreKeyEventType.label
        };
        await dispatch(updateInningsBowling(input))
        await dispatch(fetchCurrentGame(currentGame.gameId)).unwrap();
        if((inningsId == "1" && (currentGame.game.innings1TotalBalls! %6 == 5)) || (inningsId == "2" && (currentGame.game.innings2TotalBalls! %6 == 5))) {
            setCurrentBowler(undefined);
            setCurrentBowlerStats(undefined);
        }
    };

    const nextOver = async () => {

    };
    const currentOver = () => {
        return Math.floor((inningsId == "1"? (currentGame.game?.innings1TotalBalls??0) : (currentGame.game?.innings2TotalBalls??0)) / 6);
    };

    const statsByBall = () => {
        var allBowling: {[key: string]: BowlingOver; } = {};
        if(inningsId == "1") {
            allBowling = currentGame.game.innings1Bowling??{};
            
        } else {
            allBowling = currentGame.game.innings2Bowling??{};
        }
        var runs: string[] = [];
        const over = currentOver();
        for(let i=over; i>= 0; i--) {
            runs = runs.concat([`${i} ${allBowling[i]?.name??''} :`], allBowling[i]?.runs??[], ["|"]);
        }
        return runs.join(" ");
    };

    const calculateCurrentBowlerStats = () => {
        var allBowling: {[key: string]: BowlingOver; } = {};
        if(inningsId == "1") {
            allBowling = currentGame.game.innings1Bowling??{};
            
        } else {
            allBowling = currentGame.game.innings2Bowling??{};
        }

        var runs = 0;
        var wickets = 0;
        var balls = 0;
        const over = currentOver();
        for(let i=over; i>= 0; i--) {
            if(`${allBowling[i]?.name??''}` === currentBowler?.name) {
                for(var run of (allBowling[i]?.runs??[])) {
                    balls++;
                    if(run === "W"){
                        wickets++;
                    }
                    if(!isNaN(Number(run))){
                        runs += Number(run);
                    }
                }
            }
        }

        const bowlerStats: BowlerStats =  {
            overs: `${Math.floor(balls / 6)}.${balls % 6}`,
            runs: runs,
            wickets: wickets
        };

        return bowlerStats;
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <Back style={{width: "30px", height:"30px"}} onClick={() => {navigate('/game')}}></Back>
                    Innings: {inningsId}
                    <div style={{width: "30px"}}></div>
                </div>
                <br/>
            </div>
            <div className="GameCard">
                {(inningsId === "1") ? 
                    <>
                        <div className="GameCard-header">
                            <div>Batting: T{battingTeam}</div>
                            <div style={{fontWeight: 'bold', fontSize: 'calc(16px + 2vmin)', color: "black"}}>{currentGame.game[`innings1TotalRuns`] ?? 0}/{currentGame.game.innings1Wickets ?? 0}</div>
                            <div>Bowling: T{bowlingTeam}</div>
                        </div>
                        <br />
                        <div className="GameCard-header">
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>Overs: {Math.floor((currentGame.game.innings1TotalBalls ?? 0) / 6)}.{(currentGame.game.innings1TotalBalls ?? 0) % 6}
                            </div>
                            <div>Extras: {currentGame.game.innings1Extras ?? 0}</div>
                        </div>
                        <br/>
                    </>
                    : 
                    <>
                        <div className="GameCard-header">
                            <div>Batting: T{battingTeam}</div>
                            <div style={{fontWeight: 'bold', fontSize: 'calc(16px + 2vmin)', color: "black"}}>{currentGame.game[`innings2TotalRuns`] ?? 0}/{currentGame.game.innings2Wickets ?? 0}</div>
                            <div>Bowling: T{bowlingTeam}</div>
                        </div>
                        <br />
                        <div className="GameCard-header">
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>Overs: {Math.floor((currentGame.game.innings2TotalBalls ?? 0) / 6)}.{(currentGame.game.innings2TotalBalls ?? 0) % 6}
                            </div>
                            <div>Extras: {currentGame.game.innings2Extras ?? 0}</div>
                        </div>
                        <br/>
                    </>
                }
                <div className="GameCard-header">
                    <Previous style={{height: "25px", width: "25px"}} />
                    <div style={{display: "inline-block", overflowX: "auto", overflowY: "hidden", width: "80%",  whiteSpace: "nowrap"}}>{statsByBall()}</div>
                    <Next style={{height: "25px", width: "25px"}} />
                </div>
                
                <br/>
                <div className="BowlerCard">
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                        <div style={{color: "black", fontWeight: "bold", fontSize: "14px"}}>Bowler:</div>
                        <a style={{fontSize: "12px", width:"100px", textAlign: "end"}} href={`/inningsScore/${inningsId}`}>more</a>
                    </div>                    
                    <div className="GameCard-header">
                        <div style={{width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                            <div style={{minWidth: '30%'}}>{currentBowler?.name}</div>
                            <div>Over: {currentBowlerStats?.overs}<span>|</span></div>
                            <div>Runs: {currentBowlerStats?.runs}<span>|</span></div>
                            <div>Wkts: {currentBowlerStats?.wickets} </div>
                            <Edit style={{height: "25px", width: "25px"}} onClick={() => {choosePlayer('bowler', 1)}}/>
                        </div>
                    </div>
                </div>
                <div className="BatsmenCard">
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                        <div style={{color: "black", fontWeight: "bold", fontSize: "14px"}}>Batsmen:</div>
                        <a style={{fontSize: "12px", width:"100px", textAlign: "end"}} href={`/inningsScore/${inningsId}`}>more</a>
                    </div>                    
                    <div className="GameCard-header">
                        <div style={{width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                            <div style={{minWidth: '70%'}}  onClick={() => setCurrentBatsman(currentPlayer1)}>
                                <span>
                                    <input type="radio" checked={currentBatsman?.name === currentPlayer1?.name}>
                                    </input>
                                </span>{currentPlayer1?.name} {currentPlayer1Scores?.reduce((a,c) => a+c) ?? 0} ({currentPlayer1Scores?.length ?? 0})
                            </div>
                            <Edit style={{height: "25px", width: "25px"}} onClick={() => {choosePlayer('player', 1)}}/>
                        </div>
                    </div>
                    <div className="GameCard-header">
                        <div style={{width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                            <div style={{minWidth: '70%'}}  onClick={() => setCurrentBatsman(currentPlayer2)}>
                                <span>
                                    <input type="radio" checked={currentBatsman?.name === currentPlayer2?.name}>
                                    </input>
                                </span>{currentPlayer2?.name} {currentPlayer2Scores?.reduce((a,c) => a+c) ?? 0} ({currentPlayer2Scores?.length ?? 0})
                            </div>
                            <Edit style={{height: "25px", width: "25px"}} onClick={() => {choosePlayer('player', 2)}}/>
                        </div>
                    </div>
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