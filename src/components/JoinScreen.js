import React, { Component, Fragment } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap'
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

  renderGameButtons = () => {
    return this.state.listOfGames.map(game => {
      return (
      <Button 
        outline color="primary" 
        key={game.id}
        onClick={() => this.props.createGame(this.state.playerNameInput, game.name)}
        >
        {game.name}
      </Button>
      )
    })
  }

  renderGameList = () => {
    return(
      <ButtonGroup vertical>
        {this.renderGameButtons()}
      </ButtonGroup>
    )
  }

  render() {
    return (
      <div className="home">
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange} />
          </FormGroup>
        </Form>
        {this.state.playerNameInput === ""
          ? <h6>Enter your name and available games will appear below</h6>
          : this.renderGameList()}
      </div>
    )
  }
}

export default JoinScreen;