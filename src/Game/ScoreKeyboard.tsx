import React from "react";
import '../CSS/ScoreKeyboard.css';
import { ScoreKey } from "../Models/ScoreKey";

const ScoreKeyboard = (props: {onClick: (keyPressed: ScoreKey) => void }) => {
    return (
        <div className="ScoreKeyboardCard">
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.One)}>1</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.Two)}>2</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.Three)}>3</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.Four)}>4</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.Six)}>6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">                
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.NoBall)}>NB</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.NoBallPlusOne)}>NB+1</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.NoBallPlusTwo)}>NB+2</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.NoBallPlusFour)}>NB+4</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.NoBallPlusSix)}>NB+6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKey.Wide)}>WD</div>
            </div>
        </div>
    );
};

export default ScoreKeyboard;