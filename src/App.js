import './App.css';

import Book from './Book';
import Chapter from './Chapter';
import Home from './Home';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/books/:book/:chapter" children={<Chapter />} />
          <Route path="/books/:book" children={<Book />} />
          <Route path="/home" children={<Home />} />
          <Route path="/" children={<Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
