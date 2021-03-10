import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Header from 'Components/Header';
import Search from 'Routes/Search';
import Detail from 'Routes/Detail';

const Routers = () => (
  <BrowserRouter forceRefresh>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Routers;
