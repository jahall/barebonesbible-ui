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
      clickedCodes: [],
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

  handleTokenClick(event, codes) {
    event.preventDefault();
    if (typeof codes !== 'undefined') {
      this.setState({clickedCodes: codes});
    }
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
              <br/>
            </Col>
          </Row>
          {this.state.verses.map(verse => this.constructVerse(code, chapter, verse))}
        </Container>
      </div>
    )
  }

  constructVerse(code, chapter, verse) {
    let key = verse.chapterId + "." + verse.verseNum.toString();
    let english = this.constructEnglish(code, chapter, verse);
    let hebrew = this.constructForeign(code, chapter, verse, "hebrew");
    let greek = this.constructForeign(code, chapter, verse, "greek");
    return (
      <Row key={key} lg={1}>
        <Col>
          {english}
          {hebrew}
          {greek}
        </Col>
      </Row>
    );
  }

  constructEnglish(code, chapter, verse) {
    const selected = this.props.enTranslations;
    const translations = verse.translations.filter(elem => elem.lan === "en" && selected.includes(elem.translation.toLowerCase()));
    if (translations.length === 0) {
      return null;
    }
    const showTr = (translations.length === 1) ? (tr) => "" : (tr) => <span class="en-version">({tr})</span>;
    return (
      <p>
        {translations
          .map(tr => (
            <>
              <strong>{code} {chapter}</strong>:{verse.verseNum}{showTr(tr.translation)}
              &nbsp;&nbsp;
              <span className="english hover">
                {tr.tokens.map((token, index) =>
                  <Token
                    key={index}
                    strongs={token.strongs}
                    text={token.text}
                    type={token.type}
                    clickedCodes={this.state.clickedCodes}
                    handleClick={this.handleTokenClick}
                  />)}
              </span>
            </>
        ))
        .reduce((prev, curr) => [prev, <br/>, curr])}
      </p>
    );
  }

  constructForeign(code, chapter, verse, lan) {
    const lanCode = lan.substring(0, 2);
    const translations = verse.translations.filter(elem => elem.lan === lanCode);
    if (translations.length === 0) {
      return null;
    }
    var textDir = "left";
    var bdo = "ltr";
    if (lan === "hebrew") {
      textDir = "right";
      bdo = "rtl";
    }
    return (
      <p>
        {translations
          .map(tr => (
            <div className={"text-" + textDir}>
              <bdo dir={bdo}>
                <span className={lan + " hover"}>
                  {tr.tokens.map((token, index) =>
                    <Token
                      key={index}
                      strongs={token.strongs}
                      text={this.fixForeign(token.text)}
                      type={token.type}
                      clickedCodes={this.state.clickedCodes}
                      handleClick={this.handleTokenClick}
                    />)}
                </span>
              </bdo>
              {(!this.props.showTranslit) ? null : (
                <span className="translit">
                  <br/>
                  {tr.tokens.map((token, index) =>
                  <Token
                    key={index}
                    strongs={token.strongs}
                    text={token.tlit}
                    type={token.type}
                    clickedCodes={this.state.clickedCodes}
                    handleClick={this.handleTokenClick}
                  />)}
                </span>
              )}
            </div>
        ))
        .reduce((prev, curr) => [prev, <br/>, curr])}
      </p>
    );
  }

  fixForeign(text){
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
