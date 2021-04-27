import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import qs from 'qs';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAliases: null,
    };
  }

  async componentDidMount() {
    const collections = await fetch("https://api.barebonesbible.com/books").then(res => res.json());
    const bookAliases = this.createBookAliases(collections);
    this.setState({bookAliases: bookAliases})
  }

  createBookAliases(collections) {
    var bookAliases = {};
    for (const item of collections) {
      for (const book of item.books) {
        bookAliases[normalize(book.code)] = book.code;
        bookAliases[normalize(book.name)] = book.code;
        for (const alias of book.aliases) {
          bookAliases[normalize(alias)] = book.code;
        }
      }
    }
    return bookAliases;
  }

  /*
  This helped me understand why useLocation was not working!
  https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string/48256676#48256676
  */
  render() {
    if (this.state.bookAliases === null) {
      return this.info(<h3 className="mt-5">Searching...</h3>);
    }
    let query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).query;
    let book = this.state.bookAliases[normalize(query)];
    if (book === undefined) {
      return this.info(
        <>
          <h3 className="mt-5">Couldn't find anything for<br/>"<strong>{query}</strong>"</h3>
          <br/>
          <p><Button variant="primary" href="/home">Take me home</Button></p>
        </>
      );
    }
    return (
      <Redirect to={"/books/" + book} />
    )
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

function normalize(alias) {
  return alias.toLowerCase().replace(/\s/g, "");
}
  
export default withRouter(Search);