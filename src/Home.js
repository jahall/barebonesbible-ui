import scrolls from './images/scrolls.jpg';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';


function Home() {
  return (
    <div className="home">
      <Jumbotron style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(${scrolls})` }}>
        <Container>
          <h1 className="display-3">Hello!</h1>
          <p className="lead">
            The Bare Bones Bible (B<sup>3</sup>) is an awesome tool to help you engage with the Hebrew scriptures.
            Enjoy browsing by book or looking up words.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <Row lg={3} md={1}>
          <Col>
            <h2 class="mt-1">Why?</h2>
            <p>
              <strong>Why use this?</strong> B<sup>3</sup> allows you to engage directly with the raw Hebrew
              (the bare bones) of the scriptures. But, for those of us who don't speak Hebrew, every word is clickable,
              allowing you to dive into its meaning and origin. You also get pronunciations of each verse so you can
              learn to sound out the words yourself.
            </p>
          </Col>
          <Col>
            <h2 class="mt-1">How?</h2>
            <p>
              <strong>How do I use it?</strong> You can use the Books dropdown to go to a specific chapter or use
              the search bar to look up a specific passage. <a href="search?text=Jer+31:31-34">Try now!</a> In addition,
              you can search directly for Hebrew or English words or phrases (optionally limiting your search to a
              single book, or range of books.) <a href="search?text=*nephesh+books:Gen-Deu,Psa">Try now!</a>
            </p>
          </Col>
          <Col>
            <h2 class="mt-1">Who?</h2>
            <p>
              <strong>Who is this for?</strong> This tool is for all budding Bible scholars who are tired of using
              ugly Bible search applications and want a fresh way to engage with the original language of the scriptures.
              My prayer is that, through these bare bones, the God who inspired them will come alive to you!
            </p>
          </Col>
        </Row>
        <Row lg={1}>
          <Col>
            <h2 class="mt-3">About</h2>
            <p>
              <strong>My name is Joe.</strong> I like maths, being outside, programming and Jesus. I decided to
              build B<sup>3</sup> as a gift for my primary user and great encourager: my dad! However, once I finished
              I thought <em>"this is actually quite a neat tool, maybe I should share it more broadly."</em> So here
              you go, world &ndash; enjoy!
            </p>
            <p>
              I would love to hear feedback on your experience of using this site, what you like or what could be
              improved. Just drop me an email at <a href="mailto:joe@barebonesbible.com?Subject=B3%20Feedback" target="_top">joe@barebonesbible.com</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home;