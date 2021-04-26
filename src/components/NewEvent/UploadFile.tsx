import React, { useState } from "react";
import { ControlledInputUpload } from "../../hook-form/Controlled";
import { useForm } from "react-hook-form";
import {
  Image,
  IImageProps,
  ImageFit,
  mergeStyleSets,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";

const imageProps: IImageProps = {
  imageFit: ImageFit.contain,
  width: "100%",
  height: "100%",
  styles: (props) => ({}),
};

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
});
const classNames = mergeStyleSets({
  uploaIcon: [{ color: "rgb(2,118,180)", margin: "0 auto" }, iconClass],
  closeIcon: {
    color: "black",
    position: "absolute",
    zIndex: 1,
    right: 15,
    top: 20,
    fontSize: 20,
    width: 20,
    height: 20,
    cursor: "pointer",
  },
});

export const UploadImage: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [isUploaded, setisUploaded] = useState<boolean>(false);
  const uploadFile = (event) => {
    setFileName(URL.createObjectURL(event.target.files[0]));
    setisUploaded(true);
  };

  const { control } = useForm({
    mode: "all",
  });

  return (
    <div className={contentStyles.imageContainer}>
      {!isUploaded ? (
        <>
          <ControlledInputUpload
            control={control}
            name={"eventImage"}
            id={"eImg"}
            className="input-file__input"
            onChange={(e) => uploadFile(e)}
          />
          <label htmlFor="eImg" className={contentStyles.inputLabel}>
            <FontIcon
              aria-label="FileImage"
              iconName="FileImage"
              className={classNames.uploaIcon}
            />
            <p style={{ color: "#444" }}>Click to upload image</p>
          </label>
        </>
      ) : (
        <div className={contentStyles.imagePreview}>
          <FontIcon
            aria-label="ChromeClose"
            iconName="ChromeClose"
            className={classNames.closeIcon}
            onClick={() => {
              setisUploaded(false);
              setFileName("");
            }}
          />
          <Image {...imageProps} src={fileName} alt="Event image" />
        </div>
      )}
    </div>
  );
};

const contentStyles = mergeStyleSets({
  imageContainer: {
    width: "40%",
    height: 270,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed rgb(2,118,180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 36px -6px rgba(2,118,180, 0.1) inset",
    '@media(max-width: 725px)': {
      display: 'none'
    }
  },
  inputLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  imagePreview: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
