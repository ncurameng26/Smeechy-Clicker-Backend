
import React from "react";
import "./styles/home-page-styles.css"
import Cookies from "./Cookies";


class StartPage extends React.Component {
    render(){
        return(
            <>
                <div className="headerContainer">
                    <h1 className = "topText"> Welcome to  </h1>
                    <h1 className= "smeechyTitle"> Smeechy Clicker  </h1>
                </div>
     
            <Cookies />

            {/* <SignUp /> */}


            </>
        )
    }
}

export default StartPage;