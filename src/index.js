import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './css/index.css';
import Home from './screens/Home/Home';
import UniversityDetailPage from './screens/UniversityDetail/UniversityDetailPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UniversityDetailPage />, document.getElementById('root'));

serviceWorker.unregister();
