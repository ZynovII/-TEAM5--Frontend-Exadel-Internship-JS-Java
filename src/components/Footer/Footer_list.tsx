import React from "react";

import { Text, Stack } from '@fluentui/react';

const instagram = require("./../../assets/img/instagram.svg");
const twitter = require("./../../assets/img/twitter.svg");
const faceBook = require("./../../assets/img/faceBook.png");


const Links:Array<{name: string; href: string;}>   = [
      {
        name: 'All Ivents',
        href: '#',
      },
      {
        name: 'Private Police',
        href: '#',
      },
      {
        name: 'Terms & Conditions',
        href: '#',
      },
];

const social:Array<{name: string; href: string; src: any}> = [
  {
    href: '#',
    src: faceBook,
    name: 'facebook'
  },
  {
    href: '#',
    src: instagram,
    name: 'instagram'
  },
  {
    href: '#',
    src: twitter,
    name: 'twitter'
  },
]

const FooterList:React.FC = () => {
    return (
        <Stack horizontal horizontalAlign="space-between" style={styles.container}>
            <ul>
               {Links.map((item, index) => {
                 return (
                  <li style={styles.social} key={index}>
                    <a href={item.href} className="footer__link">
                        {item.name}
                    </a>
                  </li>
                 )})
                }
            </ul>
            <Text style={styles.text}>
                Our Corporate Headquarters:
                1340 Treat Blvd. Suite 375
                Walnut Creek, CA 94597 USA
                +1 (866) 304-7961
            </Text>
            <ul>
               {social.map((item, index) => {
                 return (
                  <li style={styles.social} key={index}>
                    <a href={item.href}>
                        <img src={item.src.default} alt={item.name} style={styles.socialImg}  />
                    </a>
                  </li>
                 )})
                }
            </ul>
       </Stack>
    )
}


const styles = {
    container: {
        maxWidth: '940px', 
        margin: '0 auto'
    },
    text: {
        width: '20%'
    },
    socialImg: {
        width: '20px'
    },
    social: {
        marginBottom: '5px',
    },
  };  
export default FooterList