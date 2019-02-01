import React, { Component } from 'react'
import HomeScreen from "./components/HomeScreen"
import CreateScreen from "./components/CreateScreen"
import API from './API'

class App extends Component {
  state={
    currentScreen: "create",
    gameScreens: ["home", "createjoin"]
  }

  setGameScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return (<HomeScreen />)
      case "create":
        return(<CreateScreen createGame={this.createGame}/>)
      default:
        break;
    }
  }

  createGame = (playerName, gameName) => {
    console.log("createGame in App")
    debugger
    API.createUserAndJoinGame(playerName, gameName)
  }

  render() {
    return (
      <div>
        <h1>Yeah Right!</h1>
        {this.setGameScreen()}
      </div>
    )
  }
}

export default App;
