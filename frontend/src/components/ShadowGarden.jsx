import React from 'react'
import { useState, useEffect } from 'react'
import rabbit from "../assets/rabbitEscape.gif"
import ShadowShopPopUp from "./ShopPopup"
import elephant from "../assets/maxElephant.gif"
import divineDogs from "../assets/divineDog.gif"
import Cookie from "./Cookies"

const ShadowGarden = () => {

    const [numShadows, setNumShadows] = useState(0)
    const [costShadows, setCostShadows] = useState(100)
    const [openShop, setOpenShop] = useState(false)
    const [cookieCount, setCookieCount] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => setCookieCount(), 1);
        return () => {
            clearInterval(interval);
        };
    },);

    const buyShadow = () => {
        setNumShadows(n => n + 1)
        setOpenShop(true)
        setCostShadows(Math.floor(costShadows * 1.17))
        console.log(costShadows)

    }



    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade-button">
                    <div className="clicker">
                        <img id="divineDogsID" src={divineDogs} alt="divineDogs" onClick={() => buyShadow()}></img>
                        <h1> Clickers: {numShadows}</h1>
                        <h1> Price: {costShadows}</h1>


                        <ShadowShopPopUp trigger={openShop} setTrigger={setOpenShop}>
                            <h1> Chimera Shadow Garden </h1>
                        </ShadowShopPopUp>

                    </div>
                </div>
                <div className="upgrade-zone">
                    <h1> Jesse's Shadow Garden </h1>
                    <img id="divineDogs" src={divineDogs} alt="divineDogs"></img>
                    <img id="rabbit" src={rabbit} alt="rabbit"></img>
                    <img id="rabbit" src={elephant} alt="rabbit"></img>
                </div>
            </div>
        </div>
    )
}

export default ShadowGarden
