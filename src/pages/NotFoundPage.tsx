import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { NotFound } from "../components/NotFound";

export const NotFoundPage = () => (
  <>
    <div className="adjustment-wrapper">
      <Header />
      <main className="main">
        <NotFound />
      </main>
      <Footer />
    </div>
  </>
);
