import { InningsStatus } from "./InningsStatus";
import { Player } from "./Player";
import { Teams } from "./Teams";

export interface Game {
    team1: Player[];
    team2: Player[];
    teamBattingFirst: Teams;
    innings1Status: InningsStatus;
    innings2Status: InningsStatus;
    innings1CurrentPlayer1?: Player;
    innings1CurrentPlayer2?: Player;
    innings2CurrentPlayer1?: Player;
    innings2CurrentPlayer2?: Player;
}