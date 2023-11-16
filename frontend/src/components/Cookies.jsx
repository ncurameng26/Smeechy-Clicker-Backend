import React from 'react'
import "./styles/cookie-styles.css"
import { useSelector, useDispatch } from 'react-redux' //Use Dispatch modifies values and use selector accesses them
import { cookieCount } from "../features/cookie.js"
import "./styles/upgrade-styles.css"
import peach from "../assets/peach.png"
import { useEffect } from 'react'

const Cookies = () => {
  const cookie = useSelector((state) => state.cookie.value)

  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => autoClickCookie(), 1000);
    return () => {
      clearInterval(interval);
    };
  },);


  const autoClickCookie = () => {
    dispatch(cookieCount({ numCookies: cookie.numCookies + cookie.cookiesPerSecond, cookiePerClick: cookie.cookiePerClick, cookiesPerSecond: cookie.cookiesPerSecond }))
  }

  const clickCookie = () => {
    dispatch(cookieCount({ numCookies: cookie.numCookies + cookie.cookiePerClick, cookiePerClick: cookie.cookiePerClick, cookiesPerSecond: cookie.cookiesPerSecond }))
  }

  return (
    <div>
      <div className="cookie_container">
        <img id="cookieID" src={peach} alt="cookie" onClick={() => { clickCookie(); }} width="300" height="300"></img>
      </div>
    </div>
  )
}

export default Cookies