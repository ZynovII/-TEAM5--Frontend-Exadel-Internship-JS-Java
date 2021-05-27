import React from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
} from "@fluentui/react/lib";

import AuthBtn from "../AuthBtn/AuthBtn";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../models/ILogin";
import { useAuth } from "../../../hooks/useAuth";
import { ControlledTextField } from "../../../hook-form/Controlled";

import classes from './ButtonLog.module.scss';

const cancelIcon: IIconProps = { iconName: "Cancel" };
const registrationPattern = {
  email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i,
};

const ButtonLog: React.FC<{
  isLoggedIn: boolean;
  userName: string;
}> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId("title");
  const { signIn, signOut } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILogin>({
    reValidateMode: "onSubmit",
    mode: "all",
  });
  const onSave = (e) => {
    e.preventDefault();
    handleSubmit(
      (data) => {
        signIn(data);
      },
      (err) => {
        console.log("ошибка заполнения");
        console.log(err);
      }
    )();

    hideModal();
  };
  return (
    <div>
      <AuthBtn
        isLoggedIn={props.isLoggedIn}
        userName={props.userName}
        logout={signOut}
        showModal={showModal}
      />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
      >
        <form className={contentStyles.container} onSubmit={onSave}>
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
            <ControlledTextField
              required
              placeholder="Email"
              control={control}
              name={"email"}
              errors={errors}
              rules={{
                pattern: {
                  value: registrationPattern.email,
                  message: "Invalid email",
                },
              }}
              className={contentStyles.item}
            />
            <ControlledTextField
              placeholder="Password"
              control={control}
              errors={errors}
              name={"password"}
              value=""
              type="password"
              rules={{
                required: "This field is required",
              }}
              canRevealPassword
              className={contentStyles.item}
            />
            <button className={classes.Button}>
              <PrimaryButton text="Send" className="button" />
            </button>
          </div>
        </form>
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
