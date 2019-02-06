import React, { Component } from 'react'
import { Button } from 'reactstrap';
import API from '../API'


class AnswerWaitingScreen extends Component {
  state = {
    answers: [],
    players: [],
    message: "",
  }

  componentDidMount() {
    // // TODO Get answers from API based on current round
    // // TODO Puts answers into this.state.answers
    API.getRoundAnswers(this.props.currentRoundId)
      .then(round => {
        debugger
        this.setState({ answers: round.answers, players: round.players })
      })
  }

  updatePlayersWhoveAnswered = () => {
    API.getRoundAnswers(this.props.currentRoundId)
      .then(round => this.setState({ answers: round.answers, players: round.players }))
  }

  renderHowManyPlayersAnswered = () => {
    const { answers, players } = this.state
    console.log({"renderHowManyPlayersAnswered": this.state})
    if (answers.length !== players.length) {
      return `${answers.length} PLAYERS HAVE ANSWERED. STILL WAITING FOR ${players.length - answers.length} TO ANSWER!`
    } else if (answers.length === players.length) {
      return `EVERYONE HAS ANSWERED!`
    }
  }

  render() {
    console.log({"AnswerWaiting render()": this.state})
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
        {this.state.answers.length === this.state.players.length 
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