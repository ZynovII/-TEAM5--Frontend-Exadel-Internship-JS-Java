import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NotFound } from "../components/NotFound";

import Wrapper from "../components/UI/Wrapper/Wrapper";
import MainComponent from "../components/MainComponent";
import Event from "../components/Event";
import Scrollbar from "../components/UI/Scrollbar/Scrollbar";


export const MainPage = () => {
  return (
    <>
      <Scrollbar height="100%">
        <Header />
        <main className="main">
          <Wrapper>
            <Switch>
              <Route path="/events" exact component={MainComponent} />
              <Route path="/events/:id" component={Event} />
              <Route component={NotFound} />
            </Switch>
          </Wrapper>
        </main>
        <Footer />
      </Scrollbar>
    </>
  );
};
