import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionCableConsumer } from 'react-actioncable-provider';
import API from '../API'



class JoinScreen extends Component {
  state = {
    playerNameInput: "",
    listOfGames: [],
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

  handleReceivedGame = response => {
    const { game } = response;
    this.setState({
      listOfGames: [...this.state.listOfGames, game]
    });
  };

  // TODO Add button which refreshes game
  renderGameButtons = () => {
    return this.state.listOfGames.map(game => {
      return <Button 
        outline color="primary" 
        key={game.id}
        onClick={() => this.props.createGame(this.state.playerNameInput, game.name)}
        >
        "{game.name}"
      </Button>
    })
  }

  render() {
    const { listOfGames } = this.state
    return (
      <Fragment>
        <ActionCableConsumer
          channel='GamesChannel'
          onReceived={this.handleReceivedGame}
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