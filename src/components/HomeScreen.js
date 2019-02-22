import React, { Component, Fragment } from 'react'
import { Button, Container, Media, Col } from 'reactstrap';



class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <div className="home">
          <Button
            outline
            color="primary"
            onClick={() => this.props.createOrJoin("create")}
            size="lg"
            className="button"
          >
            CREATE GAME
          </Button>
          <div style={{marginTop: "10%"}}></div>
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