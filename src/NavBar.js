import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      collections: [],
    };
  }

  componentDidMount() {
    /* Load dropdown menu from the api */
    fetch("https://api.barebonesbible.com/books")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            collections: result
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
    const { error, collections } = this.state;
    if (error) {
      var dropdown = <NavDropdown.Header>Failed to load!</NavDropdown.Header>
    } else if (collections.length === 0) {
      var dropdown = <NavDropdown.Header>Loading...</NavDropdown.Header>
    } else {
      var dropdown = this._renderDropdown(collections)
    }
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
            <NavDropdown title="Settings">
              <Container>
                <Form>
                  <Form.Check
                    type="checkbox"
                    label="Cantillations"
                    defaultChecked={this.props.showCantillations}
                    onChange={this.props.handleCantillationsClick}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Niqqud"
                    defaultChecked={this.props.showNiqqud}
                    onChange={this.props.handleNiqqudClick}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Transliteration"
                    defaultChecked={this.props.showTranslit}
                    onChange={this.props.handleTranslitClick}
                  />
                </Form>
              </Container>
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

  _renderDropdown(collections) {
    var dropdown = [];
    for (const item of collections) {
      dropdown.push(<NavDropdown.Header>{item.collection}</NavDropdown.Header>);
      for (const book of item.books) {
        dropdown.push(<NavDropdown.Item href={"/books/" + book.code}>{book.name}</NavDropdown.Item>);
      }
      dropdown.push(<NavDropdown.Divider />);
    }
    dropdown.pop();  /* drop last divider */
    return dropdown;
  }

};


export default NavBar;