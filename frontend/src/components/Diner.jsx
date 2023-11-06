import React from 'react'

const Diner = () => {
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
                        <div className="dansDiner">
                            <h1> Dan's Diner </h1>
                            <img id="food" alt="food" width="200" height="150"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Diner
