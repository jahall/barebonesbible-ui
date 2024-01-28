import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';

import { withRouter } from "react-router-dom";

import Token from './Token';


class Verse extends React.Component {

  render() {
    let verse = this.props.verse;
    let key = verse.chapterId + "." + verse.verseNum.toString();
    let english = this.constructEnglish(verse);
    let hebrew = this.constructForeign(verse, "hebrew");
    let greek = this.constructForeign(verse, "greek");
    let cls = (this.props.index % 2 === 0) ? "even-verse" : "odd-verse";
    return (
      <Row key={key} lg={1} className={cls}>
        <Col>
          {english}
          {hebrew}
          {greek}
        </Col>
      </Row>
    );
  }

  constructEnglish(verse) {
    const selected = this.props.enTranslations;
    const translations = verse.translations.filter(
      elem => elem.lan === "en" && selected.includes(elem.translation.toLowerCase())
    );
    if (translations.length === 0) {
      return null;
    }
    const showTr = (translations.length === 1) ? (tr) => "" : (tr) => <span className="en-version">[{tr}]</span>;
    return (
      <p>
        {translations
          .map(tr => (
            <span key={tr.translation}>
              <span className="ref">{verse.chapterId.replace(".", " ")}:{verse.verseNum}</span>{showTr(tr.translation)}
              &nbsp;&nbsp;
              <span className="english no-link">
                {tr.tokens.map((token, index) =>
                  <Token
                    key={"en" + tr.translation + index.toString()}
                    strongs={token.strongs}
                    text={token.text}
                    type={token.type}
                    hoveredCodes={this.props.hoveredCodes}
                    clickedCodes={this.props.clickedCodes}
                    handleHover={this.props.handleTokenHover}
                    handleClick={this.props.handleTokenClick}
                  />)}
              </span>
            </span>
        ))
        .reduce((prev, curr, index) => [prev, <br key={index}/>, curr])}
      </p>
    );
  }

  constructForeign(verse, lan) {
    const lanCode = lan.substring(0, 2);
    const translations = verse.translations
      .filter(elem => elem.lan === lanCode)
      .filter(elem => elem.translation !== "LXX" || this.props.showLxx);
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
      <p className={"text-" + textDir}>
        {translations
          .map(tr => (
            <span key={tr.translation}>
              <bdo dir={bdo}>
                <span className={lan + " no-link"}>
                  {tr.tokens.map((token, index) =>
                    <Token
                      key={lan.substring(0, 2) + tr.translation + index.toString()}
                      strongs={token.strongs}
                      text={this.fixForeign(token.text)}
                      type={token.type}
                      hoveredCodes={this.props.hoveredCodes}
                      clickedCodes={this.props.clickedCodes}
                      handleHover={this.props.handleTokenHover}
                      handleClick={this.props.handleTokenClick}
                    />)}
                </span>
              </bdo>
              {(!this.props.showTranslit) ? null : (
                <span className="translit no-link">
                  <br/>
                  {tr.tokens.map((token, index) =>
                  <Token
                    key={lan.substring(0, 2) + "x" + tr.translation + index}
                    strongs={token.strongs}
                    text={token.tlit}
                    type={token.type}
                    hoveredCodes={this.props.hoveredCodes}
                    clickedCodes={this.props.clickedCodes}
                    handleHover={this.props.handleTokenHover}
                    handleClick={this.props.handleTokenClick}
                  />)}
                </span>
              )}
            </span>
        ))
        .reduce((prev, curr, index) => [prev, <br key={index}/>, curr])}
      </p>
    );
  }

  fixForeign(text){
    // NOTE: Looks like the current hebrew font can't show cantillations anyway :(
    if (!this.props.showCantillations) {
      text = text.replace(/[\u0591-\u05AF]/g,"");
    }
    if (!this.props.showNiqqud) {
      text = text.replace(/[\u05B0-\u05C7]/g,"");
    }
    return text;
  }
}

export default withRouter(Verse);
