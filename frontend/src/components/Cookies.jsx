import React from 'react'
import { useState, useEffect } from 'react'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import peach from "../assets/peach.png"
import ShadowGarden from './ShadowGarden'

// import { buyDivineDog } from "./ShopPopup"

//call back function thats called by child componennt]




//this will only store the cookie information instead of the building info then i will use props to send how many cookies each component need to subtract from the total cookie count in order to decremenet by a certain amount. the rest will be handled in each individual comp

const Cookies = (props) => {

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
  const [cookieCount, setCookieCount] = useState(100)
  const [cookiePerClick, setCookiePerClick] = useState(1)
  const [cookieToSubtract, setCookieToSubtract] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCookieCount(n => n + cookiesPerSecond), 1000);

    return () => {
      clearInterval(interval);

    };
  },);

  const clickCookie = () => {
    setCookieCount((cookieCount => cookieCount + cookiePerClick))
    console.log(props.children)
  }


  return (
    <div>
      <h1> Cookies per click : {cookiePerClick} </h1>
      <h1> Cookies per second : {cookiesPerSecond} </h1>
      {/* <h1> cookie to subtract : {} </h1> */}
      <div className="cookie_container">
        <img id="cookieID" src={peach} alt="cookie" onClick={() => clickCookie()} width="400" height="400"></img>
        <h1> Cookies: {Math.floor(cookieCount)} </h1>

        <div className="total-upgrade-container">
          <ShadowGarden> {cookieCount} </ShadowGarden>



        </div>
      </div>
    </div>
  )
}

export default Cookies