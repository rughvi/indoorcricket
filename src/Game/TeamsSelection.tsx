import React, { useState, useEffect } from "react";
import { Player } from "../Models/Player";
import { getPlayers } from "../Services/PlayerService";

const TeamsSelection = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const getPlayersData = async () => {
            const players = await getPlayers();
        };

        getPlayersData();
    }, [players]);

    return(
        <div className="App">
            <header className="App-header">

            </header>
        </div>
    );
};

export default TeamsSelection;