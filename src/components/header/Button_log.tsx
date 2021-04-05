import { FC } from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  DefaultButton,
  Modal,
  IconButton,
  IIconProps,
  TextField,
} from "@fluentui/react/lib";

const cancelIcon: IIconProps = { iconName: "Cancel" };

const ButtonLog: FC = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );

  const titleId = useId("title");

  return (
    <div>
      <DefaultButton onClick={showModal} text="Log In" />
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
          <DefaultButton onClick={() => console.log("send")} text="Send" />
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
