import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { withRouter } from "react-router-dom";

import Verse from './Verse';


class Passage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chapters: 0,
      verses: null,
      clickedCodes: [],
    };
    this.handleTokenClick = this.handleTokenClick.bind(this);

    const chapter = this.props.match.params.chapter;
    if (chapter === undefined) {
      this.start = this.props.match.params.start;
      this.end = this.props.match.params.end;
    } else {
      this.start = chapter + ".1";
      this.end = chapter + ".x";
    }
  }

  componentDidMount() {
    let code = this.props.match.params.code;
    fetch("https://api.barebonesbible.com/books/" + code)
      .then(res => res.json())
      .then(res => this.setState({name: res.name, chapters: res.chapters}))
    fetch("https://api.barebonesbible.com/books/" + code + "/" + this.start + "/" + this.end)
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
    let chapter = this.props.match.params.chapter;
    var prevButton;
    var nextButton;
    if (chapter !== undefined) {
      chapter = parseInt(chapter);
      let lastChapter = this.state.chapters;
      let prevChapterLink = "/books/" + code + "/" + (chapter - 1).toString();
      let nextChapterLink = "/books/" + code + "/" + (chapter + 1).toString();
      prevButton = <Button className="float-left" variant="outline-dark" href={prevChapterLink} disabled={chapter === 1}>&laquo;</Button>;
      nextButton = <Button className="float-right" variant="outline-dark" href={nextChapterLink} disabled={chapter === lastChapter}>&raquo;</Button>
    } else {
      prevButton = <></>;
      nextButton = <></>;
    }
    return (
      <div className="passage">
        <Container>
          <Row lg={1}>
            <Col>
              <h1 className="mt-5" align="center">
                {prevButton} {this.state.name} {this.makeRef()} {nextButton}
              </h1>
              <br/>
            </Col>
          </Row>
          {this.makeVerses()}
        </Container>
      </div>
    )
  }

  makeRef() {
    let chapter = this.props.match.params.chapter;
    if (chapter !== undefined) {
      return chapter
    }
    let cv1 = this.start.split(".");
    let cv2 = this.end.split(".");
    if (this.start === this.end) {
      return <>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}</span></>
    } else if (cv1[0] === cv2[0]) {
      return <>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}-{cv2[1]}</span></>
    } else {
      return <>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}</span>-{cv2[0]}<span style={{fontSize: "large"}}>:{cv2[1]}</span></>
    }
  }

  makeVerses() {
    let code = this.props.match.params.code;
    if (this.state.verses === null) {
      return this.makeSpinner();
    } else {
      return this.state.verses.map(verse => (
        <Verse
          code={code}
          verse={verse}
          enTranslations={this.props.enTranslations}
          clickedCodes={this.state.clickedCodes}
          handleTokenClick={this.handleTokenClick}
          showCantillations={this.props.showCantillations}
          showNiqqud={this.props.showNiqqud}
          showTranslit={this.props.showTranslit}
        />
      ));
    }
  }

  makeSpinner() {
    return (
      <Row className="text-center">
        <Col>
          <Spinner animation="border" role="status" align="center">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Passage);
