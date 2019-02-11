import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';



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

  handleReceivedGame = (response, props) => {
    const { game } = response;
    const { playerNameInput, gameNameInput } = this.state
    const playersInGame = response.game.players.filter(player => (player.name === playerNameInput))
    debugger
    if (game.name === gameNameInput && playersInGame.length !== 0) {
      props.changeGameScreenToWaiting(game, playersInGame[0])
    }

  };

  render() {
    let { playerNameInput, gameNameInput } = this.state
    return (
      <Fragment>
        <ActionCableConsumer
          channel='GamesChannel'
          onReceived={(response) => this.handleReceivedGame(response, this.props)}
        />
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
        <Button outline color="primary" onClick={() => this.props.createGame(playerNameInput, gameNameInput)}>CREATE GAME</Button>
      </Fragment>
    )
  }

}

export default CreateScreen;