import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './css/index.css';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './screens/Home/Home';
import UniversityDetailPage from './screens/UniversityDetail/UniversityDetailPage';
import NotFound from './screens/NotFound/notfound';
import { logo } from './assets';

function renderHeader() {
  return (
    <div className="px-3 bg-dark pb-1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-0">
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
          <div className="navbar-nav mr-auto">
            <NavLink exact activeClassName="active" className="nav-item nav-link active" to="/">
              Trang chủ <span className="sr-only">(current)</span>
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
        <Route exact path="/university/:universityId?" render={(props) => <UniversityDetailPage {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </div>

    <footer className="page-footer font-small blue">
      <div className="footer-copyright text-center py-3">
        Mọi góp ý liên hệ gmail:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=pmclgroup.vn@gmail.com"
        >
          {' '}
          pmclgroup.vn@gmail.com
        </a>
      </div>
    </footer>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
