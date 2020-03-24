import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


class HomeScreen extends Component {
  state={}


  render() {
    const { createOrJoin } = this.props;
    return (
      <>
        <div className="content">
          <Button
            outline
            color="primary"
            onClick={() => createOrJoin('create')}
            size="lg"
            className="button"
          >
            CREATE GAME
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => createOrJoin('join')}
            size="lg"
            className="button"
          >
            JOIN GAME
          </Button>
        </div>
      </>
    );
  }
}

HomeScreen.defaultProps = {
  createOrJoin: () => null,
};

HomeScreen.propTypes = {
  createOrJoin: PropTypes.func,
};

export default HomeScreen;
