import React from "react";
import "./styles/scoreboard-styles.css"
// import axios from 'axios';




class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          userPass: ""
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
        console.log()
        event.preventDefault();
      }

  componentDidMount(){
    // // let data;
    // // axios.post("http://127.0.0.1:8000/")
    // pass
}

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            name="userPassword"
            type="password"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp;
  
  