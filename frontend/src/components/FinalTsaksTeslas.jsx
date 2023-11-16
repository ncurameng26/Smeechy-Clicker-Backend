import tesla from "./../assets/tesla.png"
import redtesla from './../assets/redtesla.png'
import bluetesla from './../assets/bluetesla.png'
import purpleTesla from './../assets/purpletesla.png'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../features/cookie"

const FinalMedBay = () => {

    const [numTesla, setNumTesla] = useState(0);

    const [costWhiteTesla, setCostWhiteTesla] = useState(70);
    const [costRedTesla, setCostRedTesla] = useState(210);
    const [costBlueTesla, setCostBlueTesla] = useState(140);
    const [costPurpleTesla, setCostPurpleTesla] = useState(300);


    const cookieSelector = useSelector((state) => state.cookie.value)
    const [teslaList, setTeslaList] = useState([]);
    const dispatch = useDispatch()

    const WhiteTesla = () => {
        return (<img id="divineDogsID" src={tesla} alt="tesla" ></img>)
    }

    const RedTesla = () => {
        return (<img id="divineDogsID" src={redtesla} alt="tesla" ></img>)
    }


    const BlueTesla = () => {
        return (<img id="divineDogsID" src={bluetesla} alt="tesla" ></img>)
    }


    const PurpleTesla = () => {
        return (<img id="divineDogsID" src={purpleTesla} alt="tesla" ></img>)
    }


    const buyWhiteTesla = () => {
        if (numTesla === 10) {
            return (alert("Too many Teslas"))
        }
        if (cookieSelector.numCookies >= costWhiteTesla) {
            setNumTesla(n => n + 1)
            setTeslaList(teslaList.concat(<WhiteTesla key={teslaList.length} />));
            setCostWhiteTesla(Math.floor(costWhiteTesla * 1.3))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costWhiteTesla, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 2 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyRedTesla = () => {
        if (numTesla === 10) {
            return (alert("Too many Teslas"))
        }
        if (cookieSelector.numCookies >= costRedTesla) {
            setNumTesla(n => n + 1)
            setTeslaList(teslaList.concat(<RedTesla key={teslaList.length} />));
            setCostRedTesla(Math.floor(costRedTesla * 2.5))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costRedTesla, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 10 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyBlueTesla = () => {
        if (numTesla === 10) {
            return (alert("Too many Teslas"))
        }
        if (cookieSelector.numCookies >= costBlueTesla) {
            setNumTesla(n => n + 1)
            setTeslaList(teslaList.concat(<BlueTesla key={teslaList.length} />));
            setCostBlueTesla(Math.floor(costBlueTesla * 2.4))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costBlueTesla, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 5 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyPurpleTesla = () => {
        if (numTesla === 10) {
            return (alert("Too many Teslas"))
        }
        if (cookieSelector.numCookies >= costPurpleTesla) {
            setNumTesla(n => n + 1)
            setTeslaList(teslaList.concat(<PurpleTesla key={teslaList.length} />));
            setCostPurpleTesla(Math.floor(costPurpleTesla * 3))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costPurpleTesla, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 15 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    return (
        <div className="main">
            <div className="upgrade-button">
                <div className="col-left">
                    <div className="firstTwo">
                        <img id="divineDogsID" src={tesla} onClick={() => { buyWhiteTesla() }} alt="tesla" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costWhiteTesla}</h1>
                        </div>
                        <img id="divineDogsID" src={bluetesla} onClick={() => { buyBlueTesla() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costBlueTesla}</h1>
                        </div>
                    </div>

                    <div className="secondTwo">
                        <img id="divineDogsID" src={redtesla} onClick={() => { buyRedTesla() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costRedTesla}</h1>
                        </div>

                        <img id="divineDogsID" src={purpleTesla} onClick={() => { buyPurpleTesla() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costPurpleTesla}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <h1 className="title"> Tsak's Tesla Shop </h1>
                <div className="upgrade-zone">
                    <div>
                        {teslaList}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FinalMedBay
