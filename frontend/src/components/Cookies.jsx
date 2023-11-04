import React from 'react'
import { useState, useEffect} from 'react'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import peach from "../assets/peach.png"
import clicker from "../assets/clicker.png"
import divineDogs from "../assets/divineDog.gif"
import tesla from "../assets/tesla.png"
import rabbit from "../assets/rabbitEscape.gif"
import Popup from "./ShopPopup"
import elephant from "../assets/maxElephant.gif"

// import { buyDivineDog } from "./ShopPopup"




const Cookies = () => {

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
  const [cookieCount, setCookieCount] = useState(100)
  const [cookiePerClick, setCookiePerClick] = useState (1)

//ShadowGarden States
  const [numShadows, setNumShadows] = useState(0)
  const [costClicker, setCostClicker] = useState(100)
  // const [shadowList, setShadowList] = useState([])

  const [openShop, setOpenShop] = useState(false)

//Click upgrade States
  const [numClickUpgrade, setNumClickUpgrade] = useState(1)
  const [costClickUpgrade, setCostClickUpgrade] = useState(150)

  useEffect(() => {
    const interval = setInterval(() => clickCookiePerSecond(), 1000);
    console.log("cookieCount")
    return () => {
      clearInterval(interval);
    };
  }, );

  const clickCookiePerSecond = () => {
    setCookieCount(n => n + cookiesPerSecond)
  }

  const clickCookie = () => {
    setCookieCount((cookieCount => cookieCount + cookiePerClick))
  }

  const buyClickUpgrade = () => {
    if(cookieCount >= costClickUpgrade){
      setNumClickUpgrade(n => n + 1)
      setCookiePerClick(numClickUpgrade => numClickUpgrade + 1)
      setCostClickUpgrade(Math.floor(costClickUpgrade * 1.17))
      setCookieCount(cookieCount - costClickUpgrade)
    }
    else{
      alert("not enough cookies")
    }
  }
  
  const buyClicker = () => {
    if(cookieCount >= costClicker){
      setNumShadows(numShadows => numShadows + 1)
      setCostClicker(Math.floor(costClicker * 1.17))
      setCookieCount(cookieCount => cookieCount - costClicker)
      setCookiesPerSecond(cookiesPerSecond => cookiesPerSecond + 1)
      setOpenShop(true)
    }
    else{
      alert("not enough cookies")
    }
  }

  return (
    <div>
      <h1> Cookies per click : {cookiePerClick} </h1>
      <h1> Cookies per second : {cookiesPerSecond} </h1>
        <div className="cookie_container">
            <img id = "cookieID" src= { peach } alt="cookie" onClick={() => clickCookie()}width="400" height="400"></img>
            <h1> Cookies: {Math.floor(cookieCount)} </h1>

            <div className="total-upgrade-container">

              {/* SHADOW GARDEN*/}
              <div className="upgrade-container">
                <div className="upgrade-button">
                  <div className="clicker">
                    <img id = "clickerID" src={ clicker } alt="clicker" onClick={() => buyClicker()}></img>
                    <h1> Clickers: {numShadows}</h1>
                    <h1> Price: {costClicker}</h1>
        
                    <Popup trigger = {openShop} setTrigger ={setOpenShop}>
                      <h1> Chimera Shadow Garden </h1>
                    </Popup>

                  </div>
                </div>
                <div className="upgrade-zone">
                  <h1> Jesse's Shadow Garden </h1>
                    <img id = "divineDogs" src={ divineDogs } alt="divineDogs"></img>
                  <img id = "rabbit" src={ rabbit } alt="rabbit"></img>
                  <img id = "rabbit" src={ elephant } alt="rabbit"></img>

                </div>
                  

                  

                </div>
              {/* SHADOW GARDEN END*/}



              {/* TESLA SHOP END*/}
              <div className="upgrade-container">
                <div className="upgrade-button-tesla">
                  <div className = "clicker-upgrade">
                    <img id = "teslaUpgradeID" src={ tesla } alt="clickUpgrade" onClick={() => buyClickUpgrade()}></img>
                    <h1> click Upgrade {numClickUpgrade}</h1>
                    <h1> Price: {costClickUpgrade}</h1>
                  </div>
                </div>
                <div className="upgrade-zone">
                  <div className="click-upgrade">
                    <h1> Tsak's Tesla Shop </h1>
                    <img id = "tesla" src={ tesla } alt="tesla" width="200" height="150"></img>
                  </div>
                </div>
              </div>
              {/* TESLA SHOP END*/}

              {/* DINER SHOP END*/}
              <div className="upgrade-container">
                <div className="upgrade-button">
                  <div className = "clicker-upgrade">
                    <img id = "clickUpgradeID" src={ clicker } alt="clickUpgrade" onClick={() => buyClickUpgrade()}></img>
                    <h1> click Upgrade {numClickUpgrade}</h1>
                    <h1> Price: {costClickUpgrade}</h1>
                  </div>
                </div>
                <div className="upgrade-zone">
                  <div className="click-upgrade">
                    <div className="dansDiner">
                      <h1> Dan's Diner </h1>
                      <img id = "food"  alt="food" width="200" height="150"></img>
                    </div>
                  </div>
                </div>
              </div>
              {/* DINER SHOP END*/}

              {/* MEDBAY SHOP END*/}
              <div className="upgrade-container">
                <div className="upgrade-button">
                  <div className = "clicker-upgrade">
                    <img id = "clickUpgradeID" src={ clicker } alt="clickUpgrade" onClick={() => buyClickUpgrade()}></img>
                    <h1> click Upgrade {numClickUpgrade}</h1>
                    <h1> Price: {costClickUpgrade}</h1>
                  </div>
                </div>
                <div className="upgrade-zone">
                  <div className="click-upgrade">
                    <h1> Bricker's Medbay </h1>
                    <img id = "medbay"  alt="medbay" width="200" height="150"></img>
                  </div>
                </div>
              </div>
              {/* MEDBAY SHOP END*/}


            </div>
        </div>
    </div>
  )
}

export default Cookies