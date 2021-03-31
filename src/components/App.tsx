import { hot } from "react-hot-loader/root";
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./../assets/scss/App.scss";

import Events from './Pages/events';


import { Nav, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

const app = () => {
  const [eventState] = React.useState({
    events: {
      '1': {
        title: "Internship JS & Java",
        date: "01.03.2021 - 15.04.2021, Belarus"
      }
    }
  })
return (
  <Router>
    <header>header</header>
    {/* <Nav
          selectedKey="key3"
          ariaLabel="Nav basic example"
          styles={navStyles}
          groups={navLinkGroups}
        /> */}
    <main>
      <Switch>
        <Route path='/events'>
          <Events title={eventState.events['1'].title} date={eventState.events[1].date} />
        </Route>
        <Route path='/'>
          <h2>Main Page</h2>
        </Route>
      </Switch>
    </main>
    <footer>footer</footer>
  </Router >
);

}


export default hot(app);
