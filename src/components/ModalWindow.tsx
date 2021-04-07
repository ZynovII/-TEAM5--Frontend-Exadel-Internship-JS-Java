import React from 'react'

import { getTheme,
  mergeStyleSets,
  FontWeights,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
} from '@fluentui/react'

const cancelIcon: IIconProps = { iconName: "Cancel" };
const ModalWindow = (props) => {

  return (
    <Modal
    isOpen={props.open}
    onDismiss={props.hideModal}
    isBlocking={false}
    containerClassName={contentStyles.container}
  >
    <div className={contentStyles.header}>
    <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close modal"
            onClick={props.hideModal}
          />
    </div>
    <div className={contentStyles.body}>
      <p>{props.text}</p>
      <PrimaryButton className="button margin2em button_center" text='Ок' onClick={props.hideModal}/>
    </div>
  </Modal>
  )
}
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    insert:'auto!important'
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "right",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    fontWeight: FontWeights.semibold,
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

export default ModalWindow