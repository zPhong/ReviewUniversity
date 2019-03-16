import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Home from './screens/Home/Home'
import UniversityDetailPage from './screens/UniversityDetail/js/UniversityDetailPage'
import Notfound from './screens/notfound'


const routing = (
  <Router>
    <div>
      <ul>
        <li>
          {/*
            within exact property the router will render only the URL is visited
          */}
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/university">
            UniversityDetailPage
          </NavLink>
        </li>
      </ul>
      <hr />
      {/*
      The Switch component will work much in the same way as the Router component
      The added functionality of Switch is that it will only render the first matched <Route/> child
      The Switch will render exactly URL matched.
      Router components render inclusively of all route matches.
      */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/university" component={UniversityDetailPage} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

