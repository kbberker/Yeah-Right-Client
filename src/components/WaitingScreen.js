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
  }

  componentWillUnmount() {
    clearInterval(this.interval)
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
        <Button
          outline
          color="primary"
          onClick={() => this.props.joinGame()}
        >
          IS GAME READY?
        </Button>
      </div>
    )
  }
}

export default WaitingScreen;