import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './css/index.css';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Home from './screens/Home/Home'
import UniversityDetailPage from './screens/UniversityDetail/UniversityDetailPage'
import Notfound from './screens/notfound'
import AddMoreUniversity from "./screens/AddMoreUniversity/AddMoreUniversity";


const routing = (
  <Router>
    <div>
      {/*
      The Switch component will work much in the same way as the Router component
      The added functionality of Switch is that it will only render the first matched <Route/> child
      The Switch will render exactly URL matched.
      Router components render inclusively of all route matches.
      */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/*<Route path="/university" component={UniversityDetailPage} />*/}
        <Route path="/addmore" component={AddMoreUniversity} />
        <Route path="/:id" component={UniversityDetailPage}/>
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

