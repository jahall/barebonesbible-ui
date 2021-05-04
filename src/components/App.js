import '../App.css';

import Book from './Book';
import Home from './Home';
import NavBar from './NavBar';
import Passage from './Passage';
import Search from './Search';
import { createBookAliases } from './aliases';

import ls from 'local-storage';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function load(field, def) {
  /* Load value from local storage...or return default */
  var value = ls.get(field);
  if (value === undefined || value === null) {
    value = def;
  }
  return value;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
      bookAliases: null,
      strongsLookup: null,
      enTranslations: load("enTranslations", ["web"]),
      showCantillations: load("showCantillations", false),  /* toggle for showing cantillations */
      showNiqqud: load("showNiqqud", true),  /* toggle for showing niqqud */
      showTranslit: load("showTranslit", true),  /* toggle for showing transliteration */
    };
    this.handleTranslationClick = this.handleTranslationClick.bind(this);
    this.handleCantillationsClick = this.handleCantillationsClick.bind(this);
    this.handleNiqqudClick = this.handleNiqqudClick.bind(this);
    this.handleTranslitClick = this.handleTranslitClick.bind(this);
  }

  async componentDidMount() {
    /* Load dropdown menu from the api */
    const collections = await fetch("https://api.barebonesbible.com/books").then(res => res.json());
    const bookAliases = createBookAliases(collections);
    this.setState({
      collections: collections,
      bookAliases: bookAliases,
    })
    /* Load strongs */
    const strongsLookup = await fetch("https://api.barebonesbible.com/strongs").then(res => res.json());
    this.setState({
      strongsLookup: strongsLookup,
    })
  }

  handleTranslationClick(event) {
    const translation = event.target.id;
    const enTranslations = this.state.enTranslations;
    const index = enTranslations.indexOf(translation);
    var newEnTranslations;
    if (index > -1) {  /* translation is currently selected and should be removed */
      newEnTranslations = enTranslations.filter((_, i) => i !== index);
    } else {  /* translation is not selected and should be added */
      newEnTranslations = [...enTranslations, translation];
    }
    this.setState({enTranslations: newEnTranslations});
    ls.set("enTranslations", newEnTranslations);
  }

  handleCantillationsClick() {
    const newShow = !this.state.showCantillations;
    this.setState({showCantillations: newShow});
    ls.set("showCantillations", newShow);
  }

  handleNiqqudClick() {
    const newShow = !this.state.showNiqqud;
    this.setState({showNiqqud: newShow});
    ls.set("showNiqqud", newShow);
  }

  handleTranslitClick() {
    const newShow = !this.state.showTranslit;
    this.setState({showTranslit: newShow});
    ls.set("showTranslit", newShow);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar
            collections={this.state.collections}
            enTranslations={this.state.enTranslations}
            showCantillations={this.state.showCantillations}
            showNiqqud={this.state.showNiqqud}
            showTranslit={this.state.showTranslit}
            handleTranslationClick={this.handleTranslationClick}
            handleCantillationsClick={this.handleCantillationsClick}
            handleNiqqudClick={this.handleNiqqudClick}
            handleTranslitClick={this.handleTranslitClick}
          />
          <Switch>
            <Route path="/books/:code/:start/:end">
              <Passage
                strongsLookup={this.state.strongsLookup}
                enTranslations={this.state.enTranslations}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            </Route>
            <Route path="/books/:code/:chapter">
              <Passage
                strongsLookup={this.state.strongsLookup}
                enTranslations={this.state.enTranslations}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            </Route>
            <Route path="/books/:code">
              <Book />
            </Route>
            <Route path="/search">
              <Search bookAliases={this.state.bookAliases} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
