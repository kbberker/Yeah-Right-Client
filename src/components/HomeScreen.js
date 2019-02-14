import React, { Component, Fragment } from 'react'
import { Button, Container, Media, Col } from 'reactstrap';



class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <div style={{marginTop: "60%"}}>
          <Media object data-src="../images/yeah-right-logo.svg" />
          <Container>
              <Col xs="3"></Col>
              <Col xs="6">
                <Button
                  outline
                  color="primary"
                  onClick={() => this.props.createOrJoin("create")}
                  size="lg"
                  className="button"
                >
                  CREATE GAME
                </Button>
              </Col>
              <Col xs="3"></Col>
            <div style={{marginTop: "10%"}}></div>
              <Col xs="3"></Col>
              <Col xs="6">
                <Button
                  outline
                  color="primary"
                  onClick={() => this.props.createOrJoin("join")}
                  size="lg"
                  className="button"
                >
                  JOIN GAME
            </Button>
              </Col>
              <Col xs="3"></Col>
          </Container>
        </div>
      </Fragment>
    )
  }
}
 
export default HomeScreen;