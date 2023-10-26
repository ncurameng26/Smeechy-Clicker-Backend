import axios from 'axios';
import './App.css';
import React from 'react';
import StartPage from './components/StartPage';
import Scoreboard from './components/Scoreboard';


class App extends React.Component {
  render(){
    return(
      <div>
        <StartPage />
        <Scoreboard />
      </div>
      
    )
  }
}


export default App;
