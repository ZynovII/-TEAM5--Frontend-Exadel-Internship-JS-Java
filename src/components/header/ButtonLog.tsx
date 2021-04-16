import React from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { useStore } from "../../hooks/hooks"
import { ActionTypes } from "../../context/actionTypes"
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
  TextField,
} from "@fluentui/react/lib";

import AuthBtn from './AuthBtn/AuthBtn';

const cancelIcon: IIconProps = { iconName: "Cancel" };

const ButtonLog: React.FC<{ isLoggedIn: boolean, logout: any, userName: string }> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean( false );
  const titleId = useId("title");
  const { dispatch } = useStore()
	const logIn = () => {
		dispatch( {type: ActionTypes.SIGN_IN} )
    hideModal()
	}
  return (
    <div>
      <AuthBtn isLoggedIn = {props.isLoggedIn} userName = {props.userName} logout = {props.logout} showModal = {showModal} />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Event Manager</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <TextField placeholder="Login" className={contentStyles.item} />
          <TextField
            placeholder="Password"
            type="password"
            canRevealPassword
            className={contentStyles.item}
          />
          <PrimaryButton onClick={() => logIn()} text="Send" className="button" />
        </div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.xLargePlus,

    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    textAlign: "center",
  },
  item: {
    marginBottom: "10px",
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export default ButtonLog;
