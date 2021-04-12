import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useParams } from "react-router-dom";


function Chapter() {
  let { book, chapter } = useParams();
  return (
    <div className="chapter">
      <Container>
        <Row lg={1}>
          <h1 class="mt-5">{ book }: { chapter }</h1>
        </Row>
      </Container>
    </div>
  )
}

export default Chapter;
