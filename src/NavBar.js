import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
    return (
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="#home">Bare Bones Bible</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Books" id="basic-nav-dropdown">
              <NavDropdown.Header>Torah</NavDropdown.Header>
              <NavDropdown.Item href="/book?name=Genesis">Genesis</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Exodus">Exodus</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Leviticus">Leviticus</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Numbers">Numbers</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Deuteronomy">Deuteronomy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Neviim</NavDropdown.Header>
              <NavDropdown.Item href="/book?name=Joshua">Joshua</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Judges">Judges</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=1+Samuel">1 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=2+Samuel">2 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=1+Kings">1 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=2+Kings">2 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Isaiah">Isaiah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Jeremiah">Jeremiah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Ezekiel">Ezekiel</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Hosea">Hosea</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Joel">Joel</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Amos">Amos</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Obadiah">Obadiah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Jonah">Jonah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Micah">Micah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Nahum">Nahum</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Habakkuk">Habakkuk</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Zephaniah">Zephaniah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Haggai">Haggai</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Zechariah">Zechariah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Malachi">Malachi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Ketuvim</NavDropdown.Header>
              <NavDropdown.Item href="/book?name=Psalms">Psalms</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Proverbs">Proverbs</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Job">Job</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Song+of+Songs">Song of Songs</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Ruth">Ruth</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Lamentations">Lamentations</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Ecclesiastes">Ecclesiastes</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Esther">Esther</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Daniel">Daniel</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Ezra">Ezra</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=Nehemiah">Nehemiah</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=1+Chronicles">1 Chronicles</NavDropdown.Item>
              <NavDropdown.Item href="/book?name=2+Chronicles">2 Chronicles</NavDropdown.Item>
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

  export default NavBar;