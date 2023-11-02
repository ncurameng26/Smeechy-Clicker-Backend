import React from "react";
import "./styles/scoreboard-styles.css"
import axios from 'axios';



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      handleSubmit(event) {
        alert({})
        event.preventDefault();
      }


    

    render() {

        return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  
}

export default SignUp;
  
  