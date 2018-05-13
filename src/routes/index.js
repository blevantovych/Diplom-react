import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import ComparisonDiscrete from '../components/ComparisonDiscrete';
import Comparison from '../components/Comparison';
import LS from '../components/LS';
import LSDiscrete from '../components/LSDiscrete';
import Minmax from '../components/Minmax';
import MinmaxDiscrete from '../components/MinmaxDiscrete';

const history = createBrowserHistory();

const NavBar = () => (
  <ul>
    <li>
      <Link to="/comparisonDiscrete">Comparison discrete</Link>
    </li>
    <li>
      <Link to="/comparison">Comparison</Link>
    </li>
    <li>
      <Link to="/ls">ls</Link>
    </li>
    <li>
      <Link to="/lsDiscrete">lsDiscrete</Link>
    </li>
    <li>
      <Link to="/minmax">minmax</Link>
    </li>
    <li>
      <Link to="/minmax-discrete">minmax-discrete</Link>
    </li>
  </ul>
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/comparisonDiscrete" component={ComparisonDiscrete} />
      <Route path="/comparison" component={Comparison} />ґ
      <Route path="/ls" component={LS} />
      <Route path="/lsDiscrete" component={LSDiscrete} />
      <Route path="/minmax" component={Minmax} />
      <Route path="/minmax-discrete" component={MinmaxDiscrete} />
      <Route path="/" component={NavBar} />
    </Switch>
  </Router>
);

export default Routes;
