import React from 'react'
import ShadowGarden from './ShadowGarden'
import ShadowUpgrade from './ShadowUpgrade'


const FinalShadowGarden = () => {

    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade">
                    <ShadowUpgrade />
                </div>
                <div className="zone">
                    <ShadowGarden />
                </div>

            </div>

        </div>
    )
}

export default FinalShadowGarden
