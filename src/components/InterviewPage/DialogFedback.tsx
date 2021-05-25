import React, { useState } from "react";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  TextField,
  FontWeights,
  getTheme,
  mergeStyleSets,
} from "@fluentui/react/lib";

export interface IDialogFeedbackProps {
  content: string;
  isModalOpen: boolean;
  hideModal(): void;
  onSave(feedback: string): void;
  candidate: string;
}

const DialogFeedback: React.FC<IDialogFeedbackProps> = ({
  content,
  isModalOpen,
  hideModal,
  onSave,
  candidate,
}) => {
  const [feedback, setFeedback] = useState(content || "");

  const onChangeHandler = (e, text: string) => {
    setFeedback(text);
  };
  return (
    <Dialog
      hidden={!isModalOpen}
      onDismiss={hideModal}
      dialogContentProps={{
        title: candidate,
        closeButtonAriaLabel: "Close",
        type: DialogType.normal,
      }}
      modalProps={{ containerClassName: contentStyles.container }}
    >
      <div className={contentStyles.body}>
        <TextField
          placeholder="Feedback"
          name="feedback"
          multiline
          autoAdjustHeight
          resizable={true}
          rows={25}
          value={feedback}
          onChange={onChangeHandler}
        />
      </div>
      <DialogFooter>
        <PrimaryButton
          onClick={() => onSave(feedback)}
          text="Send"
          className="button"
        />
        <DefaultButton onClick={hideModal} text="Don't send" />
      </DialogFooter>
    </Dialog>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    "@media (min-width: 480px)": {
      maxWidth: 800,
      minWidth: 600,
    },
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
    overflowY: "hidden",
    textAlign: "center",
  },
  item: {
    marginBottom: "10px",
  },
});

export default React.memo(DialogFeedback);
