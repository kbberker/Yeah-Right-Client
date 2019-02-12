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
      return `${answers.length} PLAYERS HAVE ANSWERED. STILL WAITING FOR ${players.length - answers.length} TO ANSWER!`
    } else if (answers.length === players.length && answers.length > 0) {
      return `EVERYONE HAS ANSWERED!`
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
        <h1>Answer Waiting Screen</h1>
        <h2>{this.renderHowManyPlayersAnswered()}</h2>
        <Button
          outline
          color="primary"
          onClick={() => this.updatePlayersWhoveAnswered()}
        >
          HAS EVERYONE ANSWERED?
        </Button>
        {answers.length === players.length
          ? <Button
            outline
            color="primary"
            onClick={() => this.props.renderVotingScreen(this.state.answers)}
          >
          SEE ANSWERS
          </Button>
          : null
        }
      </div>
    )
  }
}

export default AnswerWaitingScreen;