import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, withRouter } from "react-router-dom";
import qs from 'qs';

import { normalize } from "./helpers";


class Search extends React.Component {
  /*
  This helped me understand why useLocation was not working!
  https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string/48256676#48256676
  */
  render() {
    var book;
    var match;
    /* Alias list not loaded yet */
    const bookAliases = this.props.bookAliases;
    if (bookAliases === null) {
      return this.info(
        <>
          <br/><br/><br/><br/>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </>
      );
    }
    /* Fetch user search string */
    let query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).query.trim();
    /* 1. Did they search for a book? */
    book = bookAliases[normalize(query)];
    if (book !== undefined) {
      return <Redirect to={"/books/" + book} />;
    }
    /* 2. Did they search for a strongs reference (optionally filtered for a book) */
    match = query.match(/^([hg]\d+)\s*(?:book:)?\s*([\w\s]+)?\s*$/i);  // note: (?:...) is "non-capturing"
    if (match !== null) {
      book = (match[2] === undefined) ? null : bookAliases[normalize(match[2])];
      if (book !== undefined) {
        let url = "/search/" + match[1].toUpperCase();
        if (book !== null) {
          url = url + "?book=" + book;
        }
        return <Redirect to={url} />
      }
    }
    /* 2. Did they search for a specific chapter */
    match = query.match(/^([\w\s]+[a-z])\s*(\d+)$/i);
    if (match !== null) {
      book = bookAliases[normalize(match[1])];
      if (book !== undefined) {
        return <Redirect to={"/books/" + book + "/" + match[2]} />;
      }
    }
    var cv1;
    var cv2;
    /* 3. Did they search for a specific verse */
    match = query.match(/^([\w\s]+[a-z])\s*(\d+)\s*:(\d+)$/i);
    if (match !== null) {
      book = bookAliases[normalize(match[1])];
      cv1 = match[2] + "." + match[3];
      cv2 = cv1;
    }
    /* 4. Did they search for a range of verses (within a chapter) */
    match = query.match(/^([\w\s]+[a-z])\s*(\d+)\s*:\s*(\d+)\s*-\s*(\d+)$/i);
    if (match !== null) {
      book = bookAliases[normalize(match[1])];
      cv1 = match[2] + "." + match[3];
      cv2 = match[2] + "." + match[4];
    }
    /* 5. Did they search for a range of verses (across chapters) */
    match = query.match(/^([\w\s]+[a-z])\s*(\d+)\s*:\s*(\d+)\s*-\s*(\d+)\s*:\s*(\d+)$/i);
    if (match !== null) {
      book = bookAliases[normalize(match[1])];
      cv1 = match[2] + "." + match[3];
      cv2 = match[4] + "." + match[5];
    }
    if (book !== undefined) {
      return <Redirect to={"/books/" + book + "/" + cv1 + "/" + cv2} />;
    }
    /* Didn't get anything */
    return this.info(
      <>
        <h3 className="mt-5">Couldn't find anything for<br/>"<strong>{query}</strong>"</h3>
        <br/>
        <p><Button variant="primary" href="/home">Take me home</Button></p>
      </>
    );
  }

  info(message) {
    return (
      <Container className="text-center">
        <Row lg={1}>
          <Col>
            {message}
          </Col>
        </Row>
      </Container>
    )
  }
}
  
export default withRouter(Search);