import { InningsStatus } from "./InningsStatus";
import { Player } from "./Player";
import { Teams } from "./Teams";

export interface Game {
    team1: Player[];
    team2: Player[];
    teamBattingFirst: Teams;
    innings1Status: InningsStatus;
    innings2Status: InningsStatus;
    innings1CurrentBowler?: Player;
    innings2CurrentBowler?: Player;
    innings1CurrentPlayer1?: Player;
    innings1CurrentPlayer2?: Player;
    innings2CurrentPlayer1?: Player;
    innings2CurrentPlayer2?: Player;
    innings1PlayersScore?: {};
    innings2PlayersScore?: {};
    innings1TotalRuns?: number;
    innings2TotalRuns?: number;
    innings1TotalBalls?: number;
    innings2TotalBalls?: number;
    innings1Extras?: number;
    innings2Extras?: number;
    innings1Wickets?: number;
    innings2Wickets?: number;
}