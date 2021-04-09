import { PrimaryButton, IContextualMenuProps} from "@fluentui/react/lib";


const AuthBtn = (props: {isLoggedIn: boolean, showModal: any, logout: any, userName: string }) => {

  const menuProps: IContextualMenuProps = {
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

  let loginBtn;

  if (!props.isLoggedIn) {
    loginBtn = <PrimaryButton onClick={props.showModal} text="Log In" className="button" />
  } else {
    loginBtn = <PrimaryButton split menuProps={menuProps} text={props.userName} className="button" />
  }

  return loginBtn;
}


export default AuthBtn;