import { ScoreKey } from "./ScoreKey";

export interface ScoreKeyEventType {
    type: ScoreKey;
    value: number;
}

export const ScoreKeyEvent = {
    Dot: {
        type: ScoreKey.Dot,
        value: 0
    },
    One: {
        type: ScoreKey.One,
        value: 1
    },
    Two: {
        type: ScoreKey.Two,
        value: 2
    },
    Three: {
        type: ScoreKey.Three,
        value: 3
    },
    Four: {
        type: ScoreKey.Four,
        value: 4
    },
    Five: {
        type: ScoreKey.Five,
        value: 5
    },
    Six: {
        type: ScoreKey.Six,
        value: 6
    },
    NoBall: {
        type: ScoreKey.NoBall,
        value: 3
    },
    NoBallPlusOne: {
        type: ScoreKey.NoBallPlusOne,
        value: 4
    },
    NoBallPlusTwo: {
        type: ScoreKey.NoBallPlusTwo,
        value: 5
    },
    NoBallPlusThree: {
        type: ScoreKey.NoBallPlusThree,
        value: 6
    },
    NoBallPlusFour: {
        type: ScoreKey.NoBallPlusFour,
        value: 7
    },
    NoBallPlusFive: {
        type: ScoreKey.NoBallPlusFive,
        value: 8
    },
    NoBallPlusSix: {
        type: ScoreKey.NoBallPlusSix,
        value: 9
    },
    Wide: {
        type: ScoreKey.Wide,
        value: 3
    },
    Wicket: {
        type: ScoreKey.Wicket,
        value: 0
    },
}