import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';


class AnswerScreen extends Component {
  state = {
    playerAnswerInput: '',
  }


  handlePlayerAnswerInputChange = (e) => {
    this.setState({ playerAnswerInput: e.target.value });
  }

  render() {
    const { playerAnswerInput } = this.state;
    const { isDasher, submitAnswer } = this.props;
    return (
      <div className="content">
        {
          // maybe just isDasher && <h4>You're the Dasher</h4>
          isDasher
            ? <h4>You are the Dasher</h4>
            : null
        }
        <Form>
          <FormGroup>
            {
              isDasher
                ? <Label for="playerAnswer">Enter the Real Answer Here:</Label>
                : <Label for="playerAnswer">Enter Your Answer Here:</Label>
            }
            <Input type="text" name="playerAnswer" id="playerAnswer" onChange={this.handlePlayerAnswerInputChange} />
          </FormGroup>
        </Form>
        <Button
          outline
          color="primary"
          className="button"
          onClick={() => submitAnswer(playerAnswerInput)}
        >
          SUBMIT ANSWER
        </Button>
      </div>
    );
  }
}

AnswerScreen.defaultProps = {
  isDasher: false,
  submitAnswer: () => null,
};

AnswerScreen.propTypes = {
  isDasher: PropTypes.node,
  submitAnswer: PropTypes.func,
};

export default AnswerScreen;
