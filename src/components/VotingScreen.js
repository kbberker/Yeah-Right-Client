import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';


// TODO Show a list of answers with a button next to it
  // TODO When button is pressed a modal appears with tickboxes for all players in game
    // TODO A tick will signify a player voted for a particular answer


class VotingScreen extends Component {
  state={
    answers: [],
    showVoteScreen: false,
    answerToVoteOn: {},
  }

  componentDidMount() {
    this.shuffleAnswersArray()
  }

  shuffleAnswersArray = () => {
    let { answers } = this.props
    let copyOfAnswers = answers.slice(0)
    debugger
    let ctr = copyOfAnswers.length
    let temp
    let index

    while (ctr > 0){
      index = Math.floor(Math.random() * ctr)
      ctr--
      temp = copyOfAnswers[ctr]
      copyOfAnswers[ctr] = copyOfAnswers[index]
      copyOfAnswers[index] = temp
    }
    debugger
    this.setState({answers: copyOfAnswers})
  }

  renderAnswers = () => {
    return this.state.answers.map(answer => {
      return (<Fragment>
        <p>{answer.text}</p> 
        <Button color="primary" onClick={() => this.toggleAddVotesToAnswerScreen(answer)}>primary</Button>
      </Fragment>)
    })
  }

  renderAnswerVotes = () => {
    return this.state.answers.map(answer => {
      return <Fragment>
        <p>{answer.text}</p>
        <Button color="primary" onClick={() => this.toggleAddVotesToAnswerScreen(answer)}>primary</Button>
      </Fragment>
    })
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