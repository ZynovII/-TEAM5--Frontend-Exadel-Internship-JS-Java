import React from "react";
import { Route, Switch } from "react-router";

import { DashboardNav } from "../components/DashboardNav/DashboardNav";

import "./AdminPage.scss";

export const AdminPage = () => {
    return (
        <div className="admin-page ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg2 ms-depth-8">
                    <DashboardNav />
                </div>
                <div className="ms-Grid-col ms-sm10 ms-xl10 main-element">
                    <div className="ms-Grid-row">
                        <div className="dashboard__title">
                            <h3 style={{ marginBottom: 0 }}>Welcome, User!</h3>
                            <span className="ms-fontSize-16">
                                HR specialist
                            </span>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        //Your components//
                        <Switch>
                            <Route
                                path="/admin"
                                exact
                                component={() => <h1>Main</h1>}
                            />
                            <Route
                                path="/admin/events"
                                exact
                                component={() => <h1>Events</h1>}
                            />
                            <Route
                                path="/admin/candidates"
                                component={() => <h1>Candidates</h1>}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};
