import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


// TODO Show a list of answers with a button next to it
  // TODO When button is pressed a modal appears with tickboxes for all players in game
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
    this.shuffleAnswersArray()
  }

  shuffleAnswersArray = () => {
    let { answers } = this.props
    let copyOfAnswers = answers.slice(0)
    let ctr = copyOfAnswers.length
    let temp
    let index
    let votes = {}

    while (ctr > 0){
      index = Math.floor(Math.random() * ctr)
      ctr--
      temp = copyOfAnswers[ctr]
      copyOfAnswers[ctr] = copyOfAnswers[index]
      copyOfAnswers[index] = temp
    }

    copyOfAnswers.map(answer => {
      votes[answer.id] = []
    })
    this.setState({
      answers: copyOfAnswers,
      votes: votes,
      players: this.props.players
    })
  }

  renderAnswers = () => {
    return this.state.answers.map(answer => {
      return (<Fragment>
        <p>{answer.text}</p> 
        <Button color="primary" onClick={() => this.toggleAddVotesToAnswerScreen(answer)}>Add Votes</Button>
      </Fragment>)
    })
  }

  renderAnswerVotes = () => {
    return(
      <Fragment>
        <h6>Votes for: "{`${this.state.answerToVoteOn.text}`}"</h6>
        <ButtonGroup>
          {this.state.players.map(player => {
          return <Fragment>
            <Button 
              color="primary" 
              onClick={() => this.onCheckboxBtnClick(player)} 
              active={this.state.votes[this.state.answerToVoteOn.id].includes(player)}>{player.name}</Button>
          </Fragment>
          })}
        </ButtonGroup>
        <Button color="secondary" onClick={() => this.toggleAddVotesToAnswerScreen(this.state.answerToVoteOn)}>Go Back To Answers</Button>
      </Fragment>
    )
  }

  onCheckboxBtnClick = (selectedPlayer) => {
    const { answerToVoteOn } = this.state
    const index = this.state.votes[answerToVoteOn.id].indexOf(selectedPlayer);
    if (index < 0) {
      this.state.votes[answerToVoteOn.id].push(selectedPlayer);
    } else {
      this.state.votes[answerToVoteOn.id].splice(index, 1);
    }
    this.setState({ votes: { ...this.state.votes, [answerToVoteOn.id]: this.state.votes[answerToVoteOn.id]}})
  }

  toggleAddVotesToAnswerScreen = (answer) => {
    this.setState({
      answerToVoteOn: answer,
      showVoteScreen: !this.state.showVoteScreen
    })
  }

  render() {
    return (
     <Fragment>
       <h4>Answers are in! Read them out and then add player's votes to the answer</h4>
       {this.state.showVoteScreen === false ? this.renderAnswers() : this.renderAnswerVotes()}
     </Fragment>
    )
  }
}
 
export default VotingScreen;