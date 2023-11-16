import React from 'react'
import chips from "../assets/goodCropChips.png"

const Signup = () => {
    return (
        <div>
            <img id="Chips" onClick={() => { alert("Clicked") }} src={chips} alt="food" ></img>
            <h1> Click me to Sign up</h1>
        </div>
    )
}

export default Signup
