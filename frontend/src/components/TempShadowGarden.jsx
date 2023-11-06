import React from 'react'
import { useState, useEffect} from 'react'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"

import ShadowShopPopUp from "./ShopPopup"


//ShadowGarden States

  // const [shadowList, setShadowList] = useState([])


const TempShadowGarden = (props) => {
    const [openShop, setOpenShop] = useState(false)
    const [cookieCount, setCookieCount] = useState(0)
    
    useEffect(() => {
        const interval = setInterval(() => setCookieCount(props.children), 1);
        return () => {
          clearInterval(interval);
        };
      }, );


  return (
    <div>
 


        <h1> Hello {cookieCount} </h1>
        <button onClick={() => {setOpenShop(true)}}> open shop </button>

        <ShadowShopPopUp trigger = {openShop} setTrigger ={setOpenShop}>
            <h1> Chimera Shadow Garden </h1>
        </ShadowShopPopUp>

    </div>
  )
}

export default TempShadowGarden
