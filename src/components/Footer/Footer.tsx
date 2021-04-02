import React from "react";
import FooterList from "./Footer_list"

import { Text } from '@fluentui/react';


const logo = require("./../../assets/img/logo.svg");

const Footer:React.FC = () => {
    return (
        <footer className="footer">
            <img src={logo.default} alt="exadel" style={styles.img}/>
            <FooterList />
            <Text style={styles.text}>&copy; 2021 Exadel, Inc.</Text>
        </footer>
    )
}

const styles={
    img: {
        margin: '3% 0',
        height: '24px',
        width: '150px'
    },
    text: {
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default Footer