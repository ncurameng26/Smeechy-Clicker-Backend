import './App.css';
import React from "react";
import "./components/styles/cookie-styles.css"
import "./components/styles/upgrade-styles.css"
import "./components/styles/home-page-styles.css"
import Scoreboard from './components/Scoreboard'
import StartPage from './components/StartPage';



const App = () => {

  return (
    <div>
      <StartPage />
      <Scoreboard />
    </div >

  );
}

export default App;