import React from 'react'
import { useState } from 'react'
import './styles/popup.css'
import divineDogs from "../assets/divineDog.gif"
import rabbit from "../assets/rabbitEscape.gif"
import maxElephant from "../assets/maxElephant.gif"

const ShopPopup = (props) => {

    //make a string thats empty and when you click a button it changes the string to the name oft he titem and returns that so that 


    const [selectedShadow, setSelectedShadow] = useState("")

    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-container">
                <button className='close-btn' onClick={() => props.setTrigger(false)}> Leave </button>

                {props.children}


                <div className="shopOptions">
                    <div className="item1">
                        <img id="divineDogs" src={divineDogs} onClick={() => { setSelectedShadow("divineDogs"); props.setTrigger(false) }} alt="divineDogs"></img>
                        <h2> Divine Dogs </h2>
                    </div>

                    <div className="item2">
                        <img id="rabbit" src={rabbit} onClick={() => setSelectedShadow("rabbitEscape")} alt="rabbit"></img>
                        <h2> Rabbit Escape </h2>
                    </div>
                    <div className="item3">
                        <img id="maxElephant" src={maxElephant} onClick={() => setSelectedShadow("maxElephant")} alt="maxElephant"></img>
                        <h2> Max Elephant </h2>
                    </div>
                </div>

                <h1> Selected Shadow: {selectedShadow} </h1>


            </div>
        </div>
    ) : "";
}

export default ShopPopup
