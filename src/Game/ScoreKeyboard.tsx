import React, { useState } from "react";
import '../CSS/ScoreKeyboard.css';
import { ScoreKeyEvent, ScoreKeyEventType } from "../Models/ScoreKeyEvent";

const ScoreKeyboard = (props: {onClick: (keyPressed: ScoreKeyEventType) => void }) => {
    const [isAnimate, setIsAnimate] = useState<boolean>(false);
    const [scorekey, setScoreKey] = useState<ScoreKeyEventType>(ScoreKeyEvent.Dot);
    const onClickScoreKey = (keyPressed: ScoreKeyEventType) => {
        setScoreKey(keyPressed);
        setIsAnimate(true);
        props.onClick(keyPressed);
        setTimeout(() => {
            setScoreKey(ScoreKeyEvent.Dot);
            setIsAnimate(false);
        }, 500);
    };

    return (
        <div className={isAnimate? 'ScoreKeyboardCard': 'ScoreKeyboardCard'}>
            {isAnimate && <div className={isAnimate? 'ScoreKeyboardCardOverlayShow': 'ScoreKeyboardCardOverlay'}>{scorekey.label}</div>}
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.One)}>1</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Two)}>2</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Three)}>3</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Four)}>4</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Six)}>6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">                
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.NoBall)}>NB</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.NoBallPlusOne)}>NB+1</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.NoBallPlusTwo)}>NB+2</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.NoBallPlusFour)}>NB+4</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.NoBallPlusSix)}>NB+6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Wide)}>WD</div>
                <div className="ScoreKeyboardElement" onClick={() => onClickScoreKey(ScoreKeyEvent.Dot)}>0</div>
                <div className="ScoreKeyboardElement" style={{ backgroundColor: "#c31212" }} onClick={() => onClickScoreKey(ScoreKeyEvent.Bowled)}>Bowled</div>
                <div className="ScoreKeyboardElement" style={{ backgroundColor: "#c31212" }} onClick={() => onClickScoreKey(ScoreKeyEvent.Catch)}>Catch</div>
                <div className="ScoreKeyboardElement" style={{ backgroundColor: "#c31212" }} onClick={() => onClickScoreKey(ScoreKeyEvent.Wicket)}>WK</div>
            </div>
        </div>
    );
};

export default ScoreKeyboard;