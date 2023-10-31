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
        <hr></hr>
        <header> SCOREBOARD </header>
        <div className="dataWrapper">

          {this.state.details.map((output, id) => (
            <div key = {id}>
              <div>
                <div className="item-1"> <h1> Profile </h1> </div>
                <div className="item-2"> <h1> Name </h1> </div>
                <div className="item-3"> <h1> Cookies </h1> </div>
                <h2> Name : {output.name}</h2>  
                <h3> Cookies: {output.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </>
      )
  }
} 

export default Scoreboard;
  
  