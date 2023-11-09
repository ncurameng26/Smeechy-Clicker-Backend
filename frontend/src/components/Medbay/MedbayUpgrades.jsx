import "../styles/cookie-styles.css"
import "../styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../../features/cookie"
import bandage from "../../assets/bandage.gif"

const MedbayUpgrade = () => {

    const [numMedItems, setNumMedItems] = useState(0);
    const [costMedItem, setCostMedItem] = useState(300);

    const cookieSelector = useSelector((state) => state.cookie.value)


    const dispatch = useDispatch()

    const buyMedItem = () => {
        if (cookieSelector.numCookies >= costMedItem) {
            setNumMedItems(n => n + 1)
            setCostMedItem(Math.floor(costMedItem * 1.355))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costMedItem, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 5 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    return (
        <div className="upgrade-button">
            <div className="clicker">
                <img id="bandage" src={bandage} onClick={() => { buyMedItem() }} alt="bandage" ></img>
                <h1> Med Items: {numMedItems}</h1>
                <h1> Price: {costMedItem}</h1>
                <h1> total CPS: {numMedItems * 5} </h1>
            </div>
        </div>
    )
}

export default MedbayUpgrade
