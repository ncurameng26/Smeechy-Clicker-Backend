import React from 'react'
import TsaksTeslas from './TsaksTeslas'
import TeslaUpgrade from './TeslaUpgrade'
import "../styles/upgrade-styles.css"


const FinalTsaksTeslas = () => {

    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade">
                    <TeslaUpgrade />
                </div>
                <div className="zone">
                    <TsaksTeslas />
                </div>

            </div>

        </div>
    )
}

export default FinalTsaksTeslas
