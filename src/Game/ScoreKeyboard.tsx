import React from "react";
import '../CSS/ScoreKeyboard.css';
import { ScoreKeyEvent, ScoreKeyEventType } from "../Models/ScoreKeyEvent";

const ScoreKeyboard = (props: {onClick: (keyPressed: ScoreKeyEventType) => void }) => {
    return (
        <div className="ScoreKeyboardCard">
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.One)}>1</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Two)}>2</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Three)}>3</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Four)}>4</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Six)}>6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">                
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.NoBall)}>NB</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.NoBallPlusOne)}>NB+1</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.NoBallPlusTwo)}>NB+2</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.NoBallPlusFour)}>NB+4</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.NoBallPlusSix)}>NB+6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Wide)}>WD</div>
                <div className="ScoreKeyboardElement" onClick={() => props.onClick(ScoreKeyEvent.Dot)}>0</div>
                <div className="ScoreKeyboardElement" style={{ backgroundColor: "#c31212" }} onClick={() => props.onClick(ScoreKeyEvent.Wicket)}>WK</div>
            </div>
        </div>
    );
};

export default ScoreKeyboard;