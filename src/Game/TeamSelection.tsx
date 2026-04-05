import React, { useState } from "react";
import '../CSS/UL.css';
import '../CSS/Button.css';
import '../CSS/TeamSelection.css';
import { Player, UIPlayer } from "../Models/Player";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { assignPlayersToTeams } from "../store/slices/gameSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Back } from '../back.svg';

const TeamSelection= () => {
    const { teamIndex } = useParams();
    const teamPlayers = useSelector<IRootState, Player[]>(state => state.player.allPlayers);
    const [selectablePlayers, setSelectablePlayers] = useState<UIPlayer[]>(teamPlayers.map(tp => ({ name: tp.name, selected: false })));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const selectPlayer = (player: UIPlayer, index: number) => {
        let players: UIPlayer[] = selectablePlayers.map((p, i) => ({name: p.name, selected: p.selected}));        
        let indexedPlayer = players[index];
        indexedPlayer.selected = (indexedPlayer.selected? false: true);

        setSelectablePlayers(players);
    };

    const onPlayerSelectionDone = () => {
        const playersSelected: Player[] = selectablePlayers.filter(p => p.selected === true).map(p => ({name: p.name}));
        dispatch(assignPlayersToTeams({ team: teamIndex, players: playersSelected}));
        navigate('/gameSelection');
    };

    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                    <Back style={{width: "30px", height:"30px"}} onClick={() => {navigate('/gameSelection')}}></Back>
                    Select players for Team {teamIndex}
                    <div style={{width: "30px"}}></div>
                </div>
            </div>
            <div className="GameCard">
                <ul className="TeamSelectionUL">
                    {selectablePlayers.map((player, index) => (
                        <li key={index}>
                            <button className={`PlayerButton ${player.selected === true? 'ButtonSelected' : 'Button'}`} onClick={() => { selectPlayer(player, index) }}> {player.name} </button>
                        </li>
                    ))}
                </ul>                
            </div>
            <div className="GameCard">
                <button className="ActionButton" onClick={() => { onPlayerSelectionDone()}}>Ok</button>
            </div>
        </div>
    );
};

export default TeamSelection;