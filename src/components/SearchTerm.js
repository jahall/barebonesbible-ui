import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import qs from 'qs';
import { withRouter } from "react-router-dom";

import TokenModal from './TokenModal';
import Verse from './Verse';


/* TODO:
1. Make pretty title
2. Make pagination
3. Add link in modal
*/


class SearchTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
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
    /* Load initial page */
    let term = this.props.match.params.term;
    let book = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).book;
    let params = "?term=" + term;
    params += "&page=" + this.state.page;
    params += "&size=20";
    if (book !== undefined) {
      params += "&book=" + book;
    }
    fetch("https://api.barebonesbible.com/search/" + params)
      .then(res => res.json())
      .then(res => this.setState({verses: res.verses}))
    this.setState({clickedCodes: [term]});
  }

  componentDidUpdate(prevProps) {
    /* Check if a new passage has been requested */
    if (prevProps.location !== this.props.location) {
      let egg = 1;
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
    if (this.props.strongsLookup === null) {
      return <Container><br/><br/><br/><br/>{this.makeSpinner()}</Container>
    }
    let term = this.props.match.params.term;
    return (
      <div className="search-term">
        <Container>
          <Row lg={1}>
            <Col>
              <h1 className="mt-5" align="center">
                {term}
              </h1>
              <br/>
            </Col>
          </Row>
          {this.makeVerses()}
        </Container>
        <TokenModal
          strongsLookup={this.props.strongsLookup}
          clickedCodes={this.state.clickedCodes}
          show={this.props.showPopups && this.state.showModal}
          handleClose={this.handleModalClose}
        />
      </div>
    )
  }

  makeVerses() {
    if (this.state.verses === null) {
      return this.makeSpinner();
    } else {
      return this.state.verses.map(verse => (
        <Verse
          key={verse.chapterId + "." + verse.verseNum}
          code={verse.chapterId.split(".")[0]}
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

export default withRouter(SearchTerm);
