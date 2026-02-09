import React, { useState } from "react";
import '../CSS/UL.css';
import '../CSS/Button.css';
import { Player, UIPlayer } from "../Models/Player";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";

const TeamSelection= () => {
    const teamPlayers = useSelector<IRootState, Player[]>(state => state.player.allPlayers);
    const [selectablePlayers, setSelectablePlayers] = useState<UIPlayer[]>(teamPlayers.map(tp => ({ name: tp.name, selected: false })));
    
    const selectPlayer = (player: UIPlayer, index: number) => {
        let players: UIPlayer[] = selectablePlayers.map((p, i) => ({name: p.name, selected: p.selected}));        
        let indexedPlayer = players[index];
        indexedPlayer.selected = (indexedPlayer.selected? false: true);

        setSelectablePlayers(players);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Select players for Team 1</p>
                <ul>
                    {selectablePlayers.map((player, index) => (
                        <li key={index}>
                            <button className={player.selected === true? 'ButtonSelected' : 'Button'} onClick={() => { selectPlayer(player, index) }}> {player.name} </button>
                        </li>
                    ))}
                </ul>
                <button className="Button">Ok</button>
            </header>
        </div>
    );
};

export default TeamSelection;