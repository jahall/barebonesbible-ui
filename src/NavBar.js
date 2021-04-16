import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';


class NavBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://khcexcvtn4.execute-api.eu-west-2.amazonaws.com/default/books", {
      headers: {
        "x-api-key": "ISXgnAI2Cr4LIBTpe5IpzTMqr9CIDzn5rXlRriT5"
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    const { error, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    let dropdown = items.map(item => (
      <NavDropdown.Header>{item.collection}</NavDropdown.Header>
    ))
    return (
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="/home">Bare Bones Bible</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Books" id="basic-nav-dropdown">
              {dropdown}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Verse or Phrase" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


function NavBar() {
    return (
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="/home">Bare Bones Bible</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Books" id="basic-nav-dropdown">
              <NavDropdown.Header>Torah</NavDropdown.Header>
              <NavDropdown.Item href="/books/gen">Genesis</NavDropdown.Item>
              <NavDropdown.Item href="/books/exo">Exodus</NavDropdown.Item>
              <NavDropdown.Item href="/books/lev">Leviticus</NavDropdown.Item>
              <NavDropdown.Item href="/books/num">Numbers</NavDropdown.Item>
              <NavDropdown.Item href="/books/deu">Deuteronomy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Neviim</NavDropdown.Header>
              <NavDropdown.Item href="/books/jos">Joshua</NavDropdown.Item>
              <NavDropdown.Item href="/books/jud">Judges</NavDropdown.Item>
              <NavDropdown.Item href="/books/1sam">1 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/books/2sam">2 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/books/1kin">1 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/books/2kin">2 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/books/isa">Isaiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/jer">Jeremiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/eze">Ezekiel</NavDropdown.Item>
              <NavDropdown.Item href="/books/hos">Hosea</NavDropdown.Item>
              <NavDropdown.Item href="/books/joe">Joel</NavDropdown.Item>
              <NavDropdown.Item href="/books/amo">Amos</NavDropdown.Item>
              <NavDropdown.Item href="/books/oba">Obadiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/jon">Jonah</NavDropdown.Item>
              <NavDropdown.Item href="/books/mic">Micah</NavDropdown.Item>
              <NavDropdown.Item href="/books/nah">Nahum</NavDropdown.Item>
              <NavDropdown.Item href="/books/hab">Habakkuk</NavDropdown.Item>
              <NavDropdown.Item href="/books/zep">Zephaniah</NavDropdown.Item>
              <NavDropdown.Item href="/books/hag">Haggai</NavDropdown.Item>
              <NavDropdown.Item href="/books/zec">Zechariah</NavDropdown.Item>
              <NavDropdown.Item href="/books/mal">Malachi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Ketuvim</NavDropdown.Header>
              <NavDropdown.Item href="/books/psa">Psalms</NavDropdown.Item>
              <NavDropdown.Item href="/books/pro">Proverbs</NavDropdown.Item>
              <NavDropdown.Item href="/books/job">Job</NavDropdown.Item>
              <NavDropdown.Item href="/books/son">Song of Songs</NavDropdown.Item>
              <NavDropdown.Item href="/books/rut">Ruth</NavDropdown.Item>
              <NavDropdown.Item href="/books/lam">Lamentations</NavDropdown.Item>
              <NavDropdown.Item href="/books/ecc">Ecclesiastes</NavDropdown.Item>
              <NavDropdown.Item href="/books/est">Esther</NavDropdown.Item>
              <NavDropdown.Item href="/books/dan">Daniel</NavDropdown.Item>
              <NavDropdown.Item href="/books/ezr">Ezra</NavDropdown.Item>
              <NavDropdown.Item href="/books/neh">Nehemiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/1chr">1 Chronicles</NavDropdown.Item>
              <NavDropdown.Item href="/books/2chr">2 Chronicles</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Verse or Phrase" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  export default NavBar2;