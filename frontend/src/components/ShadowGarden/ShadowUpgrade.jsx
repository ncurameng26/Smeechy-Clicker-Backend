import divineDogs from "../../assets/divineDog.gif"
import "../styles/cookie-styles.css"
import "../styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../../features/cookie"

const ShadowUpgrade = () => {

    const [numShadows, setNumShadows] = useState(0);
    const [costShadow, setCostShadow] = useState(100);

    const cookieSelector = useSelector((state) => state.cookie.value)


    const dispatch = useDispatch()

    const buyShadowItem = () => {
        if (cookieSelector.numCookies >= costShadow) {
            setNumShadows(n => n + 1)
            setCostShadow(Math.floor(costShadow * 1.17))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costShadow, cookiePerClick: cookieSelector.cookiePerClick + 1, cookiesPerSecond: cookieSelector.cookiesPerSecond }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    return (
        <div className="upgrade-button">
            <div className="clicker">
                <img id="divineDogsID" src={divineDogs} onClick={() => { buyShadowItem() }} alt="divineDogs" ></img>
                <h1> Shadows: {numShadows}</h1>
                <h1> Price: {costShadow}</h1>
                <h1> CPC: {numShadows} </h1>

            </div>
        </div>
    )
}

export default ShadowUpgrade
