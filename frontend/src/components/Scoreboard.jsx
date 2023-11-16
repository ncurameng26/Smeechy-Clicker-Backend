import React from "react";
import "./styles/scoreboard-styles.css"
import axios from 'axios';
import chips from './../assets/goodCropChips.png'




class Scoreboard extends React.Component {
  state = { details: [], }

  componentDidMount() {
    let data;
    axios.get("http://127.0.0.1:8000/")
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        })
      })
      .catch(err => { "error" })
  }

  render() {
    return (
      <>
        <div className="total-upgrade-container">
          {/* <div className="scoreboard"> */}
          <header> SCOREBOARD </header>
          <div className="dataWrapperWrapper">


            <div className="dataWrapper">

              {this.state.details.map((output, id) => (
                <div key={id}>
                  <div>
                    <div className="item-2">
                      <h2><img className='smallerChips' src={chips} alt="chips" /> {id + 1}) {output.name} wit {output.cookie} smeeches </h2>
                      <h2> | x/20 Achievements</h2>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>


        {/* </div > */}



      </>
    )
  }
}

export default Scoreboard;

