import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';

import { withRouter } from "react-router-dom";

import Token from './Token';


class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chapters: 0,
      verses: [],
      clickedCode: null,
    };
    this.constructVerse = this.constructVerse.bind(this);
    this.handleTokenClick = this.handleTokenClick.bind(this);
  }

  componentDidMount() {
    let code = this.props.match.params.code;
    let chapter = this.props.match.params.chapter;
    fetch("https://api.barebonesbible.com/books/" + code)
      .then(res => res.json())
      .then(res => this.setState({name: res.name, chapters: res.chapters}))
    fetch("https://api.barebonesbible.com/books/" + code + "/" + chapter)
      .then(res => res.json())
      .then(res => this.setState({verses: res.verses}))
  }

  handleTokenClick(event, code) {
    event.preventDefault();
    this.setState({clickedCode: code});
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
          {this.state.verses.map(verse => this.constructVerse(code, chapter, verse))}
        </Container>
      </div>
    )
  }

  constructVerse(code, chapter, verse) {
    let key = verse.chapterId + "." + verse.verseNum.toString();
    var enField = this.props.translation + "Tokens";
    let english = (
      <span class="english">
        {verse[enField].map((token, index) =>
          <Token
            key={key + "." + index.toString()}
            code={token.code}
            text={token.text}
            type={token.type}
            clicked={token.code && token.code === this.state.clickedCode}
            handleClick={this.handleTokenClick}
          />)}
      </span>
    );
    let hebrew = (
      <span class="hebrew">
        {verse.wlcTokens.map((token, index) =>
          <Token
            key={key + "." + index.toString()}
            code={token.code}
            text={this.fixHebrew(token.text)}
            type={token.type}
            clicked={token.code && token.code === this.state.clickedCode}
            handleClick={this.handleTokenClick}
          />)}
      </span>
    );
    var translit = "";
    if (this.props.showTranslit) {
      translit = (
        <span class="translit">
          <br/>
          {verse.wlcTokens.map((token, index) =>
          <Token
            key={key + "." + index.toString()}
            code={token.code}
            text={token.tlit}
            type={token.type}
            clicked={token.code && token.code === this.state.clickedCode}
            handleClick={this.handleTokenClick}
          />)}
        </span>
      );
    }
    return (
      <Row key={key} lg={1}>
        <Col>
          <p>
            <strong>{code} {chapter}</strong>:<sub>{verse.verseNum}</sub>
            &nbsp;&nbsp;
            {english}
          </p>
          <p>
            <div className="text-right">
              <bdo dir="rtl">
                {hebrew}
              </bdo>
              {translit}
            </div>
          </p>
        </Col>
      </Row>
    );
  }

  fixHebrew(text){
    if (!this.props.showCantillations) {
      text = text.replace(/[\u0591-\u05AF]/g,"");
    }
    if (!this.props.showNiqqud) {
      text = text.replace(/[\u05B0-\u05C7]/g,"");
    }
    return text;
  }
}

export default withRouter(Chapter);
