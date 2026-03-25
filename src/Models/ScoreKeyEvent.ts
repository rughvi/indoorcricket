import { ScoreKey } from "./ScoreKey";

export interface ScoreKeyEventType {
    type: ScoreKey;
    value: number;
    label: string;
}

export const ScoreKeyEvent = {
    Dot: {
        type: ScoreKey.Dot,
        value: 0,
        label: "0"
    },
    One: {
        type: ScoreKey.One,
        value: 1,
        label: "1"
    },
    Two: {
        type: ScoreKey.Two,
        value: 2,
        label: "2"
    },
    Three: {
        type: ScoreKey.Three,
        value: 3,
        label: "3"
    },
    Four: {
        type: ScoreKey.Four,
        value: 4,
        label: "4"
    },
    Five: {
        type: ScoreKey.Five,
        value: 5,
        label: "5"
    },
    Six: {
        type: ScoreKey.Six,
        value: 6,
        label: "6"
    },
    NoBall: {
        type: ScoreKey.NoBall,
        value: 3,
        label: "NB"
    },
    NoBallPlusOne: {
        type: ScoreKey.NoBallPlusOne,
        value: 4,
        label: "NB1"
    },
    NoBallPlusTwo: {
        type: ScoreKey.NoBallPlusTwo,
        value: 5,
        label: "NB2"
    },
    NoBallPlusThree: {
        type: ScoreKey.NoBallPlusThree,
        value: 6,
        label: "NB3"
    },
    NoBallPlusFour: {
        type: ScoreKey.NoBallPlusFour,
        value: 7,
        label: "NB4"
    },
    NoBallPlusFive: {
        type: ScoreKey.NoBallPlusFive,
        value: 8,
        label: "NB5"
    },
    NoBallPlusSix: {
        type: ScoreKey.NoBallPlusSix,
        value: 9,
        label: "NB6"
    },
    Wide: {
        type: ScoreKey.Wide,
        value: 3,
        label: "WD"
    },
    Wicket: {
        type: ScoreKey.Wicket,
        value: 0,
        label: "W"
    },
}