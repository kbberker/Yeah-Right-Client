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
    currentDasher: {},
    currentRound: {},
    currentScreen: "home",
    game: {}, 
    gamesPlayers: [],
    player: {},
    answers: [],
  }

  componentDidUpdate() {
    console.log({"componentDidUpdate before setGameScreen": this.state.currentScreen})
    this.setGameScreen()
  }

  setGameScreen = () => {
    const { currentDasher, player } = this.state
    // ? Might be better to change this based on an argument then state
    switch (this.state.currentScreen) {
      case "home":
        return (<HomeScreen createOrJoin={this.changeGameScreenState}/>)
      case "create":
        return(<CreateScreen createGame={this.createGame}/>)
      case "join":
        return(<JoinScreen createGame={this.createGame}/>)
      case "waiting":
        return (<WaitingScreen gameId={this.state.game.id} startGame={this.startGame} joinGame={this.joinGame}/>)
      case "answer":
        return currentDasher.id === player.id 
        ? (<AnswerScreen submitAnswer={this.submitAnswer} isDasher={true}/>)
        : (<AnswerScreen submitAnswer={this.submitAnswer} isDasher={false}/>)
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

  createGame = (playerName, gameName) => {
    API.createPlayerAndJoinGame(playerName, gameName)
      .then(player => {
        this.setState({game: player.game, player: player, currentScreen: "waiting"})
      })
  }

  startGame = () => {
    API.createNewRound(this.state.game.id)
    .then(round => {
      console.log({"App.startGame round returned": round})
      const newDasher = round.players[Math.floor(Math.random()*round.players.length)]
      this.setState({currentRound:round, currentScreen: "answer"})
      return newDasher
    })
      .then(newDasher => API.setDasher(newDasher))
      .then(resp => {
        debugger
        this.setState({
          currentDasher: resp.new_dasher,
          gamesPlayers: [...resp.non_dashers, resp.new_dasher]
        })
      })
  }

  joinGame = () => {
    API.hasGameStarted(this.state.game.id)
      .then(gameRounds => {
        debugger
        gameRounds.length === 0 
          ? alert("Not ready yet.") 
          : this.setState({
            currentScreen: "answer", 
            currentRound: gameRounds[gameRounds.length - 1], 
            gamesPlayers: gameRounds[gameRounds.length - 1].players,
            currentDasher: gameRounds[gameRounds.length - 1].players.filter(player => player.is_dasher === true)[0]
          })
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
