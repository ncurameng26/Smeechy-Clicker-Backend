import React from 'react'
import { useState, useEffect} from 'react'
import "./styles/cookie-styles.css"
import peach from "../assets/peach.png"
import clicker from "../assets/clicker.png"




const Cookies = () => {

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
  const [cookieCount, setCookieCount] = useState(0)
  const [cookiePerClick, setCookiePerClick] = useState (1)


  const [numClickers, setNumClickers] = useState(0)
  const [costClicker, setCostClicker] = useState(20)

  const [numClickUpgrade, setNumClickUpgrade] = useState(1)
  const [costClickUpgrade, setCostClickUpgrade] = useState(20)

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
      setNumClickers(numClickers => numClickers + 1)
      setCostClicker(Math.floor(costClicker * 1.17))
      setCookieCount(cookieCount => cookieCount - costClicker)
      setCookiesPerSecond(cookiesPerSecond => cookiesPerSecond + 1)
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

            <div className="upgrade-container">
              <div className = "clickers">
                <img id = "clickerID" src={ clicker } alt="clicker" onClick={() => buyClicker()}width="200" height="200"></img>
                <h1> Clickers: {numClickers}</h1>
                <h1> Price: {costClicker}</h1>
              </div>

              <div className = "click-upgrade">
                <img id = "clickUpgradeID" src={ clicker } alt="clickUpgrade" onClick={() => buyClickUpgrade()}width="200" height="200"></img>
                <h1> click Upgrade {numClickUpgrade}</h1>
                <h1> Price: {costClickUpgrade}</h1>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Cookies