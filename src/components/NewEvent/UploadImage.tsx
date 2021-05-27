import React, { useEffect, useState } from "react";
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
  uploadIcon: [
    {
      color: "rgb(2,118,180)",
      margin: "0 auto",
      ":hover": { cursor: "pointer" },
    },
    iconClass,
  ],
  uploadText: { color: "#444", ":hover": { cursor: "pointer" } },
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

export const UploadImage: React.FC<{ setImageSrc: Function, eventImage:string }> = ({
  setImageSrc, eventImage
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [isUploaded, setisUploaded] = useState<boolean>(false);
  const uploadFile = (event) => {
    console.log(URL.createObjectURL(event.target.files[0]));
    setFileName(URL.createObjectURL(event.target.files[0]));
    setisUploaded(true);
    setImageSrc(event.target.files[0]);
    console.log(event.target.files[0].name)
  };

  useEffect(()=>{
    if (eventImage) {
      setFileName(eventImage); 
      setisUploaded(true);
    }
  },[])
 

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
            id={"eventImage"}
            className="input-file__input"
            onChange={(e) => uploadFile(e)}
            accept=".jpeg, .png, .gif, .bmp "
          />
          <label htmlFor="eventImage" className={contentStyles.inputLabel}>
            <FontIcon
              aria-label="FileImage"
              iconName="FileImage"
              className={classNames.uploadIcon}
            />
            <p className={classNames.uploadText}>Click to upload image</p>
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
    width: "100%",
    height: 270,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed rgb(2,118,180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 36px -6px rgba(2,118,180, 0.1) inset",
    "@media(max-width: 725px)": {
      display: "none",
    },
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
