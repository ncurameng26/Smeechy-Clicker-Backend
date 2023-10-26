
import React from "react";
import "./styles/home-page-styles.css"


class MainPage extends React.Component {
    render(){
        return(
            <>
                <h1 className="smeechyTitle"> Welcome to Smeechy Clicker </h1>
                <button className="peachButton" onClick={console.log("click 1")}>  Click This to Play </button>
                <br></br>
                <button className="logIn" onClick={console.log("click 2")}>  Click This to log in </button>
                <br></br>

                <button className="signUp" onClick={console.log("click 3")}>  Click This to sign up </button>


            </>
        )
    }
}

export default MainPage;