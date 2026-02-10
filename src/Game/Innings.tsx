import React from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Edit} from '../edit.svg';

const Innings = () => {
    const { inningsId } = useParams();
    return (
        <div className="Form">
            <div className="GameCard">
                <div className="GameCard-header">
                   <div>Batting: {0}</div>
                </div>
                <br />
                <div className="GameCard-header">
                   <div>Runs: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Wickets: {0}</div>
                </div>
                <br/>
                <div className="GameCard-header">
                   <div>Overs: {0.0}</div>
                </div>
                <div>display 5/7 balls</div>
                <div className="GameCard-header">
                    <button className="Button" onClick={() => {}}>Start</button>
                     <Edit style={{height: "50px", width: "50px"}}/>
                    <button className="Button" onClick={() => {}}>Start</button>
                     <Edit style={{height: "50px", width: "50px"}} />
                </div>
            </div>
        </div>
    );
};

export default Innings;