import axios from 'axios';
import './App.css';
import React from 'react';
import MainPage from './components/MainPage';
import Scoreboard from './components/Scoreboard';


class App extends React.Component {
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
      <div>
        <MainPage />
        <Scoreboard />
      </div>
      
    )
  }
}


export default App;
