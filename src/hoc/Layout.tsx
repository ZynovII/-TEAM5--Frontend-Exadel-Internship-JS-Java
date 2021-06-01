import React, { Component } from "react";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { AdminPage } from "../pages/AdminPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import TSPage from "../components/TSPage/TSPage";
import {useAuth} from '../hooks/useAuth';

const Layout = () => {
  const { isAuth } = useAuth();

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/events" />
        </Route>
        <Route path="/events" component={MainPage} />
        {isAuth ? <Route path="/admin" component={AdminPage} /> : null}
        <Route path="/techinterview:id" component={TSPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </HashRouter>
  );
};

export default Layout;
