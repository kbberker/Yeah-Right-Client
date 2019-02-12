import React, { Component } from 'react'

import HomeScreen from "./components/HomeScreen"
import CreateScreen from "./components/CreateScreen"
import JoinScreen from "./components/JoinScreen"
import WaitingScreen from "./components/WaitingScreen"
import AnswerScreen from "./components/AnswerScreen"
import AnswerWaitingScreen from "./components/AnswerWaitingScreen"
import VotingScreen from "./components/VotingScreen"
import API from './API'

class App extends Component {
  state={
    currentScreen: "home", // ! default should be "home"
    gameScreens: ["home", "create", "waiting"],
    gamesPlayers: [],
    game: {},
    currentRound: {},
    player: {},
    answers: [],
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
        return (<CreateScreen createGame={this.createGame} changeGameScreenToWaiting={this.changeGameScreenToWaiting}/>)
      case "join":
        return (<JoinScreen createGame={this.createGame} changeGameScreenToWaiting={this.changeGameScreenToWaiting}/>)
      case "waiting":
        return (<WaitingScreen gameId={this.state.game.id} startGame={this.startGame} joinGame={this.joinGame}/>)
      case "answer":
        return (<AnswerScreen submitAnswer={this.submitAnswer}/>)
      case "answer-waiting":
        return (<AnswerWaitingScreen submitAnswer={this.submitAnswer} currentRoundId={this.state.currentRound.id} renderVotingScreen={this.renderVotingScreen}/>)        
      case "voting":
        return (<VotingScreen answers={this.state.answers} players={this.state.gamesPlayers}/>)
      default:
        break;
    }
  }

  changeGameScreenState = (nextScreen) => {
    this.setState({currentScreen: nextScreen})
  }

  changeGameScreenToWaiting = (game, player) => {
    this.setState({
      currentScreen: "waiting",
      game: game,
      player: player
    })
  }

  createGame = (playerName, gameName) => {
    API.createPlayerAndJoinGame(playerName, gameName)
  }

  startGame = () => {
    API.createNewRound(this.state.game.id)
  }

  joinGame = (gameRound, players) => {
    debugger
    this.setState({ 
      currentScreen: "answer", 
      currentRound: gameRound, 
      gamesPlayers: players
    })
  }

  submitAnswer = (answerText) => {
    API.submitAnswer(answerText, this.state.currentRound.id, this.state.player.id)
      .then(this.setState({currentScreen: "answer-waiting"}))
  }

  renderVotingScreen = (roundsAnswers) => {
    // TODO Set state.answers from AnswerWaitingScreen
    // TODO Change currentScreen to voting
    // TODO Make sure answers and players are sent as props to VotingScreen
    this.setState({
      answers: roundsAnswers,
      currentScreen: "voting"
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
