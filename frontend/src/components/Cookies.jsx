import React from 'react'
import { useState, useEffect } from 'react'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import peach from "../assets/peach.png"
import divineDogs from "../assets/divineDog.gif"
import tesla from "../assets/tesla.png"

import bandaid from "../assets/bandage.gif"


import pancakes from "../assets/pancakes.png"

// import { buyDivineDog } from "./ShopPopup"




const Cookies = (props) => {

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
  const [cookieCount, setCookieCount] = useState(1000000)
  const [cookiePerClick, setCookiePerClick] = useState(1)

  //ShadowGarden States
  const [numShadows, setNumShadows] = useState(0)
  const [costShadow, setCostShadow] = useState(100)
  // const [selectedShadow, setSelectedShadow] = useState("")
  // const [shadowList, setShadowList] = useState([])

  //Tesla upgrade States
  const [numTesla, setNumTesla] = useState(1)
  const [costTesla, setCostTesla] = useState(150)

  //Food Upgrade States
  const [numFood, setNumFood] = useState(0)
  const [costFood, setCostFood] = useState(200)

  //medBay Upgrade States
  const [numMedbay, setnumMedbay] = useState(0)
  const [costMedbay, setCostMedbay] = useState(300)

  useEffect(() => {
    const interval = setInterval(() => clickCookiePerSecond(), 1000);
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

  const buyMedbay = () => {
    if (cookieCount >= costMedbay) {
      setnumMedbay(n => n + 1)
      setCookiesPerSecond(cookiesPerSecond => cookiesPerSecond + 20)
      setCostMedbay(Math.floor(costMedbay * 1.399))
      setCookieCount(cookieCount - costMedbay)
    }
    else {
      alert("not enough cookies")
    }
  }

  const buyTesla = () => {
    if (cookieCount >= costTesla) {
      setNumTesla(n => n + 1)
      setCookiePerClick(numTesla => numTesla + 1)
      setCostTesla(Math.floor(costTesla * 1.5))
      setCookieCount(cookieCount - costTesla)
    }
    else {
      alert("not enough cookies")
    }
  }

  const buyFood = () => {
    if (cookieCount >= costFood) {
      setNumFood(n => n + 1)
      setCookiesPerSecond(cookiesPerSecond => cookiesPerSecond + 3)
      setCostFood(Math.floor(costFood * 1.7))
      setCookieCount(cookieCount - costFood)
    }
    else {
      alert("not enough cookies")
    }
  }

  const buyShadow = () => {
    if (cookieCount >= costShadow) {
      setNumShadows(numShadows => numShadows + 1)
      setCostShadow(Math.floor(costShadow * 1.2))
      setCookieCount(cookieCount => cookieCount - costShadow)
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

          {/* SHADOW GARDEN*/}
          <div className="upgrade-container">
            <div className="upgrade-button">
              <div className="clicker">
                <img id="clickerID" src={divineDogs} alt="clicker" onClick={() => buyShadow()}></img>
                <h1> Shadows: {numShadows}</h1>
                <h1> Price: {costShadow}</h1>

                {/* 
                <Popup trigger={openShop} setTrigger={setOpenShop} returnShadow={setSelectedShadow}>
                  <h1> Chimera Shadow Garden </h1>
                </Popup> */}

              </div>
            </div>
            <div className="upgrade-zone">
              <h1> Jesse's Shadow Garden </h1>
              <img id="divineDogs" src={divineDogs} alt="divineDogs"></img>


            </div>




          </div>
          {/* SHADOW GARDEN END*/}



          {/* TESLA SHOP END*/}
          <div className="upgrade-container">
            <div className="upgrade-button-tesla">
              <div className="clicker-upgrade">
                <img id="teslaUpgradeID" src={tesla} alt="Tesla" onClick={() => buyTesla()}></img>
                <h1> Teslas: {numTesla}</h1>
                <h1> Price: {costTesla}</h1>
              </div>
            </div>
            <div className="upgrade-zone">
              <div className="click-upgrade">
                <h1> Tsak's Tesla Shop </h1>
                <img id="tesla" src={tesla} alt="tesla" width="200" height="150"></img>
              </div>
            </div>
          </div>
          {/* TESLA SHOP END*/}

          {/* DINER SHOP END*/}
          <div className="upgrade-container">
            <div className="upgrade-button">
              <div className="clicker-upgrade">
                <img id="food" src={pancakes} alt="food" onClick={() => buyFood()}></img>
                <h1> Food : {numFood}</h1>
                <h1> Price: {costFood}</h1>
              </div>
            </div>
            <div className="upgrade-zone">
              <div className="click-upgrade">
                <div className="dansDiner">
                  <h1> Dan's Diner </h1>
                  <img id="food" src={pancakes} alt="food" width="200" height="150"></img>

                </div>
              </div>
            </div>
          </div>
          {/* DINER SHOP END*/}

          {/* MEDBAY SHOP END*/}
          <div className="upgrade-container">
            <div className="upgrade-button">
              <div className="clicker-upgrade">
                <img id="MedBays" src={bandaid} alt="MedBay" onClick={() => buyMedbay()}></img>
                <h1> MedBays: {numMedbay}</h1>
                <h1> Price: {costMedbay}</h1>
              </div>
            </div>
            <div className="upgrade-zone">
              <div className="click-upgrade">
                <h1> Bricker's Medbay </h1>
                <img id="MedBays" src={bandaid} alt="MedBay" width="200" height="150"></img>

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