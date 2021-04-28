import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';

import { withRouter } from "react-router-dom";

import Token from './Token';


class Verse extends React.Component {

  render() {
    let code = this.props.code;
    let verse = this.props.verse;

    let key = verse.chapterId + "." + verse.verseNum.toString();
    let english = this.constructEnglish(code, verse);
    let hebrew = this.constructForeign(code, verse, "hebrew");
    let greek = this.constructForeign(code, verse, "greek");
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

  constructEnglish(code, verse) {
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
            <>
              <span className="ref">{verse.chapterId.replace(".", " ")}:{verse.verseNum}</span>{showTr(tr.translation)}
              &nbsp;&nbsp;
              <span className="english hover">
                {tr.tokens.map((token, index) =>
                  <Token
                    key={index}
                    strongs={token.strongs}
                    text={token.text}
                    type={token.type}
                    clickedCodes={this.props.clickedCodes}
                    handleClick={this.props.handleTokenClick}
                  />)}
              </span>
            </>
        ))
        .reduce((prev, curr) => [prev, <br/>, curr])}
      </p>
    );
  }

  constructForeign(code, verse, lan) {
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
      <p className={"text-" + textDir}>
        {translations
          .map(tr => (
            <>
              <bdo dir={bdo}>
                <span className={lan + " hover"}>
                  {tr.tokens.map((token, index) =>
                    <Token
                      key={index}
                      strongs={token.strongs}
                      text={this.fixForeign(token.text)}
                      type={token.type}
                      clickedCodes={this.props.clickedCodes}
                      handleClick={this.props.handleTokenClick}
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
                    clickedCodes={this.props.clickedCodes}
                    handleClick={this.props.handleTokenClick}
                  />)}
                </span>
              )}
            </>
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

export default withRouter(Verse);
