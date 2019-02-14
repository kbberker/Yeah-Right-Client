import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import API from '../API'


class WaitingScreen extends Component {
  state={
    firstPlayerJoined: {},
    playersInGame: [],
  }

  componentDidMount() {
    // API.getPlayersInGame(this.props.gameId)
    //   .then(players => this.setState({playersInGame: players}))
    this.interval = setInterval(() => {
      console.log("Getting players")
      this.updatePlayerList()
    }, 1000)
    this.checkGameStarted = setInterval(() => {
      console.log("Has game started?")
      this.props.joinGame()
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.checkGameStarted)
  }

  updatePlayerList = () => {
    API.getPlayersInGame(this.props.gameId)
      .then(players => this.setState({ playersInGame: players }))
  }

  renderPlayers = () => {
    return this.state.playersInGame.map(player => {
      return <ListGroupItem>{player.name}</ListGroupItem>
    })
  }

  render() { 
    return (
      <div>
        <ListGroup>
          {this.renderPlayers()}
        </ListGroup>
        <Button
          outline
          color="primary"
          onClick={() => this.props.startGame()}
        >
          START GAME
        </Button>
      </div>
    )
  }
}

export default WaitingScreen;