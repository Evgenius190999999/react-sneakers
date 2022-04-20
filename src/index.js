import { BrowserRouter as Router, Route } from "react-router-dom";

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import 'macro-css';

import App from './App';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Route>
        <App/>
      </Route>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);
