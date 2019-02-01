import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


class CreateScreen extends Component {
  state = {}

  createGame = () => {

  }

  render() {
    return (
      <Fragment>
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye West" />
          </FormGroup>
          <FormGroup>
            <Label for="gameName">Game Name:</Label>
            <Input type="text" name="gameName" id="gameName" placeholder="West Mansion" />
          </FormGroup>
          <Button outline color="primary" onSubmit={() => this.createGame()}>CREATE GAME</Button>
        </Form>
      </Fragment>
    )
  }
}

export default CreateScreen;