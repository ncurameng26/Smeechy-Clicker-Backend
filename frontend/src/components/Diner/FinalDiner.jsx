import React from 'react'
import DiningHall from './DiningHall'
import DinerUpgrade from './DinerUpgrade'


const FinalShadowGarden = () => {

    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade">
                    <DinerUpgrade />
                </div>
                <div className="zone">
                    <DiningHall />
                </div>

            </div>

        </div>
    )
}

export default FinalShadowGarden
