import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import API from '../API';


class AnswerWaitingScreen extends Component {
  state = {
    answers: [],
    players: [],
  }

  pollPlayersWhoveAnswered = ''

  componentDidMount() {
    const { currentRoundId } = this.props;
    API.getRoundAnswers(currentRoundId)
      .then((round) => {
        this.setState({ answers: round.answers, players: round.players });
      });
  }

  updatePlayersWhoveAnswered = () => {
    const { currentRoundId } = this.props;
    API.getRoundAnswers(currentRoundId)
      .then((round) => this.setState({ answers: round.answers, players: round.players }));
  }

  renderHowManyPlayersAnswered = () => {
    const { answers, players } = this.state;
    console.log({ renderHowManyPlayersAnswered: this.state });
    if (answers.length !== players.length) {
      if (answers.length === 1) {
        return (
          <>
            <h2>
              {answers.length}
              {' '}
              PLAYER HAS ANSWERED.
            </h2>
            <h2>
              STILL WAITING FOR
              {' '}
              {players.length - answers.length}
              {' '}
              TO
              ANSWER!
            </h2>
          </>
        );
      }

      return (
        <>
          <h2>
            {answers.length}
            {' '}
            PLAYER HAVE ANSWERED.
          </h2>
          <h2>
            STILL WAITING FOR
            {' '}
            {players.length - answers.length}
            {' '}
            TO
            ANSWER!
          </h2>
        </>
      );
    } if (answers.length === players.length && answers.length > 0) {
      return <h5>EVERYONE HAS ANSWERED!</h5>;
    }
  }

  render() {
    const { answers, players } = this.state;
    if (answers.length !== players.length && players.length > 0) {
      setTimeout(this.updatePlayersWhoveAnswered, 100);
    }
    return (
      <div className="content">
        <>{this.renderHowManyPlayersAnswered()}</>
        {answers.length === players.length
          ? (this.props.isDasher
            ? (
              <Button
                outline
                className="button"
                color="primary"
                onClick={() => this.props.renderVotingScreen(this.state.answers)}
              >
                SEE ANSWERS
              </Button>
            )
            : (
              <div className="content">
                <h5>Which answer do you think is the truth?</h5>
                <Button
                  outline
                  className="button"
                  color="primary"
                  onClick={() => this.props.joinGame()}
                >
                  Join New Round
                </Button>
              </div>
            )
          )
          : null}
      </div>
    );
  }
}

AnswerWaitingScreen.defaultProps = {
  currentRoundId: null,
};

AnswerWaitingScreen.propTypes = {
  currentRoundId: PropTypes.number,
};

export default AnswerWaitingScreen;
