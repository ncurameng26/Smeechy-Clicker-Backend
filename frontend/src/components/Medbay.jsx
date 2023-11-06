import React from 'react'

const Medbay = () => {
    return (
        <div>
            <div className="upgrade-container">
                <div className="upgrade-button">
                    <div className="clicker-upgrade">
                        <img id="clickUpgradeID" src={clicker} alt="clickUpgrade" onClick={() => buyClickUpgrade()}></img>
                        <h1> click Upgrade {numClickUpgrade}</h1>
                        <h1> Price: {costClickUpgrade}</h1>
                    </div>
                </div>
                <div className="upgrade-zone">
                    <div className="click-upgrade">
                        <h1> Bricker's Medbay </h1>
                        <img id="medbay" alt="medbay" width="200" height="150"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medbay
