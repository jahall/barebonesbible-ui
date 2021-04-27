import '../App.css';

import Book from './Book';
import Chapter from './Chapter';
import Home from './Home';
import ls from 'local-storage';
import NavBar from './NavBar';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function fetch(field, def) {
  /* Fetch value from local storage...or return default */
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
      enTranslations: fetch("enTranslations", ["web"]),
      showCantillations: fetch("showCantillations", false),  /* toggle for showing cantillations */
      showNiqqud: fetch("showNiqqud", true),  /* toggle for showing niqqud */
      showTranslit: fetch("showTranslit", true),  /* toggle for showing transliteration */
    };
    this.handleTranslationClick = this.handleTranslationClick.bind(this);
    this.handleCantillationsClick = this.handleCantillationsClick.bind(this);
    this.handleNiqqudClick = this.handleNiqqudClick.bind(this);
    this.handleTranslitClick = this.handleTranslitClick.bind(this);
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
            <Route path="/books/:code/:chapter" children={
              <Chapter
                enTranslations={this.state.enTranslations}
                showCantillations={this.state.showCantillations}
                showNiqqud={this.state.showNiqqud}
                showTranslit={this.state.showTranslit}
              />
            } />
            <Route path="/books/:code" children={<Book />} />
            <Route path="/home" children={<Home />} />
            <Route path="/" children={<Home />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
