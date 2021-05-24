import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const items = [
    {
      text: "Candidates",
      to: "/candidates",
    },
    {
      text: "Events",
      to: "/events",
    },
    {
      text: "Interviewes",
      to: "/interviews",
    },
  ];

  const listItems = items.map((el) => (
    <li className={classes.Navigation__item} key={el.text}>
      <Link className={classes.Navigation__link} to={"/admin" + el.to}>
        {el.text}
      </Link>
    </li>
  ));

  return <ul className={classes.Navigation}>{listItems}</ul>;
};

export default React.memo(Navigation);
