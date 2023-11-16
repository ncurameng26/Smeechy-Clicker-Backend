import bandage from "./../assets/bandage.gif"
import syringe from './../assets/syringe.png'
import listen from './../assets/listen.png'
import pick from './../assets/pick.png'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../features/cookie"

const FinalMedBay = () => {

    const [numSupplies, setNumSupplies] = useState(0);

    const [costSupplies, setCostSupplies] = useState(300);
    const [costSyringe, setCostSyringe] = useState(350);
    const [costListen, setCostListen] = useState(400);
    const [costPick, setCostPick] = useState(600);

    const cookieSelector = useSelector((state) => state.cookie.value)
    const [bandageList, setBandageList] = useState([]);
    const dispatch = useDispatch()

    const Bandage = () => {
        return (<img id="divineDogsID" src={bandage} alt="divineDogs" ></img>)
    }

    const Syringe = () => {
        return (<img id="divineDogsID" src={syringe} alt="divineDogs" ></img>)
    }

    const Listen = () => {
        return (<img id="divineDogsID" src={listen} alt="divineDogs" ></img>)
    }

    const Pick = () => {
        return (<img id="divineDogsID" src={pick} alt="divineDogs" ></img>)

    }

    const buyBandageItem = () => {
        if (cookieSelector.numCookies >= costSupplies) {
            setNumSupplies(n => n + 1)
            setBandageList(bandageList.concat(<Bandage key={bandageList.length} />));
            setCostSupplies(Math.floor(costSupplies * 1.355))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costSupplies, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 20 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buySyringe = () => {
        if (cookieSelector.numCookies >= costSyringe) {
            setNumSupplies(n => n + 1)
            setBandageList(bandageList.concat(<Syringe key={bandageList.length} />));
            setCostSyringe(Math.floor(costSyringe * 1.355))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costSyringe, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 20 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyListenItem = () => {
        if (cookieSelector.numCookies >= costListen) {
            setNumSupplies(n => n + 1)
            setBandageList(bandageList.concat(<Listen key={bandageList.length} />));
            setCostListen(Math.floor(costListen * 1.355))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costListen, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 20 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyPick = () => {

        if (cookieSelector.numCookies >= costPick) {
            if (numSupplies === 0) {
                alert("Secret")
            }
            setNumSupplies(n => n + 1)
            setBandageList(bandageList.concat(<Pick key={bandageList.length} />));
            setCostPick(Math.floor(costPick * 1.355))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costPick, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 20 }),
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
                        <img id="divineDogsID" src={bandage} onClick={() => { buyBandageItem() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costSupplies}</h1>
                        </div>
                        <img id="rabbitID" src={syringe} onClick={() => { buySyringe() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costSyringe}</h1>
                        </div>
                    </div>

                    <div className="secondTwo">
                        <img id="divineDogsID" src={listen} onClick={() => { buyListenItem() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costListen}</h1>
                        </div>

                        <img id="rabbitID" src={pick} onClick={() => { buyPick() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costPick}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <h1 className="title"> Bricker's Medbay </h1>
                <div className="upgrade-zone">
                    <div>
                        {bandageList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalMedBay
