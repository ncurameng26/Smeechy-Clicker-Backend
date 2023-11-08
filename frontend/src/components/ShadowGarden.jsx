import React from 'react'
import { useState } from 'react'
// import React from 'react'
// import { useState, useEffect } from 'react'
// import rabbit from "../assets/rabbitEscape.gif"
// import ShadowShopPopUp from "./ShopPopup"
// import elephant from "../assets/maxElephant.gif"
import divineDogs from "../assets/divineDog.gif"
// import Cookie from "./Cookies"
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"


const ShadowGarden = (props) => {


    const [numShadows, setNumShadows] = useState(0)

    //  maybe all these could be methods in cookie.jsx, and have it be th eparent to popup and shadow garden and make the pop up occur in cookies.jsx so i can pass info from both comps up
    const buyShadow = () => {
        setNumShadows(n => n + 1)
        setCostShadow(Math.floor(costShadow * 1.17))
    }


    const [costShadow, setCostShadow] = useState(100);

    const handleSubmit = (e) => {
        props.onSubmit(costShadow);
    }

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <input type="type" value={costShadow} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form> */}
            <div>
                <div className="upgrade-container">
                    <div className="upgrade-button">
                        <div className="clicker">
                            <img id="divineDogsID" src={divineDogs} alt="divineDogs" onClick={() => { handleSubmit(); buyShadow() }}></img>
                            <h1> Clickers: {numShadows}</h1>
                            <h1> Price: {costShadow}</h1>
                        </div>
                    </div>
                    <div className="upgrade-zone">
                        <h1> Jesse's Shadow Garden </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShadowGarden
