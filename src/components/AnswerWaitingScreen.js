import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';
import API from '../API'


class AnswerWaitingScreen extends Component {
  state = {
    answers: [],
    players: [],
    message: "",
  }

  pollPlayersWhoveAnswered = ""

  componentDidMount() {
    API.getRoundAnswers(this.props.currentRoundId)
      .then(round => {
        this.setState({ answers: round.answers, players: round.players })
      })
  }

  updatePlayersWhoveAnswered = () => {
    console.log("Getting players who've answered...")
    API.getRoundAnswers(this.props.currentRoundId)
      .then(round => this.setState({ answers: round.answers, players: round.players }))
  }

  renderHowManyPlayersAnswered = () => {
    const { answers, players } = this.state
    console.log({"renderHowManyPlayersAnswered": this.state})
    if (answers.length !== players.length) {
      if (answers.length === 1) {
        return (
          <Fragment>
            <h2>{answers.length} PLAYER HAS ANSWERED.</h2>
            <h2>
              STILL WAITING FOR {players.length - answers.length} TO
              ANSWER!
            </h2>
          </Fragment>
        )
      } 
      else {
        return (
          <Fragment>
            <h2>{answers.length} PLAYER HAVE ANSWERED.</h2>
            <h2>
              STILL WAITING FOR {players.length - answers.length} TO
              ANSWER!
            </h2>
          </Fragment>
        )
      }
    } else if (answers.length === players.length && answers.length > 0) {
      return <Fragment>EVERYONE HAS ANSWERED!</Fragment>
    }
  }

  render() {
    const { answers, players } = this.state
    console.log({"AnswerWaiting render()": this.state})
    if (answers.length !== players.length && players.length > 0) {
      setTimeout(this.updatePlayersWhoveAnswered, 1000)
    } 
    return (
      <div className="content">
        <Fragment>{this.renderHowManyPlayersAnswered()}</Fragment>
        {answers.length === players.length
          ? (this.props.isDasher 
            ? <Button
                outline
                color="primary"
                onClick={() => this.props.renderVotingScreen(this.state.answers)}
              >
              SEE ANSWERS
              </Button>
            : <div>
                <h5>Which answer do you think is the truth?</h5> 
                <Button outline color="primary" onClick={() => this.props.joinGame()}>Join New Round</Button>
              </div>
            )
          : null 
        }
      </div>
    )
  }
}

export default AnswerWaitingScreen;