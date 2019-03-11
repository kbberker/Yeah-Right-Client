import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap';

// TODO MAKE SAME AS VOTING SCREEN

class ScoreScreen extends Component {
  state = {
    answers: [],
    players: [],
    currentDasher: {},
    pickNewDasher: false,
  }

  componentDidMount() {
    const { answers, players, currentDasher } = this.props
    this.setState({
      answers: answers,
      players: players,
      currentDasher: currentDasher
    })
  }

  renderAnswers = () => {
    const { answers, currentDasher, players } = this.state
    return answers.map(answer => {
      if (answer.player_id !== currentDasher.id) {
        let player = players.find(aPlayer => {
          return aPlayer.id === answer.player_id
        })
        return (
          <ListGroupItem className="score-list-item">
            <p className="score-name">{`${answer.player.name}`}</p>
            <p className="score-answer">{answer.text}</p>
            <p className="score-points">{`${player.roundScore}`}</p>
          </ListGroupItem>
        )
      } else {
        return (
          <ListGroupItem className="score-list-item">
            <p className="score-name">{`${answer.player.name}`}</p>
            <p className="score-answer">{answer.text}</p>
            <p className="score-points">{`${currentDasher.roundScore}`}</p>
          </ListGroupItem>
        )
      }
    })
  }

  renderAnswerList = () => {
    return (
      <ListGroup>
        {this.renderAnswers()}
      </ListGroup>
    )
  }

  renderPickNewDasher = () => {
    return (
      <Fragment>
        <h6>Pick the player on your left to be the next dasher!</h6>
        <ButtonGroup vertical>
          {
            this.state.players.map(player => {
              return (
                <Fragment>
                  <Button
                    outline
                    color="primary"
                    onClick={() => this.onRadioBtnClick(player)}
                    active={this.state.nextDasher === player}
                  >
                    {player.name}
                  </Button>
                </Fragment>
              )
            })
          }
        </ButtonGroup>
        {console.log(this.props)}
        <Button 
          color="secondary" 
          onClick={() => this.props.pickNewDasher(this.state.nextDasher)}
        >
          Confirm New Dasher
        </Button>
        <Button 
          color="secondary" 
          onClick={() => this.togglePickNewDasher()}
        >
          Go Back To Scores
        </Button>
      </Fragment>
    )
  }

  onRadioBtnClick(player) {
    this.setState({ nextDasher: player })
  }

  togglePickNewDasher = () => {
    this.setState({
      pickNewDasher: !this.state.pickNewDasher
    })
  }

  render() { 
    return (
      <div className="content">
        {
          this.state.pickNewDasher === false
            ? this.renderAnswerList() 
            : this.renderPickNewDasher()
        }
        {
          this.state.pickNewDasher === false
            ? 
              <Button
                color="secondary"
                onClick={() => this.togglePickNewDasher()}
              >
                Pick New Dasher
              </Button>
            : console.log("Don't")
        }
      </div>
    );
  }
}

export default ScoreScreen;