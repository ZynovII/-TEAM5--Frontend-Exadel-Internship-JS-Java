import { FC } from "react";

import { Stack } from '@fluentui/react/lib';

import HeaderNav from './Header_nav'
import ButtonLog from './Header_login'

const logo = require("./../../assets/img/logo.svg");

const Header:FC = () => {
    return (
        <Stack horizontal horizontalAlign="space-between" >
            <img src={logo.default} height="24" width="150" alt="exadel"/>
            <HeaderNav/>
            <ButtonLog />
        </Stack>
    )    
}
 
export default Header;