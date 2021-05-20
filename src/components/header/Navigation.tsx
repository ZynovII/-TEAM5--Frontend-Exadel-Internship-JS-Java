import React, { useMemo } from "react";
import classes from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const items = [
    {
      text: "Candidates",
      to: "#/admin/candidates",
    },
    {
      text: "Events",
      to: "#/admin/events",
    },
    {
      text: "Interviewes",
      to: "#/admin/interviews",
    },
  ];

  const listItems = items.map((el) => (
    <li className={classes.Navigation__item} key={el.text}>
      <a className={classes.Navigation__link} href={el.to} target="_blank">
        {el.text}
      </a>
    </li>
  ));

  return <ul className={classes.Navigation}>{listItems}</ul>;
};

export default Navigation;
