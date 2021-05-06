import '../App.css';

import Book from './Book';
import Home from './Home';
import Navigation from './Navigation';
import Passage from './Passage';
import Search from './Search';
import SearchTerm from "./SearchTerm";
import { createBookAliases, createBookLookup, localLoad } from './helpers';

import ls from 'local-storage';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
      bookLookup: null,
      bookAliases: null,
      strongsLookup: null,
      enTranslations: localLoad("enTranslations", ["web"]),
      showPopups: localLoad("showPopups", true),  /* toggle for strongs popups */
      showTranslit: localLoad("showTranslit", true),  /* toggle for showing transliteration */
      showCantillations: localLoad("showCantillations", false),  /* toggle for showing cantillations */
      showNiqqud: localLoad("showNiqqud", true),  /* toggle for showing niqqud */
    };
    this.handleTranslationClick = this.handleTranslationClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  async componentDidMount() {
    /* Load dropdown menu and other book metadata */
    const collections = await fetch("https://api.barebonesbible.com/books").then(res => res.json());
    const bookAliases = createBookAliases(collections);
    const bookLookup = createBookLookup(collections);
    this.setState({
      collections: collections,
      bookAliases: bookAliases,
      bookLookup: bookLookup,
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

  handleSettingsClick(field) {
    const toggled = !this.state[field];
    this.setState({[field]: toggled});
    ls.set(field, toggled);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navigation
            collections={this.state.collections}
            enTranslations={this.state.enTranslations}
            showPopups={this.state.showPopups}
            showTranslit={this.state.showTranslit}
            showCantillations={this.state.showCantillations}
            showNiqqud={this.state.showNiqqud}
            handleTranslationClick={this.handleTranslationClick}
            handleSettingsClick={this.handleSettingsClick}
          />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/books/:code/:start/:end">
              <Passage
                bookLookup={this.state.bookLookup}
                strongsLookup={this.state.strongsLookup}
                enTranslations={this.state.enTranslations}
                showPopups={this.state.showPopups}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            </Route>
            <Route path="/books/:code/:chapter">
              <Passage
                bookLookup={this.state.bookLookup}
                strongsLookup={this.state.strongsLookup}
                enTranslations={this.state.enTranslations}
                showPopups={this.state.showPopups}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            </Route>
            <Route path="/books/:code">
              <Book 
                bookLookup={this.state.bookLookup}
              />
            </Route>
            <Route path="/search/:term">
              <SearchTerm
                strongsLookup={this.state.strongsLookup}
                enTranslations={this.state.enTranslations}
                showPopups={this.state.showPopups}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            </Route>
            <Route path="/search">
              <Search bookAliases={this.state.bookAliases} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
