import './App.css';

import Book from './Book';
import Chapter from './Chapter';
import Home from './Home';
import NavBar from './NavBar';
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
      translations: ["kjv", "wlc", "tisch"],
      showCantillations: false,  /* toggle for showing cantillations */
      showNiqqud: true,  /* toggle for showing niqqud */
      showTranslit: true,  /* toggle for showing transliteration */
    };
    this.handleTranslationClick = this.handleTranslationClick.bind(this);
    this.handleCantillationsClick = this.handleCantillationsClick.bind(this);
    this.handleNiqqudClick = this.handleNiqqudClick.bind(this);
    this.handleTranslitClick = this.handleTranslitClick.bind(this);
  }

  handleTranslationClick(event) {
    const translation = event.target.id;
    console.log(translation);
    const index = this.state.translations.indexOf(translation);
    var translations = this.state.translations;
    if (index > -1) {  /* translation is currently selected and should be removed */
      this.setState({translations: translations.filter((_, i) => i !== index)})
    } else {  /* translation is not selected and should be added */
      this.setState(state => ({translations: [...state.translations, translation]}))
    }
  }

  handleCantillationsClick() {
    this.setState({showCantillations: !this.state.showCantillations});
  }

  handleNiqqudClick() {
    this.setState({showNiqqud: !this.state.showNiqqud});
  }

  handleTranslitClick() {
    this.setState({showTranslit: !this.state.showTranslit});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar
            translations={this.state.translations}
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
                translations={this.state.translations}
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
