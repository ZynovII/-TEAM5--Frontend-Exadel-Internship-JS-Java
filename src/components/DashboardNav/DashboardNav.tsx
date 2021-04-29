import React from "react";
import { Depths, Nav } from "@fluentui/react";

// import Signout from "../AdminPanel/Signout/Signout";

import { useHistory } from "react-router";

import { useStore } from "../../hooks/hooks";
import { ActionTypes } from "../../context/actionTypes";

const Logo = require("../../assets/img/exadel-logo-dash.png");

const Links = [
  {
    links: [
      {
        name: "Events",
        url: "/admin/events",
        key: "key1",
        iconProps: {
          iconName: "Event",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
      },
      {
        name: "Candidates",
        url: "/admin/candidates",
        key: "key2",
        iconProps: {
          iconName: "Group",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
      },
      {
        name: "Interviews",
        url: "/admin/interviews",
        key: "key3",
        iconProps: {
          iconName: "CalendarWeek",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
      },
      {
        name: "Archive",
        url: "/admin/archive",
        key: "key4",
        iconProps: {
          iconName: "Archive",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
      },
      {
        name: "Sign out",
        key: "key5",
        onClick: () => {},
        iconProps: {
          iconName: "SignOut",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
      },
    ],
  },
];

const dashboardStyles = {
  root: {
    boxSizing: "border-box",
    overflowY: "auto",
    paddingTop: "5vh",
  },
};
const logoStyle = {
  borderRadius: "50%",
  boxShadow: Depths.depth8,
  width: "4vw",
};
const headStyle = {
  padding: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};

export const DashboardNav = () => {
  const { state, dispatch } = useStore();

  const history = useHistory();

  const signout = () => {
    dispatch({ type: ActionTypes.SIGN_OUT });
    clickHadler();
  };

  Links[0].links[4].onClick = () => {
    signout();
  };

  const clickHadler = () => history.push("/");
  return (
    <div className="dash-nav">
      <div style={headStyle} onClick={clickHadler}>
        <img src={Logo.default} alt="logo" width="50" style={logoStyle} />
        <h4 className="ms-hiddenLgDown ms-fontColor-themePrimary">
          RecruitStyle
        </h4>
      </div>
      <Nav
        groups={Links}
        styles={dashboardStyles}
        onLinkClick={(eo, elem) => {
          eo.preventDefault();
          history.push(elem.url);
        }}
      />
    </div>
  );
};
