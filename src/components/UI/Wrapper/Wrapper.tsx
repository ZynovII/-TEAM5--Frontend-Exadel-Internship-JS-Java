import React from "react";
import { mergeStyleSets } from "@fluentui/react";

const styles = mergeStyleSets({
  wrapper: {
    margin: "0 auto",
    width: "73%",
    maxWidth: '1100px'
  },
  wrapper__bigger: {
    margin: "0 auto",
    width: "85%",
    maxWidth: '1150px'
  },
});

const Wrapper = (props) => {
  return (
    <div
      className={
        props.className + " " + props.bigger
                                ? styles.wrapper
                                : styles.wrapper__bigger
      }
      style={{ width: props.width }}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
