import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ls from 'local-storage';
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
      modalCodes: [],
      showModal: false,
    };
    this.handleTokenHover = this.handleTokenHover.bind(this);
    this.handleTokenClick = this.handleTokenClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleStrongsModalClick = this.handleStrongsModalClick.bind(this);
  }

  componentDidMount() {
    /* Load initial passage */
    let [code, start, end] = this.getVerseRange();
    fetch("https://api.barebonesbible.com/books/" + code + "/" + start + "/" + end)
      .then(res => res.json())
      .then(res => this.setState({verses: res.verses}))
    ls.set("lastVisited", this.props.location);
  }

  componentDidUpdate(prevProps) {
    /* Check if a new passage has been requested */
    if (prevProps.location !== this.props.location) {
      this.setState({verses: null})
      let [code, start, end] = this.getVerseRange();
      fetch("https://api.barebonesbible.com/books/" + code + "/" + start + "/" + end)
        .then(res => res.json())
        .then(res => this.setState({verses: res.verses}))
      ls.set("lastVisited", this.props.location);
    }
  }

  getVerseRange() {
    const code = this.props.match.params.code;
    const chapter = this.props.match.params.chapter;
    if (chapter === undefined) {
      return [code, this.props.match.params.start, this.props.match.params.end];
    } else {
      return [code, chapter + ".1", chapter + ".x"];
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
        modalCodes: codes,
        showModal: codes.length > 0,
      });
    }
  }

  handleStrongsModalClick(codes) {
    this.setState({
      modalCodes: codes,
    });
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
    var [prevButton, nextButton] = this.makeButtons(code, book);
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
          modalCodes={this.state.modalCodes}
          show={this.props.showPopups && this.state.showModal}
          handleClose={this.handleModalClose}
          handleStrongsModalClick={this.handleStrongsModalClick}
        />
      </div>
    )
  }

  makeButtons(code, book) {
    let chapter = this.props.match.params.chapter;
    if (chapter === undefined) {
      return [null, null];
    }
    chapter = parseInt(chapter, 10);
    let lastChapter = book.chapters;
    let prevChapterLink = "/books/" + code + "/" + (chapter - 1).toString();
    let nextChapterLink = "/books/" + code + "/" + (chapter + 1).toString();
    let prevButton = (
      <Button
        className="float-left"
        variant="outline-dark"
        onClick={() => this.props.history.push(prevChapterLink)}
        disabled={chapter === 1}
      >&laquo;
      </Button>
    );
    let nextButton = (
      <Button
        className="float-right"
        variant="outline-dark"
        onClick={() => this.props.history.push(nextChapterLink)}
        disabled={chapter === lastChapter}
      >&raquo;
      </Button>
    );
    return [prevButton, nextButton];
  }

  makeRef() {
    let chapter = this.props.match.params.chapter;
    if (chapter !== undefined) {
      return chapter
    }
    let [, start, end] = this.getVerseRange();
    let cv1 = start.split(".");
    let cv2 = end.split(".");
    if (start === end) {
      return <React.Fragment>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}</span></React.Fragment>
    } else if (cv1[0] === cv2[0]) {
      return <React.Fragment>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}-{cv2[1]}</span></React.Fragment>
    } else {
      return <React.Fragment>{cv1[0]}<span style={{fontSize: "large"}}>:{cv1[1]}</span>-{cv2[0]}<span style={{fontSize: "large"}}>:{cv2[1]}</span></React.Fragment>
    }
  }

  makeVerses() {
    let code = this.props.match.params.code;
    if (this.state.verses === null) {
      return this.makeSpinner();
    } else {
      return this.state.verses.map((verse, index) => (
        <Verse
          key={verse.chapterId + "." + verse.verseNum}
          code={code}
          verse={verse}
          index={index}
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
