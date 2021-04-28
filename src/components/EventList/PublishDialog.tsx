import React from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";

const dialogStyles = { main: { maxWidth: 500 } };
const dialogContentProps = {
  type: DialogType.normal,
  title: "Attention",
  closeButtonAriaLabel: "Close",
  subText: "Are you sure you want to publish this event?",
};
interface IDialogProps {
  hideDialog: boolean;
  toggleHideDialog: any;
  apdateData: Function;
}
export const PublishDialog: React.FunctionComponent<IDialogProps> = ({
  hideDialog,
  toggleHideDialog,
  apdateData,
}) => {
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              apdateData(true);
              toggleHideDialog();
            }}
            text="Publish"
          />
          <DefaultButton onClick={toggleHideDialog} text="Don't publish" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
