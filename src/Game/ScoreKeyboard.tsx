import React from "react";
import '../CSS/ScoreKeyboard.css';

const ScoreKeyboard = () => {
    return (
        <div className="ScoreKeyboardCard">
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement">1</div>
                <div className="ScoreKeyboardElement">2</div>
                <div className="ScoreKeyboardElement">3</div>
                <div className="ScoreKeyboardElement">4</div>
                <div className="ScoreKeyboardElement">6</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement">NB+6</div>
                <div className="ScoreKeyboardElement">NB</div>
                <div className="ScoreKeyboardElement">NB+1</div>
                <div className="ScoreKeyboardElement">NB+2</div>
                <div className="ScoreKeyboardElement">NB+4</div>
            </div>
            <br />
            <div className="ScoreKeyboardRow">
                <div className="ScoreKeyboardElement">WD</div>
            </div>
        </div>
    );
};

export default ScoreKeyboard;