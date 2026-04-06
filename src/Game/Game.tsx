import React, { useEffect, useState } from "react";
import '../Form.css';
import './GameCard.css';
import '../CSS/Button.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootState } from "../store/store";
import { ReactComponent as Back } from '../back.svg';
import { Teams } from "../Models/Teams";
import { CurrentGame } from "../Models/CurrentGame";
import { InningsStatus } from "../Models/InningsStatus";
import { endCurrentGame, endInnings, fetchCurrentGame, startInnings } from "../Services/GameService";
const Game = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [innings1Action, setInnings1Action] = useState<string>('Start');
    const [innings2Action, setInnings2Action] = useState<string>('Start');
    const [assertEndInnings, setAssertEndInnings] = useState<boolean>(false);
    const [inningsToEnd, setInningsToEnd] = useState<string>("");
    const initialize = async () => {
            await dispatch(fetchCurrentGame(currentGame.gameId)).unwrap();
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

    useEffect(() => {        
        const fetch = async () => {
            await initialize();
        };

        fetch();
    }, [currentGame.game.innings1Status, currentGame.game.innings2Status]);

    const endInningsFn = async (id: string) => {        
        await dispatch(endInnings({gameId: currentGame.gameId, inningsId: id})).unwrap();
        if(id === "2") {
            await dispatch(endCurrentGame()).unwrap();
        }
        await initialize();
        setAssertEndInnings(false);
    };

    const startResumeInnings = async (inningsId: string) => {
        await dispatch(startInnings({gameId: currentGame.gameId, inningsId: inningsId})).unwrap();
        await initialize();
        navigate(`/innings/${inningsId}`);
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <Back style={{width: "30px", height:"30px"}} onClick={() => {navigate('/')}}></Back>
                    Game
                    <div style={{width: "30px"}}></div>
                </div>
            </div>
            <div className="GameCard" style={{borderStyle: "solid", borderRadius: "10px", borderWidth: "thin", padding: 10, margin: 10, backgroundColor: "whitesmoke"}}>
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}}>Innings 1</div>                    
                    <button className={innings1Action !== 'Finished'? "ButtonSelected" : "Button"} disabled={innings1Action === 'Finished'} onClick={() => {startResumeInnings("1")}}>{innings1Action}</button>
                </div>
                <br/>
                <div className="GameCard-header">
                    <div style={{fontSize:"14px"}}><span style={{fontWeight: "bold", color:"black"}}>{currentGame.game.teamBattingFirst === Teams.One? 'Team 1' : 'Team 2'}</span> Batting</div>
                    <div style={{fontSize: "12px", width:"100px", textAlign: "end", textDecoration:"underline"}} onClick={() => navigate(`/inningsScore/1`)}>more</div>
                </div>
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: 'bold', fontSize: 'calc(16px + 2vmin)'}}>{currentGame.game.innings1TotalRuns ?? 0} / {currentGame.game.innings1Wickets ?? 0}</div>
                    <div>Overs: {Math.floor((currentGame.game.innings1TotalBalls ?? 0) / 6)}.{(currentGame.game.innings1TotalBalls ?? 0) % 6}</div>
                </div>
                <br/>
                <div style={{fontSize: 15, "width": "100%"}}>Players :</div>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", fontSize: 12, "width": "100%"}}>
                    {currentGame.game.teamBattingFirst === Teams.One?
                        currentGame.game.team1.map(p => (<div style={{padding: "5px 5px", backgroundColor: "#efefef", color:"black", borderRadius: "10px", marginRight: "2px"}}>{p.name}</div>)):
                        currentGame.game.team2.map(p => (<div style={{padding: "5px 5px", backgroundColor: "#efefef", color:"black", borderRadius: "10px", marginRight: "2px"}}>{p.name}</div>))}
                </div>
                <br/>
                <button className="Button" disabled={innings1Action === 'Finished'} onClick={() => {setInningsToEnd("1"); setAssertEndInnings(true);}}>End innings</button>
            </div>
            <div className="GameCard"  style={{borderStyle: "solid", borderRadius: "10px", borderWidth: "thin", padding: 10, backgroundColor: "whitesmoke"}}>
                <div className="GameCard-header">
                    <div style={{color: "black", fontWeight: "bold"}} >Innings 2</div>                    
                    <button className={ innings1Action === 'Finished' && innings2Action !== 'Finished'? "ButtonSelected" : "Button"} disabled={innings1Action !== 'Finished' || innings2Action === 'Finished'} onClick={() => {startResumeInnings("2")}}>{innings2Action}</button>
                </div>
                <br/>
                <div className="GameCard-header">
                    <div style={{fontSize:"14px"}}><span style={{fontWeight: "bold", color:"black"}}>{currentGame.game.teamBattingFirst === Teams.One? 'Team 2' : 'Team 1'}</span> Batting</div>
                    <div style={{fontSize: "12px", width:"100px", textAlign: "end", textDecoration:"underline"}} onClick={() => navigate(`/inningsScore/2`)}>more</div>
                </div>
                <div className="GameCard-header">
                   <div style={{color: "black", fontWeight: 'bold', fontSize: 'calc(16px + 2vmin)'}}>{currentGame.game.innings2TotalRuns ?? 0} / {currentGame.game.innings2Wickets ?? 0}</div>
                   <div>Overs: {Math.floor((currentGame.game.innings2TotalBalls ?? 0) / 6)}.{(currentGame.game.innings2TotalBalls ?? 0) % 6}</div>
                </div>
                <br/>
                <div style={{fontSize: 15, "width": "100%"}}>Players :</div>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", fontSize: 12, "width": "100%"}}>
                    {currentGame.game.teamBattingFirst === Teams.One?
                        currentGame.game.team2.map(p => (<div style={{padding: "5px 5px", backgroundColor: "#efefef", color:"black", borderRadius: "10px", marginRight: "2px"}}>{p.name}</div>)):
                        currentGame.game.team1.map(p => (<div style={{padding: "5px 5px", backgroundColor: "#efefef", color:"black", borderRadius: "10px", marginRight: "2px"}}>{p.name}</div>))}
                </div>
                <br/>
                <button className="Button" disabled={innings1Action !== 'Finished' || innings2Action === 'Finished'} onClick={() => {setInningsToEnd("2"); setAssertEndInnings(true)}}>End innings</button>
            </div>
            { assertEndInnings && 
                <div className="GameCard" style={{justifyContent: "center", position: "absolute", top:"0px", left:"0px", width:"100%", height:"100%", opacity:"0.9", color:"black"}}>
                    <div style={{opacity:"1"}}>Are you sure you want to end innings?</div>
                    <div>
                        <button className="Button" onClick={() => setAssertEndInnings(false)}>No</button>
                        <button className="Button" onClick={() => endInningsFn(inningsToEnd)}>Yes</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Game;