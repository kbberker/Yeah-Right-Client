import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import {
  Button, ButtonGroup, ListGroup, ListGroupItem, Badge,
} from 'reactstrap';
import plusbtn from '../images/plus-button.svg';


// TODO Show a list of answers with a button next to it
// TODO When button is pressed a modal appears with tick boxes for all players in game
// TODO A tick will signify a player voted for a particular answer


class VotingScreen extends Component {
  state={
    answers: [],
    showVoteScreen: false,
    answerToVoteOn: {},
    votes: {},
    players: [],
  }

  componentDidMount() {
    this.shuffleAnswersArray();
  }

  shuffleAnswersArray = () => {
    const { answers, players } = this.props;
    const copyOfAnswers = answers.slice(0);
    let ctr = copyOfAnswers.length;
    let temp;
    let index;
    const votes = {};

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr -= 1;
      temp = copyOfAnswers[ctr];
      copyOfAnswers[ctr] = copyOfAnswers[index];
      copyOfAnswers[index] = temp;
    }

    copyOfAnswers.map((answer) => {
      votes[answer.id] = [];
    });

    this.setState({
      answers: copyOfAnswers,
      votes,
      players,
    });
  }


  renderAnswers = () => {
    const { answers, votes } = this.state;
    answers.map((answer) => (
      <ListGroupItem className="answer-list-item">
        <Badge pill>
          {' '}
          {votes[answer.id].length}
        </Badge>
        <p>{`${answer.text} `}</p>
        <input
          type="image"
          src={plusbtn}
          alt="add vote"
          className="voting-button"
          onClick={() => this.toggleAddVotesToAnswerScreen(answer)}
          onKeyPress={() => this.toggleAddVotesToAnswerScreen(answer)}
        />
      </ListGroupItem>
    ));
  }

  renderAnswerList = () => (
    <ListGroup>
      {this.renderAnswers()}
    </ListGroup>
  )

  renderAnswerVotes = () => {
    const { answerToVoteOn } = this.state;
      <>
        <h6>
          Votes for:
          {' '}
          {`${this.state.answerToVoteOn.text}`}
        </h6>
        <ButtonGroup>
          {this.state.players.map((player) => (
            <>
              <Button
                outline
                color="primary"
                onClick={() => this.onCheckboxBtnClick(player)}
                active={this.state.votes[this.state.answerToVoteOn.id].includes(player)}
              >
                {player.name}
              </Button>
            </>
          ))}
        </ButtonGroup>
        <Button color="secondary" onClick={() => this.toggleAddVotesToAnswerScreen(this.state.answerToVoteOn)}>Go Back To Answers</Button>
      </>;
  };

  onCheckboxBtnClick = (selectedPlayer) => {
    const { answerToVoteOn, votes } = this.state;
    const index = votes[answerToVoteOn.id].indexOf(selectedPlayer);
    if (index < 0) {
      votes[answerToVoteOn.id].push(selectedPlayer);
    } else {
      votes[answerToVoteOn.id].splice(index, 1);
    }
    this.setState({ votes: { ...votes, [answerToVoteOn.id]: votes[answerToVoteOn.id] } });
  }

  toggleAddVotesToAnswerScreen = (answer) => {
    const { showVoteScreen } = this.state;
    this.setState({
      answerToVoteOn: answer,
      showVoteScreen: !showVoteScreen,
    });
  }


  render() {
    const { showVoteScreen, votes } = this.state;
    const { calculateScores } = this.props;
    return (
      <div className="content">
        <h4>ANSWERS ARE IN!</h4>
        <p>Read them out and then add player&apos;s votes to the answer</p>
        {showVoteScreen === false ? this.renderAnswerList() : this.renderAnswerVotes()}
        {showVoteScreen === false
          ? (
            <Button
              color="secondary"
              onClick={() => calculateScores(votes)}
            >
              SHOW SCORES
            </Button>
          )
          : console.log("Don't show button")}
      </div>
    );
  }
}

VotingScreen.defaultProps = {
  answers: null,
  players: null,
  calculateScores: () => null,
};

VotingScreen.propTypes = {
  answers: PropTypes.arrayOf(string),
  players: PropTypes,
  calculateScores: PropTypes.func,
};

export default VotingScreen;
