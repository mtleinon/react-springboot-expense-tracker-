import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppNav from './components/AppNav';
import Category from './pages/Categories';
import Home from './pages/Home';
import Expenses from './pages/Expenses';

export default function App() {
  return (
    <Router>
      <AppNav />

      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/categories' exact={true} component={Category} />
        <Route path='/expenses' exact={true} component={Expenses} />
      </Switch>
    </Router>
  );
}