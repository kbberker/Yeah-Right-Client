import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import API from '../API';


class WaitingScreen extends Component {
  state={
    playersInGame: [],
  }

  componentDidMount() {
    const { joinGame } = this.props;
    this.interval = setInterval(() => {
      this.updatePlayerList();
    }, 500);
    this.checkGameStarted = setInterval(() => {
      joinGame();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.checkGameStarted);
  }

  updatePlayerList = () => {
    const { gameId } = this.props;
    API.getPlayersInGame(gameId)
      .then((players) => this.setState({ playersInGame: players }));
  }

  renderPlayers = () => {
    const { playersInGame } = this.state;
    playersInGame.map((player) => <ListGroupItem>{player.name}</ListGroupItem>);
  }

  render() {
    const { startGame } = this.props;
    return (
      <div className="content">
        <ListGroup>
          {this.renderPlayers()}
        </ListGroup>
        <Button
          outline
          color="primary"
          className="button"
          onClick={() => startGame()}
        >
          START GAME
        </Button>
      </div>
    );
  }
}

WaitingScreen.defaultProps = {
  gameId: false,
  startGame: () => null,
  joinGame: () => null,
};

WaitingScreen.propTypes = {
  gameId: PropTypes.number,
  startGame: PropTypes.func,
  joinGame: PropTypes.func,
};

export default WaitingScreen;
