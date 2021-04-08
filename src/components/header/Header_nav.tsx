import React from "react";
import { useHistory } from "react-router";

import { CommandBar, ICommandBarItemProps } from "@fluentui/react/lib";

const Navigation: React.FC = () => {
  const history = useHistory();
  const _items: ICommandBarItemProps[] = [
    {
      key: "candidates",
      text: "Candidates",
      style: { fontSize: "18px" },
      onClick: () => history.push('/admin/candidates'),
    },
    {
      key: "events",
      text: "Events",
      onClick: () => history.push('/admin/events'),
      style: { fontSize: "18px" },
    },
    {
      key: "interviewes",
      text: "Interviewes",
      onClick: () => history.push('/admin/interviews'),
      style: { fontSize: "18px" },
    },
  ];
  
  return <CommandBar items={_items} className="ms-hiddenMdDown" style={{minWidth:'500px' }}/>;
};

export default Navigation;
