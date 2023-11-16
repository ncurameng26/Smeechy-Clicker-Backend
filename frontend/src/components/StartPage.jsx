
import React from "react";
import "./styles/home-page-styles.css"
import Cookies from "./Cookies";
import "./styles/cookie-styles.css"
import { useSelector } from 'react-redux' //Use Dispatch modifies values and use selector accesses them
import "./styles/upgrade-styles.css"
import FinalShadowGarden from './FinalShadowGarden';
import FinalTsaksTeslas from './FinalTsaksTeslas';
import FinalDiner from './FinalDiner';
import FinalMedBay from './FinalMedbay';


const StartPage = () => {

    const cookie = useSelector((state) => state.cookie.value)

    return (
        <>
            <div className="headerContainer">
                <h1 className="smeechyTitle"> Welcome to Smeechy Clicker  </h1>
            </div>

            <div>
                <Cookies />
                <h1 className="numSmeeches"> {cookie.numCookies} Smeeches </h1>

                <div className="total-upgrade-container">
                    <FinalShadowGarden />
                    <FinalTsaksTeslas />
                    <FinalDiner />
                    <FinalMedBay />


                </div>

            </div>
        </>
    )
}

export default StartPage;