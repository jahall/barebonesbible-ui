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
      name: "Oops!",
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
      <div className="book">
        <Container>
          <Row lg={1}>
            <h1 class="mt-5">{ this.state.name }</h1>
          </Row>
          <hr />
          <Row>
            <Col>
              {chapters.map((chapter) => this._toButton(chapter))}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  _toButton(chapter) {
    let code = this.props.match.params.code;
    return (
      <Button className="chapter-button" variant="outline-dark" size="lg" href={"/books/" + code + "/" + chapter}>{chapter}</Button>)

  }
}

/* withRouter allows you to access this.props.match.params from within the class! */
export default withRouter(Book);
