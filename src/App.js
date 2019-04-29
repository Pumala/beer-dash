import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BeerDash from './components/BeerDash/BeerDash';
import NotFound from './components/NotFound/NotFound';
import Detail from './components/Detail/Detail';
import './App.scss';

const App = () => {
  return (
    <Router>
      <section>
        <Switch>
          <Route path="/" component={BeerDash} exact />
          <Route path="/beers/:beerId" component={Detail} />
          <Route component={ NotFound } />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
