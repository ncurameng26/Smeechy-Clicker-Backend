import tesla from "../../assets/tesla.png"
import "../styles/cookie-styles.css"
import "../styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../../features/cookie"

const TeslaUpgrade = () => {

    const [numTeslas, setNumTeslas] = useState(0);
    const [costTesla, setCostTesla] = useState(150);

    const cookieSelector = useSelector((state) => state.cookie.value)


    const dispatch = useDispatch()

    const buyShadowItem = () => {
        if (cookieSelector.numCookies >= costTesla) {
            setNumTeslas(n => n + 1)
            setCostTesla(Math.floor(costTesla * 1.233))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costTesla, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 1 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    return (
        <div className="upgrade-button">
            <div className="clicker">
                <img id="tesla" src={tesla} onClick={() => { buyShadowItem() }} alt="tesla" ></img>
                <h1> Teslas: {numTeslas}</h1>
                <h1> Price: {costTesla}</h1>
                <h1> total CPS: {numTeslas * 1} </h1>
            </div>
        </div>
    )
}

export default TeslaUpgrade
