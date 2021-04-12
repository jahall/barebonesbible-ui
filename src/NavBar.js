import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
              <NavDropdown.Item href="/books/Genesis">Genesis</NavDropdown.Item>
              <NavDropdown.Item href="/books/Exodus">Exodus</NavDropdown.Item>
              <NavDropdown.Item href="/books/Leviticus">Leviticus</NavDropdown.Item>
              <NavDropdown.Item href="/books/Numbers">Numbers</NavDropdown.Item>
              <NavDropdown.Item href="/books/Deuteronomy">Deuteronomy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Neviim</NavDropdown.Header>
              <NavDropdown.Item href="/books/Joshua">Joshua</NavDropdown.Item>
              <NavDropdown.Item href="/books/Judges">Judges</NavDropdown.Item>
              <NavDropdown.Item href="/books/1+Samuel">1 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/books/2+Samuel">2 Samuel</NavDropdown.Item>
              <NavDropdown.Item href="/books/1+Kings">1 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/books/2+Kings">2 Kings</NavDropdown.Item>
              <NavDropdown.Item href="/books/Isaiah">Isaiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Jeremiah">Jeremiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Ezekiel">Ezekiel</NavDropdown.Item>
              <NavDropdown.Item href="/books/Hosea">Hosea</NavDropdown.Item>
              <NavDropdown.Item href="/books/Joel">Joel</NavDropdown.Item>
              <NavDropdown.Item href="/books/Amos">Amos</NavDropdown.Item>
              <NavDropdown.Item href="/books/Obadiah">Obadiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Jonah">Jonah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Micah">Micah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Nahum">Nahum</NavDropdown.Item>
              <NavDropdown.Item href="/books/Habakkuk">Habakkuk</NavDropdown.Item>
              <NavDropdown.Item href="/books/Zephaniah">Zephaniah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Haggai">Haggai</NavDropdown.Item>
              <NavDropdown.Item href="/books/Zechariah">Zechariah</NavDropdown.Item>
              <NavDropdown.Item href="/books/Malachi">Malachi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Ketuvim</NavDropdown.Header>
              <NavDropdown.Item href="/books/Psalms">Psalms</NavDropdown.Item>
              <NavDropdown.Item href="/books/Proverbs">Proverbs</NavDropdown.Item>
              <NavDropdown.Item href="/books/Job">Job</NavDropdown.Item>
              <NavDropdown.Item href="/books/Song+of+Songs">Song of Songs</NavDropdown.Item>
              <NavDropdown.Item href="/books/Ruth">Ruth</NavDropdown.Item>
              <NavDropdown.Item href="/books/Lamentations">Lamentations</NavDropdown.Item>
              <NavDropdown.Item href="/books/Ecclesiastes">Ecclesiastes</NavDropdown.Item>
              <NavDropdown.Item href="/books/Esther">Esther</NavDropdown.Item>
              <NavDropdown.Item href="/books/Daniel">Daniel</NavDropdown.Item>
              <NavDropdown.Item href="/books/Ezra">Ezra</NavDropdown.Item>
              <NavDropdown.Item href="/books/Nehemiah">Nehemiah</NavDropdown.Item>
              <NavDropdown.Item href="/books/1+Chronicles">1 Chronicles</NavDropdown.Item>
              <NavDropdown.Item href="/books/2+Chronicles">2 Chronicles</NavDropdown.Item>
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