import React from "react";
import "./index.css";

function MyInfo() {
  return (
    <div>
        <div className="card shadow-sm">
            <div className="card-body">
            <p className="card-text">Hi, my name is Andrew McMahon, and I'm a current Sophomore in Software Engineering at Iowa State University. This website is a MERN full stack application (MongoDB, Express, React, and Node.js), and was made for S E/ COM S 319 at Iowa State University. If you really like this website feel free to email me <a href="mailto: mcmahon4@iastate.edu? subject= subject text">here!</a> This project was finalized and completed on April 29th, 2023.</p>
            <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group"></div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default MyInfo;