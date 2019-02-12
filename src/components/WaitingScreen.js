import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { ActionCableConsumer } from 'react-actioncable-provider';

import API from '../API'
import Cable from './Cable'


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

  handleReceivedGame = (response, gameId, joinGame) => {
    const { game } = response
    if (game.id === gameId && game.rounds.length === 0) {
      this.setState({ playersInGame: game.players })    
    } else if (game.id === gameId && game.rounds.length >= 1) {
      joinGame(game.rounds[game.rounds.length - 1], game.players)
    }
  }

  handleReceivedRound = (response, gameId, joinGame) => {
    const { round } = response
    console.log(round)
    if (round.game_id === gameId) {
      joinGame(round, round.players)
    } 
  }

  render() { 
    return (
      <div>
        <ActionCableConsumer
          channel='GamesChannel'
          onReceived={(response) => this.handleReceivedGame(response, this.props.gameId, this.props.joinGame)}
        />
        <ActionCableConsumer
          channel="RoundsChannel"
          onReceived={(response) => this.handleReceivedRound(response, this.props.gameId, this.props.joinGame)}
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