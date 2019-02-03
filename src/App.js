import React, { Component } from 'react'
import HomeScreen from "./components/HomeScreen"
import CreateScreen from "./components/CreateScreen"
import JoinScreen from "./components/JoinScreen"
import API from './API'

class App extends Component {
  state={
    currentScreen: "home",
    gameScreens: ["home", "create", "waiting"],
    gamesPlayers: [],
  }

  setGameScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return (<HomeScreen createOrJoin={this.createOrJoin}/>)
      case "create":
        return(<CreateScreen createGame={this.createGame}/>)
      case "join":
        return(<JoinScreen createGame={this.createGame}/>)
      default:
        break;
    }
  }

  createOrJoin = (nextScreen) => {
    this.setState({currentScreen: nextScreen})
  }

  createGame = (playerName, gameName) => {
    API.createPlayerAndJoinGame(playerName, gameName)
      .then(data => {
        const newPlayerAdded = [...this.state.gamesPlayers, data.player]
        this.setState({gamesPlayers: newPlayerAdded})
      })
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
