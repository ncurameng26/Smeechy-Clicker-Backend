import './App.css';
import React from "react";
import "./components/styles/cookie-styles.css"
import "./components/styles/upgrade-styles.css"
import "./components/styles/home-page-styles.css"
import Scoreboard from './components/Scoreboard'
import StartPage from './components/StartPage';
import Signup from './components/Signup';



const App = () => {

  return (
    <div>
      <StartPage />
      <Scoreboard />
      <Signup />

    </div >

  );
}

export default App;