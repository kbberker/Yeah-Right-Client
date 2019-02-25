import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'


class CreateScreen extends Component {
  state = {
    playerNameInput: "",
    gameNameInput: ""
  }


  handlePlayerNameInputChange = (e) => {
    this.setState({playerNameInput: e.target.value})
  }

  handleGameNameInputChange = (e) => {
    this.setState({gameNameInput: e.target.value})
  }

  render() {
    let { playerNameInput, gameNameInput } = this.state
    return (
      <div className="home">
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="gameName">Game Name:</Label>
            <Input type="text" name="gameName" id="gameName" placeholder="West Mansion" onChange={this.handleGameNameInputChange}/>
          </FormGroup>
        </Form>
        <Button 
          outline 
          color="primary" 
          className="button"
          onClick={() => this.props.createGame(playerNameInput, gameNameInput)}
        >
          CREATE GAME
        </Button>
      </div>
    )
  }

}

export default CreateScreen;