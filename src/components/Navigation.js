import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { Link, withRouter } from "react-router-dom";


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBooks: false,
      showSettings: false,
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    const collections = this.props.collections;
    var dropdown = this.renderDropdown(collections);
    var settings = this.renderSettings();
    return (
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        {/* Brand */}
        {/* NOTE: can also use <LinkContainer to="/home"><NavBar.Brand...Brand></LinkContainer> */}
        <Navbar.Brand as={Link} to="/home">Bare Bones Bible</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Collapsable bit */}
        <Navbar.Collapse>
          <Nav className="mr-auto" onSelect={(key) => this.handleSelect(key)}>  {/*  */}
            {/* Home */}
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {/* Books */}
            {dropdown}
            {/* Settings */}
            {settings}
          </Nav>
          {/* Search */}
          <Form inline onSubmit={this.handleSearch}>
            <FormControl type="text" name="query" placeholder="Reference" className="mr-sm-2" />
            <Button type="submit" variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleSelect(code) {
    this.setState({showBooks: false});
    this.props.history.push("/books/" + code);
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: "/search",
      search: "?query=" + event.target.query.value,
    });
  }

  renderDropdown(collections) {
    var dropdown = [];
    if (collections === null) {
      dropdown = <NavDropdown.Header>Loading...</NavDropdown.Header>
    } else {
      for (const item of collections) {
        dropdown.push(<NavDropdown.Header key={item.collection}>{item.collection}</NavDropdown.Header>);
        for (const book of item.books) {
          dropdown.push(<NavDropdown.Item key={book.code} eventKey={book.code}>{book.name}</NavDropdown.Item>);
        }
        dropdown.push(<NavDropdown.Divider key={item.collection + "/div"} />);
      }
      dropdown.pop();  /* drop last divider */
    }
    return (
      <NavDropdown
        title="Books"
        show={this.state.showBooks}
        onClick={() => this.setState(state => ({showBooks: !state.showBooks}))}
        onMouseEnter={() => this.setState({showBooks: true})}
        onMouseLeave={() => this.setState({showBooks: false})}
      >
        {dropdown}
      </NavDropdown>
    );
  }

  renderSettings() {
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
    ));
    return (
      <NavDropdown
        title="Settings"
        show={this.state.showSettings}
        onClick={() => this.setState(state => ({showSettings: !state.showSettings}))}
        onMouseEnter={() => this.setState({showSettings: true})}
        onMouseLeave={() => this.setState({showSettings: false})}
      >
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
              label="Word Popups"
              defaultChecked={this.props.showPopups}
              onChange={() => this.props.handleSettingsClick("showPopups")}
            />
            <Form.Check
              type="checkbox"
              label="Transliteration"
              defaultChecked={this.props.showTranslit}
              onChange={() => this.props.handleSettingsClick("showTranslit")}
            />
            <Form.Check
              type="checkbox"
              label="Niqqud"
              defaultChecked={this.props.showNiqqud}
              onChange={() => this.props.handleSettingsClick("showNiqqud")}
            />
            <Form.Check
              type="checkbox"
              label="Cantillations"
              defaultChecked={this.props.showCantillations}
              onChange={() => this.props.handleSettingsClick("showCantillations")}
            />
          </Form>
        </div>
      </NavDropdown>
    )
  }

};


export default withRouter(Navigation);