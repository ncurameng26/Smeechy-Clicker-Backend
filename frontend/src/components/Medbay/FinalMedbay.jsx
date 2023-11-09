import React from 'react'
import MedBay from './Medbay'
import MedBayUpgrades from './MedbayUpgrades'
import "../styles/upgrade-styles.css"


const FinalMedBay = () => {

    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade">
                    <MedBayUpgrades />
                </div>
                <div className="zone">
                    <MedBay />
                </div>

            </div>

        </div>
    )
}

export default FinalMedBay
