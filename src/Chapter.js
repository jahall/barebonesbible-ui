import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';

import { withRouter } from "react-router-dom";


class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chapters: 0,
      verses: []
    };
    this._constructVerses.bind(this);
  }

  componentDidMount() {
    /* Load proper name and chapter info from the api */
    let code = this.props.match.params.code;
    let chapter = this.props.match.params.chapter;
    fetch("https://api.barebonesbible.com/books/" + code)
      .then(res => res.json())
      .then(res => this.setState({name: res.name, chapters: res.chapters}))
    fetch("https://api.barebonesbible.com/books/" + code + "/" + chapter)
      .then(res => res.json())
      .then(res => this.setState({verses: res}))
  }

  render() {
    let code = this.props.match.params.code;
    let chapter = parseInt(this.props.match.params.chapter);
    let lastChapter = this.state.chapters;
    let prevChapterLink = "/books/" + code + "/" + (chapter - 1).toString();
    let nextChapterLink = "/books/" + code + "/" + (chapter + 1).toString();
    return (
      <div className="chapter">
        <Container>
          <Row lg={1}>
            <Col>
              <h1 class="mt-5" align="center">
                <Button className="float-left" variant="outline-dark" href={prevChapterLink} disabled={chapter === 1}>&laquo;</Button>
                { this.state.name } { chapter }
                <Button className="float-right" variant="outline-dark" href={nextChapterLink} disabled={chapter === lastChapter}>&raquo;</Button>
              </h1>
            </Col>
          </Row>
          {this.state.verses.map(verse => this._constructVerses(code, verse))}
        </Container>
      </div>
    )
  }

  _constructVerses(code, verse) {
    let key = verse.chapter_osis_id + "." + verse.toString();
    return (
      <Row key={verse} lg={1}>
        <Col>
          <div className="text-right">
            <p>
              <bdo dir="rtl">
                <bdo dir="ltr">
                  <strong>{code}:</strong> {verse.verse}
                </bdo>
                &nbsp;
                <span class="hebrew">{verse.tokens.map(token => token.text)}</span>
              </bdo>
            </p>
          </div>
        </Col>
      </Row>
    )
  }

}

export default withRouter(Chapter);
