import "../styles/cookie-styles.css"
import "../styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import pancake from "../../assets/pancakes.png"
import { cookieCount } from "../../features/cookie"

const DinerUpgrade = () => {

    const [numDiners, setNumDiners] = useState(0);
    const [costDiners, setCostDiners] = useState(200);

    const cookieSelector = useSelector((state) => state.cookie.value)


    const dispatch = useDispatch()

    const buyDiningItem = () => {
        if (cookieSelector.numCookies >= costDiners) {
            setNumDiners(n => n + 1)
            setCostDiners(Math.floor(costDiners * 1.233))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costDiners, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 3 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    return (
        <div className="upgrade-button">
            <div className="clicker">
                <img id="tesla" src={pancake} onClick={() => { buyDiningItem() }} alt="tesla" ></img>
                <h1> Food: {numDiners}</h1>
                <h1> Price: {costDiners}</h1>
                <h1> Total CPS: {numDiners * 3} </h1>
            </div>
        </div>
    )
}

export default DinerUpgrade
