import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { withRouter } from "react-router-dom";

import TokenModal from './TokenModal';
import Verse from './Verse';


class Passage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verses: null,
      hoveredCodes: [],
      clickedCodes: [],
      showModal: false,
    };
    this.handleTokenHover = this.handleTokenHover.bind(this);
    this.handleTokenClick = this.handleTokenClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    /* Load initial passage */
    let code = this.props.match.params.code;
    let [start, end] = this.getRange(this.props);
    fetch("https://api.barebonesbible.com/books/" + code + "/" + start + "/" + end)
      .then(res => res.json())
      .then(res => this.setState({verses: res.verses}))
  }

  componentDidUpdate(prevProps) {
    /* Check if a new passage has been requested */
    let prevCode = prevProps.match.params.code;
    let [prevStart, prevEnd] = this.getRange(prevProps);
    let code = this.props.match.params.code;
    let [start, end] = this.getRange(this.props);
    if (prevCode !== code || prevStart !== start || prevEnd !== end) {
      this.setState({verses: null})
      fetch("https://api.barebonesbible.com/books/" + code + "/" + start + "/" + end)
        .then(res => res.json())
        .then(res => this.setState({verses: res.verses}))
    }
  }

  getRange(props) {
    const chapter = props.match.params.chapter;
    if (chapter === undefined) {
      return [props.match.params.start, props.match.params.end];
    } else {
      return [chapter + ".1", chapter + ".x"];
    }
  }

  handleTokenHover(codes) {
    this.setState({hoveredCodes: codes});
  }

  handleTokenClick(event, codes) {
    event.preventDefault();
    if (typeof codes !== 'undefined') {
      this.setState({
        clickedCodes: codes,
        showModal: codes.length > 0,
      });
    }
  }

  handleModalClose() {
    this.setState({showModal: false})
  }

  render() {
    if (this.props.bookLookup === null) {
      return <Container><br/><br/><br/><br/>{this.makeSpinner()}</Container>
    }
    let code = this.props.match.params.code;
    let book = this.props.bookLookup[code];
    let chapter = this.props.match.params.chapter;
    var prevButton;
    var nextButton;
    if (chapter !== undefined) {
      chapter = parseInt(chapter);
      let lastChapter = book.chapters;
      let prevChapterLink = "/books/" + code + "/" + (chapter - 1).toString();
      let nextChapterLink = "/books/" + code + "/" + (chapter + 1).toString();
      prevButton = (
        <Button
          className="float-left"
          variant="outline-dark"
          onClick={() => this.props.history.push(prevChapterLink)}
          disabled={chapter === 1}
        >&laquo;
        </Button>
      );
      nextButton = (
        <Button
          className="float-right"
          variant="outline-dark"
          onClick={() => this.props.history.push(nextChapterLink)}
          disabled={chapter === lastChapter}
        >&raquo;
        </Button>
      );
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
                {prevButton} {book.name} {this.makeRef()} {nextButton}
              </h1>
              <br/>
            </Col>
          </Row>
          {this.makeVerses()}
        </Container>
        <TokenModal
          strongsLookup={this.props.strongsLookup}
          clickedCodes={this.state.clickedCodes}
          show={this.state.showModal}
          handleClose={this.handleModalClose}
        />
      </div>
    )
  }

  makeRef() {
    let chapter = this.props.match.params.chapter;
    if (chapter !== undefined) {
      return chapter
    }
    let [start, end] = this.getRange(this.props);
    let cv1 = start.split(".");
    let cv2 = end.split(".");
    if (start === end) {
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
          key={verse.chapterId + "." + verse.verseNum}
          code={code}
          verse={verse}
          enTranslations={this.props.enTranslations}
          hoveredCodes={this.state.hoveredCodes}
          clickedCodes={this.state.clickedCodes}
          handleTokenHover={this.handleTokenHover}
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
