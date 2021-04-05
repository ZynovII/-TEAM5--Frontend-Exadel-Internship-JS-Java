import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NotFound } from "../components/NotFound";

import MainComponent from "../components/MainComponent"
import Event from "../components/Event"

export const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
            <Switch>
                <Route path="/events"  exact component={MainComponent} />
                <Route path="/events/:id" component={Event} />  
					      <Route component={NotFound} />    
            </Switch>
      <Footer />
    </React.Fragment>
  );
};
