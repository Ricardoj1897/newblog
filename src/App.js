import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Crud from '../src/components/Crud/Crud';
import Read from '../src/components/Read/Read';
import Header from '../src/components/Header/Header'

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Crud} />
          <Route exact path="/:id" component={Read} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
