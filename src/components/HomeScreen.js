import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';


class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <Button 
          outline 
          color="primary" 
          onClick={() => this.props.createOrJoin("create")}
        >
          CREATE GAME
        </Button>
        <Button 
          outline 
          color="primary"
          onClick={() => this.props.createOrJoin("join")}
        >
          JOIN GAME
        </Button>
      </Fragment>
    )
  }
}
 
export default HomeScreen;