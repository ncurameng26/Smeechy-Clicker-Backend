import React from 'react'
import { useState, useEffect } from 'react'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import peach from "../assets/peach.png"
import clicker from "../assets/clicker.png"
import divineDogs from "../assets/divineDog.gif"
import tesla from "../assets/tesla.png"
import rabbit from "../assets/rabbitEscape.gif"
import Popup from "./ShopPopup"
import elephant from "../assets/maxElephant.gif"
import ShadowGarden from './ShadowGarden'

// import { buyDivineDog } from "./ShopPopup"




const Cookies = (props) => {

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
  const [cookieCount, setCookieCount] = useState(100)
  const [cookiePerClick, setCookiePerClick] = useState(1)

  //ShadowGarden States
  const [numShadows, setNumShadows] = useState(0)
  const [costClicker, setCostClicker] = useState(100)
  const [selectedShadow, setSelectedShadow] = useState("")
  // const [shadowList, setShadowList] = useState([])

  //Click upgrade States
  const [numClickUpgrade, setNumClickUpgrade] = useState(1)
  const [costClickUpgrade, setCostClickUpgrade] = useState(150)

  useEffect(() => {
    const interval = setInterval(() => clickCookiePerSecond(), 1000);
    console.log("cookieCount")
    return () => {
      clearInterval(interval);
    };
  },);

  const clickCookiePerSecond = () => {
    setCookieCount(n => n + cookiesPerSecond)
  }

  const clickCookie = () => {
    setCookieCount((cookieCount => cookieCount + cookiePerClick))
  }

  const buyClickUpgrade = () => {
    if (cookieCount >= costClickUpgrade) {
      setNumClickUpgrade(n => n + 1)
      setCookiePerClick(numClickUpgrade => numClickUpgrade + 1)
      setCostClickUpgrade(Math.floor(costClickUpgrade * 1.17))
      setCookieCount(cookieCount - costClickUpgrade)
    }
    else {
      alert("not enough cookies")
    }
  }

  const buyClicker = () => {
    if (cookieCount >= costClicker) {
      setNumShadows(numShadows => numShadows + 1)
      setCostClicker(Math.floor(costClicker * 1.17))
      setCookieCount(cookieCount => cookieCount - costClicker)
      setCookiesPerSecond(cookiesPerSecond => cookiesPerSecond + 1)
    }
    else {
      alert("not enough cookies")
    }
  }

  return (
    <div>
      <h1> Cookies per click : {cookiePerClick} </h1>
      <h1> Cookies per second : {cookiesPerSecond} </h1>

      <div className="cookie_container">
        <img id="cookieID" src={peach} alt="cookie" onClick={() => clickCookie()} width="400" height="400"></img>
        <h1> Cookies: {Math.floor(cookieCount)} </h1>

        <div className="total-upgrade-container">
          <ShadowGarden />




        </div>
      </div>
    </div>
  )
}

export default Cookies