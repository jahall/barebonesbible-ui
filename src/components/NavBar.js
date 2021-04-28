import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';


class NavBar extends React.Component {
  render() {
    const collections = this.props.collections;
    var dropdown;
    if (collections === null) {
      dropdown = <NavDropdown.Header>Loading...</NavDropdown.Header>
    } else {
      dropdown = this._renderDropdown(collections)
    }
    const enTranslations = [
      {"id": "asv", "name": "ASV"},
      {"id": "kjv", "name": "KJV"},
      {"id": "web", "name": "WEB"},
      {"id": "wmb", "name": "WMB"},
    ];
    const translationOptions = enTranslations.map(t => (
      <Form.Check
        key={t.id}
        type="checkbox"
        label={t.name}
        id={t.id}
        defaultChecked={this.props.enTranslations.includes(t.id)}
        onChange={this.props.handleTranslationClick}
      />
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
            <NavDropdown title="Settings">
              <NavDropdown.Header>English Translations</NavDropdown.Header>
              <div style={{paddingLeft: '25px'}}>
                <Form>
                  {translationOptions}
                </Form>
              </div>
              <NavDropdown.Divider />
              <NavDropdown.Header>View Options</NavDropdown.Header>
              <div style={{paddingLeft: '25px'}}>
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
              </div>
            </NavDropdown>
          </Nav>
          <Form inline action="/search">
            <FormControl type="text" name="query" placeholder="Passage" className="mr-sm-2" />
            <Button type="submit" variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  _renderDropdown(collections) {
    var dropdown = [];
    for (const item of collections) {
      dropdown.push(<NavDropdown.Header key={item.collection}>{item.collection}</NavDropdown.Header>);
      for (const book of item.books) {
        dropdown.push(<NavDropdown.Item key={book.code} href={"/books/" + book.code}>{book.name}</NavDropdown.Item>);
      }
      dropdown.push(<NavDropdown.Divider key={item.collection + "/div"} />);
    }
    dropdown.pop();  /* drop last divider */
    return dropdown;
  }

};


export default NavBar;