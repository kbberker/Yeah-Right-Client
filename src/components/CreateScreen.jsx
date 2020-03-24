import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';


class CreateScreen extends Component {
  state = {
    playerNameInput: '',
    gameNameInput: '',
  }


  handlePlayerNameInputChange = (e) => {
    this.setState({ playerNameInput: e.target.value });
  }

  handleGameNameInputChange = (e) => {
    this.setState({ gameNameInput: e.target.value });
  }

  render() {
    const { playerNameInput, gameNameInput } = this.state;
    const { createGame } = this.props;
    return (
      <div className="content">
        <Form>
          <FormGroup>
            <Label for="playerName">Your Name:</Label>
            <Input type="text" name="playerName" id="playerName" placeholder="Kanye" onChange={this.handlePlayerNameInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="gameName">Game Name:</Label>
            <Input type="text" name="gameName" id="gameName" placeholder="West Mansion" onChange={this.handleGameNameInputChange} />
          </FormGroup>
        </Form>
        <Button
          outline
          color="primary"
          className="button"
          onClick={() => createGame(playerNameInput, gameNameInput)}
        >
          CREATE GAME
        </Button>
      </div>
    );
  }
}

CreateScreen.defaultProps = {
  createGame: () => null,
};

CreateScreen.propTypes = {
  createGame: PropTypes.func,
};

export default CreateScreen;
