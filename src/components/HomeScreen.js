import React, { Component, Fragment } from 'react'
import { Button, Container, Media, Col } from 'reactstrap';



class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <div className="content">
          <Button
            outline
            color="primary"
            onClick={() => this.props.createOrJoin("create")}
            size="lg"
            className="button"
          >
            CREATE GAME
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => this.props.createOrJoin("join")}
            size="lg"
            className="button"
          >
            JOIN GAME
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default HomeScreen;