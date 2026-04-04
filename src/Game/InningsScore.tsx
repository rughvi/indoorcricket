import React, { useEffect, useState } from "react";
import { ReactComponent as Back } from '../back.svg';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootState } from "../store/store";
import { CurrentGame } from "../Models/CurrentGame";
import { Teams } from "../Models/Teams";
import { Player } from "../Models/Player";
import { fetchCurrentGame } from "../Services/GameService";

const InningsScore = () => {
    const { inningsId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<IRootDispatch>();
    const currentGame: CurrentGame = useSelector<IRootState, CurrentGame>(state => state.game.currentGame);
    const [battingTeam, setBattingTeam] = useState<Teams>(Teams.One);
    const [bowlingTeam, setBowlingTeam] = useState<Teams>(Teams.One);
    const [battingTeamPlayers, setBattingTeamPlayers] = useState<Player[]>([]);
    const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState<Player[]>([]);
    const [playersScore, setPlayersScore] = useState<any>({});
    const [bowlersStats, setBowlersStats] = useState<any>({});
    const initialize = () => {
            if(inningsId == "1") {
                setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
                setBattingTeamPlayers(currentGame.game.teamBattingFirst === Teams.One? currentGame.game.team1 : currentGame.game.team2);
                setBowlingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.Two : Teams.One);
                setBowlingTeamPlayers(currentGame.game.teamBattingFirst === Teams.One? currentGame.game.team2 : currentGame.game.team1);
                setPlayersScore(currentGame.game.innings1PlayersScore);
                var totalBalls = currentGame.game.innings1TotalBalls ?? 0;
                const bowlerStats: any = {};
                var over = 0;
                while(totalBalls > 0) {
                    const inningsOverBowling: any = currentGame.game.innings1Bowling? (currentGame.game.innings1Bowling as any)[(`${over}`)] : {name: 'xxx', runs: []};
                    var runs = 0;
                    var balls = 0;
                    var wickets = 0;
                    for(var run of inningsOverBowling.runs){
                        balls++;
                        if(run === "W"){
                            wickets++;
                        }
                        if(!isNaN(Number(run))){
                            runs += Number(run);
                        }
                    }
                    if(bowlerStats[(`${inningsOverBowling.name}`)]) {
                        bowlerStats[(`${inningsOverBowling.name}`)].balls += balls;
                        bowlerStats[(`${inningsOverBowling.name}`)].wickets += wickets;
                        bowlerStats[(`${inningsOverBowling.name}`)].runs += runs;
                    } else {
                        bowlerStats[(`${inningsOverBowling.name}`)] = {balls, wickets, runs};
                    }
                    totalBalls -= 6;
                    over++;
                }
                setBowlersStats(bowlerStats);
            } else {
                setBattingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.Two : Teams.One);
                setBattingTeamPlayers(currentGame.game.teamBattingFirst === Teams.One? currentGame.game.team2 : currentGame.game.team1);
                setBowlingTeam(currentGame.game.teamBattingFirst === Teams.One ? Teams.One : Teams.Two);
                setBowlingTeamPlayers(currentGame.game.teamBattingFirst === Teams.One? currentGame.game.team1 : currentGame.game.team2);
                var totalBalls = currentGame.game.innings2TotalBalls ?? 0;
                const bowlerStats: any = {};
                var over = 0;
                while(totalBalls > 0) {
                    const inningsOverBowling: any = currentGame.game.innings2Bowling? (currentGame.game.innings2Bowling as any)[(`${over}`)] : {};
                    bowlerStats[(`${inningsOverBowling.name}`)] = inningsOverBowling.runs;
                    totalBalls -= 6;
                    over++;
                }
                setBowlersStats(bowlerStats);
            }
        };

    useEffect(() => {
        dispatch(fetchCurrentGame(currentGame.gameId));
        initialize();
    }, [currentGame.gameId]);
    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <Back style={{width: "30px", height:"30px"}} onClick={() => {navigate(`/innings/${inningsId}`)}}></Back>
                    Innings: {inningsId}
                    <div style={{width: "30px"}}></div>
                </div>
                <br/>
                <div className="GameCard-header">
                    <div>Batting: T{battingTeam}</div>
                </div>
                <div className="BatsmenCard">
                    {battingTeamPlayers.map((player:Player) => {
                        const playerScore: number[] = playersScore[(`${player.name}`)];
                        return (<div key={player.name} style={{marginBottom:"5px", width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                            <div style={{minWidth: '70%'}}>
                                <span>
                                    <input readOnly type="radio" checked={playerScore !== undefined}></input>
                                </span>{player.name}
                            </div>
                            <div style={{minWidth: '30%'}}>
                                {playerScore?.reduce((a,c) => a+c) ?? 0} ({playerScore?.length ?? 0})
                            </div>
                        </div>
                    )})}
                </div>
                <div className="GameCard-header">
                    <div>Bowling: T{bowlingTeam}</div>
                </div>
                <div className="BowlerCard">
                    <div style={{marginBottom:"5px", width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                        <div style={{minWidth: '40%'}}></div>
                        <div style={{minWidth: '20%', textAlign:"center"}}>Balls</div>
                        <div style={{minWidth: '20%', textAlign:"center"}}>Runs</div>
                        <div style={{minWidth: '20%', textAlign:"center"}}>Wickets</div>
                    </div>
                    {bowlingTeamPlayers.map((player: Player) => {
                        const bowlerStats = bowlersStats[(`${player.name}`)];
                        return (<div key={player.name} style={{marginBottom:"5px", width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: 'calc(6px + 2vmin)'}}>
                                <div style={{minWidth: '40%'}}>{player?.name}</div>
                                <div style={{minWidth: '20%', textAlign:"center"}}>{bowlerStats?.balls ?? 0}</div>
                                <div style={{minWidth: '20%', textAlign:"center"}}>{bowlerStats?.runs ?? 0}</div>
                                <div style={{minWidth: '20%', textAlign:"center"}}>{bowlerStats?.wickets ?? 0}</div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    );
};

export default InningsScore;