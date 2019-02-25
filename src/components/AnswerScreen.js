import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


class AnswerScreen extends Component {
  state = {
    playerAnswerInput: "",
  }


  handlePlayerAnswerInputChange = (e) => {
    this.setState({ playerAnswerInput: e.target.value })
  }

  handleGameNameInputChange = (e) => {
    this.setState({ gameNameInput: e.target.value })
  }

  render() {
    let { playerAnswerInput } = this.state
    const { isDasher } = this.props
    return (
      <div className="home">
        {
          // maybe just isDasher && <h4>You're the Dasher</h4>
          isDasher 
          ? <h4>You're the Dasher</h4>
          : null
        }
        <Form>
          <FormGroup>
            {
              isDasher 
              ? <Label for="playerAnswer">Enter the Real Answer Here:</Label>
              : <Label for="playerAnswer">Enter Your Answer Here:</Label>
            }
            <Input type="text" name="playerAnswer" id="playerAnswer" onChange={this.handlePlayerAnswerInputChange} />
          </FormGroup>
        </Form>
        <Button 
          outline 
          color="primary" 
          className="button"
          onClick={() => this.props.submitAnswer(playerAnswerInput)}
        >
          SUBMIT ANSWER
        </Button>
      </div>
    )
  }

}

export default AnswerScreen;