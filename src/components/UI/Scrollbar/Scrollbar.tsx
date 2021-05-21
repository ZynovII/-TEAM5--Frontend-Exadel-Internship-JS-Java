import React, { useEffect, useState } from "react";
import { mergeStyleSets } from "@fluentui/react";
import { Scrollbars } from "react-custom-scrollbars";
import {useApplicants} from "../../../hooks/useApplicants"
import { useIsMountedRef } from "../../../hooks/useIsMounted";
import { useHistory, useLocation } from 'react-router-dom'

const styles = mergeStyleSets({
  Scrollbar: {
    backgroundColor: "rgba(0,0,0, .2)",
    zIndex: 9999,
  },
});

const Scrollbar: React.FC<{ height: string }> = (props) => {

  const [currentPage, setCurrentPage] = useState(0)
  const [fetching, setFetching] = useState(true)
  const {fetchApplicants} = useApplicants()
  const isMountedRef = useIsMountedRef();
  const url = useHistory()
 

  useEffect(()=>{
    if (fetching){
    if (url.location.pathname=="/admin/candidates")    {
      console.log(url.location.pathname);
      fetchApplicants(currentPage, 14, isMountedRef.current);
  setCurrentPage(prevState=>prevState+1)
  setFetching(false);}
  }
  },[fetching, url.location.pathname])

  const onScroll = (e)=>{
    if (e.target.scrollHeight-(e.target.scrollTop+window.innerHeight)<1) 
    setFetching(true)}

  return (
  <Scrollbars
    onScroll={(e)=>onScroll(e)}
    style={{ width: "100%", height: `${props.height}` }}
    autoHide
    renderThumbVertical={(props) => (
      <div {...props} className={styles.Scrollbar} />
    )}
  >
    {props.children}
  </Scrollbars>
);}

export default Scrollbar;
