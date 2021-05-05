import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { withRouter } from "react-router-dom";



class Book extends React.Component {
  render() {
    if (this.props.bookLookup === null) {
      return this.makeSpinner();
    }
    /* NOTE: MUST handle this.props.match.params stuff in render rather than constructor or
       componentDidMount OTHERWISE the component doesn't know to re-render when it changes!! */
    let code = this.props.match.params.code;
    let book = this.props.bookLookup[code];
    let chapters = Array.from({length: book.chapters}, (_, i) => i + 1)
    return (
      <Container className="text-center">
        <Row lg={1}>
          <Col>
            <h1 className="mt-5">{book.name}</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {chapters.map((chapter) => this.toButton(chapter))}
          </Col>
        </Row>
      </Container>
    )
  }

  toButton(chapter) {
    let code = this.props.match.params.code;
    let key = code + "." + chapter;
    let handler = () => this.handleClick(code, chapter);
    return (
      <Button key={key} className="chapter-button" variant="outline-dark" size="lg" onClick={handler}>{chapter}</Button>
    )
  }

  handleClick(code, chapter) {
    /* Need to re-route with "history" rather than href or it results in a full state-reload! */
    let path = "/books/" + code + "/" + chapter;
    this.props.history.push(path);
  }

  makeSpinner() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <Spinner animation="border" role="status" align="center">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

}

/* withRouter allows you to access this.props.match.params from within the class! */
export default withRouter(Book);
