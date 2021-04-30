import React from "react";
import { Route, Switch } from "react-router";

import "./AdminPage.scss";

import { NotFound } from "../components/NotFound";
import { DashboardNav } from "../components/DashboardNav/DashboardNav";
import ApplicantList from "../components/applicant-list/ApplicantList";
import InterviewList from "../components/InterviewsList/InterviewsList";
import EventList from "../components/EventList/EventList";
import { CandidatePage } from "../components/CandidatePage/CandidatePage";
import { ArchiveEventList } from "../components/ArchivePage/ArchivePage";

export const AdminPage = () => {
  return (
    <div className="admin-page ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg2 ms-depth-8">
          <DashboardNav />
        </div>
        <div className="ms-Grid-col ms-sm10 ms-xl10 main-element">
          <div className="ms-Grid-row">
            <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
              <Switch>
                <Route path="/admin" exact component={() => <h1>Main</h1>} />
                <Route path="/admin/events" component={() => <EventList />} />
                <Route
                  path="/admin/candidates"
                  exact
                  component={ApplicantList}
                />
                <Route
                  path="/admin/candidates/:name"
                  component={CandidatePage}
                />
                <Route
                  path="/admin/interviews"
                  exact
                  component={InterviewList}
                />
                <Route
                  path="/admin/interviews/:name"
                  component={CandidatePage}
                />
                <Route path="/admin/archive" component={ArchiveEventList} />
                <Route
                  path="/admin/signout"
                  component={() => <h1>SignOut</h1>}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
