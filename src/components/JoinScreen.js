import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import API from '../API'



class JoinScreen extends Component {
  state = {
    playerNameInput: "",
    listOfGames: [],
    chosenGame: "",
    playerName: "",
  }

  componentDidMount() {
    // TODO Add a ternary which checks to see if game already is in the list
    API.getListOfGames()
      .then(listOfGames => {
        const newListOfGames = [...this.state.listOfGames, ...listOfGames]
        this.setState({ listOfGames: newListOfGames })
      })
  }

  getGameNames = () => {
    API.getListOfGames()
      .then(listOfGames => this.renderGameButtons(listOfGames))
  }


  handlePlayerNameInputChange = (e) => {
    this.setState({ playerNameInput: e.target.value })
  }

  handleReceivedGame = (response, changeToWaiting) => {
    const { game } = response
    const { playerName, chosenGame } = this.state
    const playersInGame = response.game.players.filter(player => (player.name === playerName))
    debugger
    if (game.name === chosenGame.name && playersInGame.length !== 0) {
      changeToWaiting(game, playersInGame[0])
    }
  };

  // TODO Add button which refreshes game
  renderGameButtons = () => {
    return this.state.listOfGames.map(game => {
      return <Button 
        outline color="primary" 
        key={game.id}
        onClick={() => {
          this.setState({ chosenGame: game, playerName: this.state.playerNameInput})
          this.props.createGame(this.state.playerNameInput, game.name)
        }}
        >
        {game.name}
      </Button>
    })
  }

  render() {
    const { listOfGames } = this.state
    return (
      <Fragment>
        <ActionCableConsumer
          channel='GamesChannel'
          onReceived={(response) => this.handleReceivedGame(response, this.props.changeGameScreenToWaiting)}
        />
        {this.state.listOfGames.length
          ? null
          : null}
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange} />
          </FormGroup>
        </Form>
        {this.state.playerNameInput === ""
          ? "Enter your name and available games will appear below"
          : this.renderGameButtons()}
      </Fragment>
    )
  }
}

export default JoinScreen;