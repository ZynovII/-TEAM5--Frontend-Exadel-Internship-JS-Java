import { PrimaryButton, IContextualMenuProps} from "@fluentui/react";
import { useMemo } from "react"


const AuthBtn = (props: {isLoggedIn: boolean, showModal: any, logout: any, userName: string }) => {

  const menuProps: IContextualMenuProps = useMemo(() => {
    return {
      items: [
        {
          key: 'AdminPanel',
          text: 'Admin Panel',
          iconProps: { iconName: 'AdminALogoFill32' },
          href: '/admin'
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
           ? <PrimaryButton split menuProps={menuProps} text={props.userName} className="button" />
           : <PrimaryButton onClick={props.showModal} text="Log In" className="button" />
  )
}


export default AuthBtn;
