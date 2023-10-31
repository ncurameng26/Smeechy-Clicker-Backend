
import React from "react";
import "./styles/home-page-styles.css"
import SignUp from "./SignUp";
import Cookies from "./Cookies";


class StartPage extends React.Component {
    render(){
        return(
            <>
            <Cookies />
                <div className="headerContainer">
                    <h1 className = "topText"> Welcome to  </h1>
                    <h1 className="smeechyTitle"> Smeechy Clicker  </h1>
                </div>
     

                <div className="peachButton">
                    <button onClick={console.log("click 1")}>Click to Play  </button>
                </div>

                <div className="buttonContainer">
                    <button className="logIn" onClick={console.log("click 2")}>  Click This to log in </button>
                    <button className="signUp" onClick={console.log("click 3")}>  Click This to sign up </button>
                </div>



            </>
        )
    }
}

export default StartPage;