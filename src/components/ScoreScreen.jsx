import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, ListGroup, ListGroupItem,
} from 'reactstrap';

// TODO MAKE SAME AS VOTING SCREEN

class ScoreScreen extends Component {
  state = {
    answers: [],
    players: [],
    currentDasher: {},
    pickNewDasher: false,
  }

  componentDidMount() {
    const { answers, players, currentDasher } = this.props;
    this.setState({
      answers,
      players,
      currentDasher,
    });
  }

  onRadioBtnClick(player) {
    this.setState({ nextDasher: player });
  }

  renderPickNewDasher = () => {
    const { players, nextDasher } = this.state;
    const { pickNewDasher } = this.props;
    return (
      <>
        <h6>Pick the player on your left to be the next dasher!</h6>
        <ButtonGroup vertical>
          {
            players.map((player) => (
              <>
                <Button
                  outline
                  color="primary"
                  onClick={() => this.onRadioBtnClick(player)}
                  active={nextDasher === player}
                >
                  {player.name}
                </Button>
              </>
            ))
          }
        </ButtonGroup>
        {console.log(this.props)}
        <Button
          color="secondary"
          onClick={() => pickNewDasher(nextDasher)}
        >
          Confirm New Dasher
        </Button>
        <Button
          color="secondary"
          onClick={() => this.togglePickNewDasher()}
        >
          Go Back To Scores
        </Button>
      </>
    );
  }

  renderAnswerList = () => (
    <ListGroup>
      {this.renderAnswers()}
    </ListGroup>
  )

  renderAnswers = () => {
    const { answers, currentDasher, players } = this.state;
    return answers.map((answer) => {
      if (answer.player_id !== currentDasher.id) {
        const player = players.find((aPlayer) => aPlayer.id === answer.player_id);
        return (
          <ListGroupItem className="score-list-item">
            <p className="score-name">{`${answer.player.name}`}</p>
            <p className="score-answer">{answer.text}</p>
            <p className="score-points">{`${player.roundScore}`}</p>
          </ListGroupItem>
        );
      }
      return (
        <ListGroupItem className="score-list-item">
          <p className="score-name">{`${answer.player.name}`}</p>
          <p className="score-answer">{answer.text}</p>
          <p className="score-points">{`${currentDasher.roundScore}`}</p>
        </ListGroupItem>
      );
    });
  }

  togglePickNewDasher = () => {
    const { pickNewDasher } = this.state;
    this.setState({
      pickNewDasher: !pickNewDasher,
    });
  }

  render() {
    const { pickNewDasher } = this.state;
    return (
      <div className="content">
        {
          pickNewDasher === false
            ? this.renderAnswerList()
            : this.renderPickNewDasher()
        }
        {
          pickNewDasher === false
            ? (
              <Button
                color="secondary"
                onClick={() => this.togglePickNewDasher()}
              >
                Pick New Dasher
              </Button>
            )
            : console.log("Don't")
        }
      </div>
    );
  }
}

ScoreScreen.defaultProps = {
  answers: false,
  players: () => null,
  currentDasher: null,
  pickNewDasher: () => null,
};

ScoreScreen.propTypes = {
  answers: PropTypes.arrayOf,
  players: PropTypes.func,
  currentDasher: PropTypes.string,
  pickNewDasher: PropTypes.func,
};

export default ScoreScreen;
