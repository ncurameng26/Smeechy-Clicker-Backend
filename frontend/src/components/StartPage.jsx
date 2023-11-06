
import React from "react";
import "./styles/home-page-styles.css"
import Cookies from "./Cookies";
import Scoreboard from "./Scoreboard";
// import Parent from "./Parent";


class StartPage extends React.Component {
    render(){
        return(
            <>
                <div className="headerContainer">
                    <h1 className= "smeechyTitle"> Welcome to Smeechy Clicker  </h1>
                </div>

                {/* <Parent /> */}
     
            <Cookies />
            <Scoreboard /> 

            {/* /* <SignUp /> */}


            </>
        )
    }
}

export default StartPage;