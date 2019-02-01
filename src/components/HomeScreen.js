import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';


class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <Button outline color="primary">CREATE GAME</Button>
        <Button outline color="primary">JOIN GAME</Button>
      </Fragment>
    )
  }
}
 
export default HomeScreen;