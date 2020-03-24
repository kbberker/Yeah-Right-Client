import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Form, FormGroup, Label, Input,
} from 'reactstrap';
import API from '../API';


class JoinScreen extends Component {
  state = {
    playerNameInput: '',
    listOfGames: [],
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getListOfGames();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePlayerNameInputChange = (e) => {
    this.setState({ playerNameInput: e.target.value });
  }

  getListOfGames = () => {
    API.getListOfGames()
      .then((listOfGames) => this.setState({ listOfGames }));
  }

  renderGameButtons = () => {
    const { listOfGames, playerNameInput } = this.state;
    const { createGame } = this.props;
    listOfGames.map((game) => (
      <Button
        outline
        color="primary"
        key={game.id}
        onClick={() => createGame(playerNameInput, game.name)}
      >
        {game.name}
      </Button>
    ));
  }

  renderGameList = () => (
    <ButtonGroup vertical>
      {this.renderGameButtons()}
    </ButtonGroup>
  )

  render() {
    const { playerNameInput } = this.state;
    return (
      <div className="content">
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange} />
          </FormGroup>
        </Form>
        {playerNameInput === ''
          ? <h6>Enter your name and available games will appear below</h6>
          : this.renderGameList()}
      </div>
    );
  }
}

JoinScreen.defaultProps = {
  createGame: () => null,
};

JoinScreen.propTypes = {
  createGame: PropTypes.func,
};

export default JoinScreen;
