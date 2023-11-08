// import axios from 'axios';
import './App.css';
import React, { useState } from "react";
import peach from "./assets/peach.png"

// import StartPage from './components/StartPage';
import ShadowGarden from './components/ShadowGarden';
import Cookies from './components/Cookies';
import "./components/styles/cookie-styles.css"
import "./components/styles/upgrade-styles.css"
import "./components/styles/home-page-styles.css"


// have the child comp send how many cookies to subtract to cookies.jsx and handle the subtraction, then pass that information up
// to app.js where the peach and the functionality will work.

// issues:
// app.js is not an arrow function so I cant use react states

// solution:
// change it to an arrow function ?? (might cause error)

const App = () => {
  const [shadowGardenSubtract, setShadowGardenSubtract] = useState(0)
  const [cookieCount, setCookieCount] = useState(100)
  const [cookiePerClick, setCookiePerClick] = useState(1)


  const getShadowGardenSubtract = (shadowGardenSubtract) => {
    setShadowGardenSubtract(shadowGardenSubtract)
    if (cookieCount >= shadowGardenSubtract) {
      console.log("Can Buy Item")
      setCookieCount(n => n - shadowGardenSubtract)
    }
    else {
      alert("not enuff cookies bruh")
    }

  }

  // const getCookieCount = (cookieCount) => {
  //   setCookieCount(cookieCount)
  // }

  const clickCookie = () => {
    setCookieCount((cookieCount => cookieCount + cookiePerClick))
  }


  return (
    <div>
      <h1> Welcome to Smeechy Clicker </h1>
      <div className="cookie_container">
        <img id="cookieID" src={peach} alt="cookie" onClick={() => { clickCookie() }} width="400" height="400"></img>
        <h1> {cookieCount} </h1>




        {/* <Cookies /> */}

        <div className='total-upgrade-container'>
          <h1> {shadowGardenSubtract} </h1>
          <ShadowGarden onSubmit={getShadowGardenSubtract} />
        </div>

      </div>
    </div>

  );
}

export default App;
