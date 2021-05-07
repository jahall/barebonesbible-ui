import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import qs from 'qs';
import { withRouter } from "react-router-dom";

import TokenModal from './TokenModal';
import Verse from './Verse';


/* TODO: Make pagination */


class SearchTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pages: null,
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
    this.fetchVerses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.setState({verses: null, page: 1}, () => this.fetchVerses());
    } else if (prevState.page !== this.state.page) {
      this.setState({verses: null}, () => this.fetchVerses());
    }
  }

  fetchVerses() {
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
      .then(res => this.setState({verses: res.verses, pages: res.pages}))
    this.setState({clickedCodes: [term]});
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
    let code = this.props.match.params.term;
    let lan = (code[0].toUpperCase() === "H") ? "hebrew" : "greek";
    let meta = this.props.strongsLookup[lan][code];
    return (
      <div className="search-term">
        <Container>
          <Row lg={1}>
            <Col>
              <h1 className="mt-5" align="center">
                <span className="sid">({code})</span>&nbsp;
                <span className={lan}>{meta.lemma}</span> &ndash;&nbsp;
                <span className="translit">{meta.tlit}</span>
              </h1>
              <br/>
            </Col>
          </Row>
          {this.makeVerses()}
          {this.makePagination()}
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

  makePagination() {
    let page = this.state.page;
    let pages = this.state.pages;
    if (pages === null || pages === undefined || this.state.verses === null) {
      return null;
    }
    let pageList = [page - 1, page, page + 1];
    pageList = pageList.filter(p => p >= 1 && p <= pages);
    if (pageList[0] == 3) {pageList.unshift(2)};
    if (pageList[0] == 2) {pageList.unshift(1)};
    if (pageList[pageList.length - 1] == pages - 2) {pageList.push(pages - 1)};
    if (pageList[pageList.length - 1] == pages - 1) {pageList.push(pages)};
    var left = null;
    var right = null;
    if (pageList[0] !== 1) {
      left = (
        <>
          <Pagination.Item onClick={() => this.pageClick(1)}>1</Pagination.Item>
          <Pagination.Ellipsis disabled={true} />
        </>
      );
    }
    if (pageList[pageList.length - 1] !== pages) {
      right = (
        <>
          <Pagination.Ellipsis disabled={true} />
          <Pagination.Item onClick={() => this.pageClick(pages)}>{pages}</Pagination.Item>
        </>
      );
    }
    return (
      <Row lg={1}>
        <Col>
          <br/>
          <Pagination className="justify-content-center">
            <Pagination.Prev disabled={page === 1} onClick={() => this.pageClick(page - 1)}/>
            {left}
            {pageList.map((p) => (
              <Pagination.Item active={p === page} onClick={() => this.pageClick(p)}>{p}</Pagination.Item>
            ))}
            {right}
            <Pagination.Next disabled={page === pages} onClick={() => this.pageClick(page + 1)}/>
          </Pagination>
        </Col>
      </Row>
    );
  }

  pageClick(page) {
    this.setState({page: page}, () => window.scrollTo(0,0));
  }

  makeVerses() {
    if (this.state.verses === null) {
      return this.makeSpinner();
    } else {
      return this.state.verses.map((verse, index) => (
        <Verse
          key={verse.chapterId + "." + verse.verseNum}
          code={verse.chapterId.split(".")[0]}
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

export default withRouter(SearchTerm);
