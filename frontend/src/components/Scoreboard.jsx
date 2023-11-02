import React from "react";
import "./styles/scoreboard-styles.css"
import axios from 'axios';




class Scoreboard extends React.Component {
  state = {details : [], }

  componentDidMount(){
    let data;
    axios.get("http://127.0.0.1:8000/")
    .then(res => {
      data = res.data;
      this.setState({
        details: data
      })
    })
    .catch(err => {"error"})
}

  render(){
    return(
      <>     
        <header> SCOREBOARD </header>
        <div className="dataWrapper">

          {this.state.details.map((output, id) => (
            <div key = {id}>  
              <div>
                <div className="item-2">               
                  <h2> {id + 1}. {output.name} wit {output.cookie} Cookies</h2>  
                  </div>
              </div>
            </div>
          ))}
        </div>
      </>
      )
  }
} 

export default Scoreboard;
  
  