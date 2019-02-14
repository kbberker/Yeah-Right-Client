import React, { Component } from 'react'
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
      return <h4>{answers.length} PLAYERS HAVE ANSWERED. STILL WAITING FOR {players.length - answers.length} TO ANSWER!</h4>
    } else if (answers.length === players.length && answers.length > 0) {
      return <h4>EVERYONE HAS ANSWERED!</h4>
    }
  }

  render() {
    const { answers, players } = this.state
    console.log({"AnswerWaiting render()": this.state})
    if (answers.length !== players.length && players.length > 0) {
      setTimeout(this.updatePlayersWhoveAnswered, 1000)
    } 
    return (
      <div>
        <h2>{this.renderHowManyPlayersAnswered()}</h2>
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