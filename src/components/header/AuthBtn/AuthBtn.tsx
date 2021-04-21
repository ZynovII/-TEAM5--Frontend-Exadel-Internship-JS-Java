import React from "react"
import { PrimaryButton, IContextualMenuProps} from "@fluentui/react";
import { useMemo } from "react"
import { useHistory } from "react-router";



const AuthBtn: React.FC<{isLoggedIn: boolean, showModal: any, logout: any, userName: string }> = (props) => {
  const history = useHistory();
  const menuProps: IContextualMenuProps = useMemo(() => {
    return {
      items: [
        {
          key: 'AdminPanel',
          text: 'Admin Panel',
          iconProps: { iconName: 'AdminALogoFill32' },
          onClick: () => history.push('/admin'),
        },
        {
          key: 'LogOut',
          text: 'Log Out',
          iconProps: { iconName: 'SignOut' },
          onClick: props.logout
        },
      ],
    };
  }, [])

  return (
    props.isLoggedIn
           ? <PrimaryButton menuProps={menuProps} text={props.userName} className="button" />
           : <PrimaryButton onClick={props.showModal} text="Log In" className="button" />
  )
}


export default AuthBtn;
