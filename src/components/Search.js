import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { withRouter } from "react-router-dom";
import qs from 'qs';


class Search extends React.Component {
  /*
  This helped me understand why useLocation was not working!
  https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string/48256676#48256676
  */
  render() {
    let query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).query;
    return (
      <Container>
        <Row lg={1}>
          <Col>
            <h2 className="mt-5" align="center">You searched for: <strong>{query}</strong></h2>
          </Col>
        </Row>
      </Container>
    )
  }
}
  
export default withRouter(Search);