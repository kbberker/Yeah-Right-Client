import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { ActionCableConsumer } from 'react-actioncable-provider';

import API from '../API'


class WaitingScreen extends Component {
  state={
    firstPlayerJoined: {},
    playersInGame: [],
  }

  componentDidMount() {
    API.getPlayersInGame(this.props.gameId)
      .then(players => this.setState({playersInGame: players}))
  }

  updatePlayerList = () => {
    API.getPlayersInGame(this.props.gameId)
      .then(players => this.setState({ playersInGame: players }))
  }

  renderPlayers = () => {
    return this.state.playersInGame.map(player => <ListGroupItem>{player.name}</ListGroupItem>)
  }

  handleReceivedGame = (response, gameId) => {
    const { game } = response
    // const { playerName, chosenGame } = this.state
    // const playersInGame = response.game.players.filter(player => (player.name === playerName))
    // debugger
    if (game.id === gameId) {
      this.setState({ playersInGame: game.players })    }
  };

  render() { 
    return (
      <div>
        <ActionCableConsumer
          channel='GamesChannel'
          onReceived={(response) => this.handleReceivedGame(response, this.props.gameId)}
        />
        <ListGroup>
          {this.renderPlayers()}
        </ListGroup>
        <Button
          outline
          color="primary"
          onClick={() => this.props.startGame("answer", this.state.playersInGame)}
        >
          START GAME
        </Button>
        <Button
          outline
          color="primary"
          onClick={() => this.props.joinGame("answer")}
        >
          IS GAME READY?
        </Button>
      </div>
    )
  }
}

export default WaitingScreen;