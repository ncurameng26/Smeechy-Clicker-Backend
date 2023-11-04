
import React from "react";
import "./styles/home-page-styles.css"
import Cookies from "./Cookies";
import Scoreboard from "./Scoreboard";


class StartPage extends React.Component {
    render(){
        return(
            <>
                <div className="headerContainer">
                    <h1 className= "smeechyTitle"> Welcome to Smeechy Clicker  </h1>
                </div>
     
            <Cookies />
            <Scoreboard />

            {/* <SignUp /> */}


            </>
        )
    }
}

export default StartPage;