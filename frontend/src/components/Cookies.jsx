import React from 'react'
import { useState } from 'react'
import "./styles/cookie-styles.css"


const Cookies = () => {
    const [Cookies, setCookies] = useState(0)
  return (
    <div>
        <div className="cookie_container">
            <button className = "cookie_image" onClick={() => setCookies(Cookies + 1)}> Cookie </button>
            <h1> Cookies: {Cookies} </h1>
        </div>
    </div>
  )
}

export default Cookies
