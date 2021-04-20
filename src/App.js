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
      showCantillations: false,  /* toggle for showing cantillations */
      showNiqqud: true,  /* toggle for showing niqqud */
      showTranslit: true,  /* toggle for showing transliteration */
    };
    this.handleCantillationsClick = this.handleCantillationsClick.bind(this);
    this.handleNiqqudClick = this.handleNiqqudClick.bind(this);
    this.handleTranslitClick = this.handleTranslitClick.bind(this);
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
            showCantillations={this.state.showCantillations}
            showNiqqud={this.state.showNiqqud}
            showTranslit={this.state.showTranslit}
            handleCantillationsClick={this.handleCantillationsClick}
            handleNiqqudClick={this.handleNiqqudClick}
            handleTranslitClick={this.handleTranslitClick}
          />
          <Switch>
            <Route path="/books/:code/:chapter" children={
              <Chapter
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
