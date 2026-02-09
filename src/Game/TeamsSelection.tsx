import React, { useState, useEffect } from "react";
import { Player, UIPlayer } from "../Models/Player";
import { getPlayers } from "../Services/PlayerService";
import '../CSS/UL.css';
import '../CSS/Button.css';

const TeamsSelection = () => {
    const [allPlayers, setAllPlayers] = useState<UIPlayer[]>([]);
    
    useEffect(() => {
        const getPlayersData = async () => {
            const players: Player[] = await getPlayers();
            setAllPlayers(players.map((player, index) => ({name: player.name, selected: false})));
        };

        getPlayersData();
    }, []);

    const addPlayerToTeam = (player: UIPlayer, index: number) => {
        let players: UIPlayer[] = allPlayers.map((p, i) => ({name: p.name, selected: p.selected}));        
        let indexedPlayer = players[index];
        indexedPlayer.selected = (indexedPlayer.selected? false: true);
        setAllPlayers(players);
    };

    const getClassName = (player: UIPlayer) => {
        if(player.selected) {
            return "ButtonSelected";
        } else {
            return "Button";
        }
    };

    return(
        <div className="App">
            <header className="App-header">
                <p>Select players for Team 1</p>
                <ul>
                    {allPlayers.map((player, index) => (
                        <li key={index}>
                            <button className={player.selected === true? 'ButtonSelected' : 'Button'} onClick={() => { addPlayerToTeam(player, index) }}> {player.name} </button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
};

export default TeamsSelection;