import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';

import { withRouter } from "react-router-dom";



class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chapters: 0
    };
  }

  componentDidMount() {
    /* Load proper name and chapter info from the api */
    let code = this.props.match.params.code;
    fetch("https://api.barebonesbible.com/books/" + code)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
            chapters: result.chapters
          });
        }
      )
  }

  render() {
    let chapters = Array.from({length: this.state.chapters}, (_, i) => i + 1)
    return (
      <Container className="text-center">
        <Row lg={1}>
          <Col>
            <h1 className="mt-5">{this.state.name}</h1>
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

}

/* withRouter allows you to access this.props.match.params from within the class! */
export default withRouter(Book);
