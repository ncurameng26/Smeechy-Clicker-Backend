import food from "./../assets/pancakes.png"
import taco from './../assets/taco.png'
import turkey from './../assets/turkey.png'
import chips from './../assets/chips.png'
import "./styles/cookie-styles.css"
import "./styles/upgrade-styles.css"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cookieCount } from "../features/cookie"

const FinalMedDiner = () => {

    const [numFood, setNumFood] = useState(0);


    const [costPancake, setCostPancake] = useState(300);
    const [costTaco, setCostTaco] = useState(400);
    const [costTurkey, setCostTurkey] = useState(500);
    const [costChips, setCostChips] = useState(600);



    const cookieSelector = useSelector((state) => state.cookie.value)
    const [foodList, setFoodList] = useState([]);
    const dispatch = useDispatch()

    const Pancake = () => {
        return (<img id="divineDogsID" src={food} alt="food" ></img>)
    }
    const Taco = () => {
        return (<img id="divineDogsID" src={taco} alt="food" ></img>)
    }
    const Turkey = () => {
        return (<img id="divineDogsID" src={turkey} alt="food" ></img>)
    }
    const Chips = () => {
        return (<img id="divineDogsID" src={chips} alt="food" ></img>)
    }


    const buyPancake = () => {
        if (numFood === 10) {
            return (alert("Too much food"))
        }
        if (cookieSelector.numCookies >= costPancake) {
            setNumFood(n => n + 1)
            setFoodList(foodList.concat(<Pancake key={foodList.length} />));
            setCostPancake(Math.floor(costPancake * 3.2))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costPancake, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 3 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }

    const buyTaco = () => {
        if (numFood === 10) {
            return (alert("Too much food"))
        }
        if (cookieSelector.numCookies >= costTaco) {
            setNumFood(n => n + 1)
            setFoodList(foodList.concat(<Taco key={foodList.length} />));
            setCostTaco(Math.floor(costTaco * 3.5))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costTaco, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 3 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }


    const buyTurkey = () => {
        if (numFood === 10) {
            return (alert("Too much food"))
        }
        if (cookieSelector.numCookies >= costTurkey) {
            setNumFood(n => n + 1)
            setFoodList(foodList.concat(<Turkey key={foodList.length} />));
            setCostTurkey(Math.floor(costTurkey * 3.7))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costTurkey, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 3 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }


    const buyChips = () => {
        if (numFood === 10) {
            return (alert("Too much food"))
        }
        if (cookieSelector.numCookies >= costChips) {
            setNumFood(n => n + 1)
            setFoodList(foodList.concat(<Chips key={foodList.length} />));
            setCostChips(Math.floor(costChips * 4))
            dispatch(
                cookieCount({ numCookies: cookieSelector.numCookies - costChips, cookiePerClick: cookieSelector.cookiePerClick, cookiesPerSecond: cookieSelector.cookiesPerSecond + 3 }),
            )
        }
        else {
            alert("not enuff bread")
        }
    }


    return (
        <div className="main">
            <div className="upgrade-button">
                <div className="col-left">
                    <div className="firstTwo">
                        <img id="divineDogsID" src={food} onClick={() => { buyPancake() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costPancake}</h1>
                        </div>
                        <img id="rabbitID" src={taco} onClick={() => { buyTaco() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costTaco}</h1>
                        </div>
                    </div>

                    <div className="secondTwo">
                        <img id="divineDogsID" src={turkey} onClick={() => { buyTurkey() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costTurkey}</h1>
                        </div>

                        <img id="rabbitID" src={chips} onClick={() => { buyChips() }} alt="divineDogs" ></img>
                        <div className="upgradeText">
                            <h1> Price: {costChips}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <h1 className="title"> Dan's Diner </h1>
                <div className="upgrade-zone">
                    <div>
                        {foodList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalMedDiner
