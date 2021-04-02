import { FC } from "react";

import { CommandBar, ICommandBarItemProps }  from '@fluentui/react/lib';

const _items: ICommandBarItemProps[] = [
    {
      key: 'tasks',
      text: 'Tasks',
      style: {fontSize: '18px'}
    },
    {
      key: 'events',
      text: 'Events',
      href: '#',
      style: {fontSize: '18px'}
    },
    {
      key: 'interviewes',
      text: 'Interviewes',
      href: '#',
      style: {fontSize: '18px'}
    },
  ];

const Navigation:FC = () => {
    return (
        <CommandBar
        items={_items }
        className="ms-hiddenMdDown"
        />
    )
}


export default Navigation