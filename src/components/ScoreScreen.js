import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


class ScoreScreen extends Component {
  state = { 
    answers: [],
    players: [],
    currentDasher: {},
    pickNewDasher: false,
  }

  compn

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
      debugger
      if (answer.player_id !== currentDasher.id) {
        let player = players.find(aPlayer => {
          return aPlayer.id === answer.player_id
        })
        return (
          <Fragment>
            <p>{answer.text}</p>
            <Button color="secondary">{`${answer.player.name} ${player.roundScore}`}</Button>
          </Fragment>
        )
      } else {
        return (
          <Fragment>
            <p>{answer.text}</p>
            <Button color="primary">{`${answer.player.name} ${currentDasher.roundScore}`}</Button>
          </Fragment>
        )
      }
    })
  }

  renderPickNewDasher = () => {
    return (
      <Fragment>
        <h6>Pick the player on your left to be the next dasher!</h6>
        <ButtonGroup>
          {
            this.state.players.map(player => {
              return (
                <Fragment>
                  <Button
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
        <Button color="primary" onClick={() => this.props.togglePickNewDasher()}>Confirm New Dasher</Button>
        <Button color="secondary" onClick={() => this.togglePickNewDasher()}>Go Back To Scores</Button>
      </Fragment>
    )
  }

  onRadioBtnClick(player){
    this.setState({nextDasher: player})
  }

  togglePickNewDasher = () => {
    this.setState({
      pickNewDasher: !this.state.pickNewDasher
    })
  }

  render() { 
    return (
      <div>
        {
          this.state.pickNewDasher === false 
          ? (this.props.is_dasher
            ? 
              <Fragment>
                {this.renderAnswers()}
                <Button 
                  color="primary" 
                  onClick={() => this.togglePickNewDasher()}
                >
                  Pick New Dasher
                </Button>
              </Fragment>
            : this.renderAnswers()
          )
          : this.renderPickNewDasher()
        }
      </div>
    )
  }
}

export default ScoreScreen;