// import React from 'react'
// import { useState, useEffect } from 'react'
// import "./styles/cookie-styles.css"
// import "./styles/upgrade-styles.css"
// import peach from "../assets/peach.png"
// // import clicker from "../assets/clicker.png"
// // import divineDogs from "../assets/divineDog.gif"
// // import tesla from "../assets/tesla.png"
// // import rabbit from "../assets/rabbitEscape.gif"
// // import Popup from "./ShopPopup"
// // import elephant from "../assets/maxElephant.gif"
// // import ShadowGarden from './ShadowGarden'

// // import { buyDivineDog } from "./ShopPopup"




// const Cookies = () => {

//   const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
//   const [cookieCount, setCookieCount] = useState(100)
//   const [cookiePerClick, setCookiePerClick] = useState(1)

//   useEffect(() => {
//     const interval = setInterval(() => clickCookiePerSecond(), 1000);
//     console.log("cookieCount")
//     return () => {
//       clearInterval(interval);
//     };
//   },);

//   const clickCookiePerSecond = () => {
//     setCookieCount(n => n + cookiesPerSecond)
//   }

//   const clickCookie = () => {
//     setCookieCount((cookieCount => cookieCount + cookiePerClick))
//   }

//   return (
//     <div>
//       <h1> Cookies per click : {cookiePerClick} </h1>
//       <h1> Cookies per second : {cookiesPerSecond} </h1>


//       </div>
//     </div>
//   )
// }

// export default Cookies