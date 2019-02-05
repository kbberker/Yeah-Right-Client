import React, { Component } from 'react'
import HomeScreen from "./components/HomeScreen"
import CreateScreen from "./components/CreateScreen"
import JoinScreen from "./components/JoinScreen"
import WaitingScreen from "./components/WaitingScreen"
import AnswerScreen from "./components/AnswerScreen"
import AnswerWaitingScreen from "./components/AnswerWaitingScreen"
import API from './API'

class App extends Component {
  state={
    currentScreen: "home", // ! default should be "home"
    gameScreens: ["home", "create", "waiting"],
    gamesPlayers: [],
    gameId: 0, // ! default should be 0
    currentRound: {},
    player: {},
  }

  componentDidUpdate() {
    console.log({"componentDidUpdate before setGameScreen": this.state.currentScreen})
    this.setGameScreen()
  }

  setGameScreen = () => {
    // ? Might be better to change this based on an argument then state
    switch (this.state.currentScreen) {
      case "home":
        return (<HomeScreen createOrJoin={this.changeGameScreenState}/>)
      case "create":
        return(<CreateScreen createGame={this.createGame}/>)
      case "join":
        return(<JoinScreen createGame={this.createGame}/>)
      case "waiting":
        return (<WaitingScreen gameId={this.state.gameId} startGame={this.startGame} joinGame={this.joinGame}/>)
      case "answer":
        return (<AnswerScreen submitAnswer={this.submitAnswer}/>)
      case "answer-waiting":
        return (<AnswerWaitingScreen submitAnswer={this.submitAnswer} />)        
      default:
        break;
    }
  }

  changeGameScreenState = (nextScreen) => {
    this.setState({currentScreen: nextScreen})
  }

  createGame = (playerName, gameName) => {
    API.createPlayerAndJoinGame(playerName, gameName)
      .then(player => {
        this.setState({gameId: player.game.id, player: player, currentScreen: "waiting"})
      })
  }

  startGame = (newScreen, gamesPlayers) => {
    // const dasher = gamesPlayers[Math.floor(Math.random()*gamesPlayers.length)]
    
    // TODO Create a round for the game
    API.createNewRound(this.state.gameId)

    // TODO Set a player as the Dasher
      // TODO Send the new dasher and all the players to API call

    // TODO Change screen to answer screen
      .then(round => this.setState({currentRound:round, currentScreen: "answer"}))
  }

  joinGame = (newScreen) => {
    API.hasGameStarted(this.state.gameId)
      .then(gameRounds => gameRounds.length === 0 ? alert("Not ready yet.") : this.setState({currentScreen: newScreen}))
  }

  submitAnswer = (answerText) => {
    // TODO Fetch to API with answerText, currentRound, player
    API.submitAnswer(answerText, this.state.currentRound.id, this.state.player.id)
      .then(this.setState({currentScreen: "answer-waiting"}))
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
