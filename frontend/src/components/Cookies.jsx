import React from 'react'
import { useState } from 'react'
import "./styles/cookie-styles.css"




const Cookies = () => {

  const [cookieCount, setCookieCount] = useState(58)

  const [numClickers, setNumClickers] = useState(0)
  const [costClicker, setcostClicker] = useState(70)

  const enoughForClickers = () => {
    if(cookieCount >= costClicker){
      setNumClickers(numClickers + 1)
      setcostClicker(Math.floor(costClicker * 1.17))
      subtractCookies()
      autoClickCookie()
    }
    else{
      alert("not enough cookies")
    }
  }

    const subtractCookies = () => {
      setCookieCount(cookieCount - costClicker)
    }

    const autoClickCookie = () => {
      setInterval(() => {
          setCookieCount(cookieCount + 1)
      }, 1000)
    }

  return (
    <div>
        <div className="cookie_container">
            <button className = "cookie_image" onClick={() => ((setCookieCount((cookieCount + 1))))}>  </button>
            <h1> Cookies: {Math.floor(cookieCount)} </h1>


            <div className = "clickers">
              <button onClick={() => {enoughForClickers()}} > buy clicker for {costClicker} </button>
              <h1> clickers {numClickers}</h1>
            </div>
        </div>
    </div>
  )
}

export default Cookies
