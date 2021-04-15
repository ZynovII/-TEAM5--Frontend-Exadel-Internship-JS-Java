import React from "react";

import {
  mergeStyleSets
} from '@fluentui/react'

import { Scrollbars } from "react-custom-scrollbars";

const styles = mergeStyleSets({
  Scrollbar: {
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex: 9999
  }
})

const Scrollbar = props => (
  <Scrollbars
    style={{ width: "100%", height: "100vh" }}
    autoHide
    renderThumbVertical={(props) => (
      <div
        {...props}
        className={styles.Scrollbar}
      />
    )}
  >
    {props.children}
  </Scrollbars>
)

export default Scrollbar;