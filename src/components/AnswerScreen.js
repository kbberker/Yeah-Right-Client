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
    return (
      <Fragment>
        <Form>
          <FormGroup>
            <Label for="playerAnswer">Enter Your Answer Here:</Label>
            <Input type="text" name="playerAnswer" id="playerAnswer" onChange={this.handlePlayerAnswerInputChange} />
          </FormGroup>
        </Form>
        <Button outline color="primary" onClick={() => this.props.submitAnswer(playerAnswerInput)}>SUBMIT ANSWER</Button>
      </Fragment>
    )
  }

}

export default AnswerScreen;