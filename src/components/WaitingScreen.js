import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
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

  render() { 
    return (
      <div>
        <ListGroup>
          {this.renderPlayers()}
        </ListGroup>
        <Button
          outline
          color="primary"
          onClick={() => this.updatePlayerList()}
        >
          UPDATE PLAYER LIST
        </Button>
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