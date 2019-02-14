import React, { Component, Fragment } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';


class HomeScreen extends Component {
  state={}

  render() { 
    return (
      <Fragment>
        <div style={{marginTop: "60%"}}>
          <Container>
            <Row>
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
            </Row>
            <div style={{marginTop: "10%"}}></div>
            <Row>
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
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}
 
export default HomeScreen;