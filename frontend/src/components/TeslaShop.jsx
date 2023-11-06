import React from 'react'

const TeslaShop = () => {
  return (
    <div>
      {/* TESLA SHOP END*/}
      <div className="upgrade-container">
        <div className="upgrade-button-tesla">
          <div className="clicker-upgrade">
            <img id="teslaUpgradeID" src={tesla} alt="clickUpgrade" onClick={() => buyClickUpgrade()}></img>
            <h1> click Upgrade {numClickUpgrade}</h1>
            <h1> Price: {costClickUpgrade}</h1>
          </div>
        </div>
        <div className="upgrade-zone">
          <div className="click-upgrade">
            <h1> Tsak's Tesla Shop </h1>
            <img id="tesla" src={tesla} alt="tesla" width="200" height="150"></img>
          </div>
        </div>
      </div>
      {/* TESLA SHOP END*/}
    </div>
  )
}

export default TeslaShop
