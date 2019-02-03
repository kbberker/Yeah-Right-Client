import React, { Component,Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import API from '../API'



class JoinScreen extends Component {
  state = {
    playerNameInput: ""
  }

  handlePlayerNameInputChange = (e) => {
    this.setState({ playerNameInput: e.target.value })
  }


  renderGameNameButtons = () => {

  }

  render() { 
    return (
      <Fragment>
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange} />
          </FormGroup>
        </Form>
        {this.state.playerNameInput === ""
          ? "Enter your name and available games will appear below"
          : this.renderGameNameButtons()}
      </Fragment>
    )
  }
}

export default JoinScreen;