import divineDogs from "./../assets/divineDog.gif"
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../features/cookie"
import frog from '../assets/frog.gif'
import rabbit from '../assets/rabbitEscape.gif'
import elephant from '../assets/maxElephant2.gif'

const FinalShadowGarden = () => {

    const [numShadows, setNumShadows] = useState(0);

    const [costDivineDog, setCostDivineDog] = useState(50);
    const [costRabbit, setCostRabbit] = useState(150);
    const [costFrog, setCostFrog] = useState(100);
    const [costElephant, setEostElephant] = useState(200);

    const cookieSelector = useSelector((state) => state.cookie.value)
    const [shadowList, setShadowList] = useState([]);
    const dispatch = useDispatch()


    const DivineDog = () => {
        return (<img id="divineDogsID" src={divineDogs} alt="divineDogs" ></img>)
    }

    const Rabbit = () => {
        return (<img id="divineDogsID" src={rabbit} alt="divineDogs" ></img>)
    }

    const Frog = () => {
        return (<img id="divineDogsID" src={frog} alt="divineDogs" ></img>)
    }

    const Elephant = () => {
        return (<img id="divineDogsID" src={elephant} alt="divineDogs" ></img>)
    }




    const buyDivineDog = () => {
        if (numShadows === 10) {
            return (alert("Too many Shadows"))
        }
        if (cookieSelector.numCookies >= costDivineDog) {
            setNumShadows(n => n + 1)
            setShadowList(shadowList.concat(<DivineDog key={shadowList.length} />));
            setCostDivineDog(Math.floor(costDivineDog * 1.3))
            dispatch(cookieCount({ numCookies: cookieSelector.numCookies - costDivineDog, cookiePerClick: cookieSelector.cookiePerClick + 1, cookiesPerSecond: cookieSelector.cookiesPerSecond }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyRabbit = () => {
        if (numShadows === 10) {
            return (alert("Too many Shadows"))
        }
        if (cookieSelector.numCookies >= costRabbit) {
            setNumShadows(n => n + 1)
            setShadowList(shadowList.concat(<Rabbit key={shadowList.length} />));
            setCostRabbit(Math.floor(costRabbit * 1.6))
            dispatch(cookieCount({ numCookies: cookieSelector.numCookies - costRabbit, cookiePerClick: cookieSelector.cookiePerClick + 10, cookiesPerSecond: cookieSelector.cookiesPerSecond }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyFrog = () => {
        if (numShadows === 10) {
            return (alert("Too many Shadows"))
        }
        if (cookieSelector.numCookies >= costFrog) {
            setNumShadows(n => n + 1)
            setShadowList(shadowList.concat(<Frog key={shadowList.length} />));
            setCostFrog(Math.floor(costFrog * 1.9))
            dispatch(cookieCount({ numCookies: cookieSelector.numCookies - costFrog, cookiePerClick: cookieSelector.cookiePerClick + 5, cookiesPerSecond: cookieSelector.cookiesPerSecond }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }


    const buyElephant = () => {
        if (numShadows === 10) {
            return (alert("Too many Shadows"))
        }
        if (cookieSelector.numCookies >= costElephant) {
            setNumShadows(n => n + 1)
            setShadowList(shadowList.concat(<Elephant key={shadowList.length} />));
            setEostElephant(Math.floor(costElephant * 3))
            dispatch(cookieCount({ numCookies: cookieSelector.numCookies - costElephant, cookiePerClick: cookieSelector.cookiePerClick + 15, cookiesPerSecond: cookieSelector.cookiesPerSecond }),
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
                        <img id="divineDogsID" src={divineDogs} onClick={() => { buyDivineDog() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costDivineDog}</h1>
                        </div>
                        <img id="rabbitID" src={frog} onClick={() => { buyFrog() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costFrog}</h1>
                        </div>
                    </div>

                    <div className="secondTwo">
                        <img id="divineDogsID" src={rabbit} onClick={() => { buyRabbit() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costRabbit}</h1>
                        </div>

                        <img id="rabbitID" src={elephant} onClick={() => { buyElephant() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costElephant}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <h1 className="title"> Jesse's Shadow Garden </h1>
                <div className="upgrade-zone">
                    <div>
                        {shadowList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalShadowGarden
