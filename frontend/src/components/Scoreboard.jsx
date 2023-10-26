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
    .catch(err => { })
}

  render(){
    return(
      <>     
        <header> Data Generated From Django </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div key = {id}>
            <div>
                <h2> Name : {output.name}</h2>  
                <h3> Cookies: {output.description}</h3>
            </div>
          </div>
        ))}
      </>
      )
  }
} 

export default Scoreboard;
  
  