import React from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  PrimaryButton,
  FontWeights,
  Depths,
  Nav,
  Modal,
  mergeStyleSets,
  getTheme,
  IconButton,
  IIconProps,
} from "@fluentui/react";

import { useHistory } from "react-router";
import UserCircle from "../UserCircle/UserCircle";

import { useAuth } from "../../hooks/useAuth";

const cancelIcon: IIconProps = { iconName: "Cancel" };

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
        url: "",
        key: "key5",
        iconProps: {
          iconName: "SignOut",
          styles: {
            root: {
              fontSize: 20,
            },
          },
        },
        onClick: null,
      },
    ],
  },
];

export const DashboardNav = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId("signout");
  const history = useHistory();
  const clickHandler = () => history.push("/");
  const { signOut } = useAuth();
  Links[0].links[4].onClick = (e) => {
    showModal();
  };
  return (
    <div className="dash-nav">
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={() => {
          hideModal();
        }}
        isBlocking={false}
      >
        <div className={contentStyles.wrapper}>
          <div className={contentStyles.header}>
            <div className={contentStyles.header__inner}>
              <span id={titleId}>Are you sure?</span>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close modal"
                onClick={() => {
                  hideModal();
                }}
              />
            </div>
          </div>
          <div className={contentStyles.body}>
            <PrimaryButton
              onClick={() => {
                signOut();
                clickHandler();
              }}
              text="YES!"
              className="button"
            />
          </div>
        </div>
      </Modal>
      <div style={headStyle} onClick={clickHandler}>
        <UserCircle />
        <h4 className="ms-hiddenLgDown ms-fontColor-themePrimary">
          Ivan Ivanov
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

const theme = getTheme();
const contentStyles = mergeStyleSets({
  wrapper: {
    height: "176px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      fontWeight: FontWeights.semibold,
      padding: "1.5rem 12px 14px 24px",
    },
  ],
  header__inner: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: "3rem",
  },
  body: {
    overflowY: "hidden",
    textAlign: "center",
    paddingBottom: "2rem",
  },
  item: {
    marginBottom: "10px",
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
