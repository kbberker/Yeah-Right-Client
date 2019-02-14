import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import API from '../API'



class JoinScreen extends Component {
  state = {
    playerNameInput: "",
    listOfGames: [],
  }

  componentDidMount() {
     this.interval = setInterval(() => {
      console.log("Getting games")
      this.getListOfGames()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handlePlayerNameInputChange = (e) => {
    this.setState({ playerNameInput: e.target.value })
  }


  getListOfGames = () => {
    API.getListOfGames()
      .then(listOfGames => this.setState({listOfGames: listOfGames}))
  }

  // TODO Add button which refreshes game
  renderGameButtons = () => {
    return this.state.listOfGames.map(game => {
      return <Button 
        outline color="primary" 
        key={game.id}
        onClick={() => this.props.createGame(this.state.playerNameInput, game.name)}
        >
        {game.name}
      </Button>
    })
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
          : this.renderGameButtons()}
      </Fragment>
    )
  }
}

export default JoinScreen;