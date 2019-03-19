import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './css/index.css';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import Home from './screens/Home/Home';
import UniversityDetailPage from './screens/UniversityDetail/UniversityDetailPage';
import Notfound from './screens/notfound';
import AddMoreUniversity from './screens/AddMoreUniversity/AddMoreUniversity';
import { logo } from './assets';

function renderHeader() {
  return (
    <div className="px-3 bg-dark pb-1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-0">
        <NavLink exact activeClassName="active" className="navbar-brand" to="/">
          <img src={logo} className="rounded mx-auto d-block Logo" alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <NavLink
              exact
              activeClassName="active"
              className="nav-item nav-link active"
              to="/"
            >
              Home <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/addmore"
              className="nav-item nav-link"
              href="#"
            >
              Edit
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

const routing = (
  <Router>
    {renderHeader()}
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={UniversityDetailPage} />
        <Route path="/addmore" component={AddMoreUniversity} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
