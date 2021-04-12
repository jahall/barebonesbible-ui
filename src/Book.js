import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useParams } from "react-router-dom";


function Book() {
  let { book } = useParams();
  /* TODO: Get from API */
  const chapters = [1, 2, 3, 4, 5];
  return (
    <div className="book">
      <Container>
        <Row lg={1}>
          <h1 class="mt-5">{ book }</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            {chapters.map((chapter) => toButton(book, chapter))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function toButton(book, chapter) {
  return <Button className="chapter-button" href={"/books/" + book + "/" + chapter}>{chapter}</Button>
}

export default Book;
