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
      verses: [],
      tokenHighlight: null,
    };
    this._constructVerses.bind(this);
    this._constructToken.bind(this);
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
      .then(res => this.setState({verses: res.verses}))
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
          {this.state.verses.map(verse => this._constructVerses(code, chapter, verse))}
        </Container>
      </div>
    )
  }

  _constructVerses(code, chapter, verse) {
    let key = verse.chapterId + "." + verse.verseNum.toString();
    return (
      <Row key={key} lg={1}>
        <Col>
          <p>
            <strong>{code} {chapter}</strong>:<sub>{verse.verseNum}</sub>
            &nbsp;&nbsp;
            <span class="english">
              {verse.enTokens.map((token, index) => this._constructToken(key, index, token, "text"))}
            </span>
          </p>
          <p>
            <div className="text-right">
              <bdo dir="rtl">
                <span class="hebrew">
                  {verse.heTokens.map((token, index) => this._constructToken(key, index, token, "text"))}
                </span>
              </bdo>
              <br/>
              <span class="translit">
                {verse.heTokens.map((token, index) => this._constructToken(key, index, token, "transliteration"))}
              </span>
            </div>
          </p>
        </Col>
      </Row>
    )
  }

  _constructToken(verseKey, index, token, field) {
    let key = verseKey + "." + index.toString();
    var text = token[field];
    text = <span onClick={(e) => this._handleClick(e, token.code)}>{text}</span>;
    if (token.code && token.code === this.state.tokenHighlight) {
      text = <span className="token-clicked">{text}</span>;
    }
    if (token.code) {
      text = <a href="#">{text}</a>;
    }
    return <span key={key} className={"token-" + token.type}>{text}</span>
  }

  _handleClick(event, code) {
    event.preventDefault();
    this.setState({tokenHighlight: code});
  }

}

export default withRouter(Chapter);
