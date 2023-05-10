import React from "react";
import "./index.css";
function MyInfo() {
  return (
    <div>
      <h1 className = "task-head for-create">about me</h1>
        <div className="card-container-for-me">
          <div className="card" style = {{
            width: "50%",
            marginLeft: "193px",
            backgroundColor: "navy",
            color: "whitesmoke"
          }}>
            <div className="card-body">
              <div className="card__info">
                Hi, my name is Andrew McMahon, and I'm a current Sophomore in Software Engineering at Iowa State University. 
                This website is a MERN full stack application (MongoDB, Express, React, and Node.js), and was made for S E/ COM S 
                319 at Iowa State University. If you really like this website feel free to email me 
                <a style = {{color: "yellow"}} href="mailto: mcmahon4@iastate.edu? subject= subject text"> here!</a> 
                &nbsp;This project was finalized and completed on May 8th, 2023.
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
export default MyInfo;
