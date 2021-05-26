import React, { useEffect, useState } from "react";
import { mergeStyleSets } from "@fluentui/react";
import { Scrollbars } from "react-custom-scrollbars";
import { useApplicants } from "../../../hooks/useApplicants";
import { useIsMountedRef } from "../../../hooks/useIsMounted";
import { useHistory} from "react-router-dom";
import { useLoader } from "../../../hooks/hooks";
import { useStore } from "../../../hooks/hooks";

const styles = mergeStyleSets({
  Scrollbar: {
    backgroundColor: "rgba(0,0,0, .2)",
    zIndex: 9999,
  },
});

const Scrollbar: React.FC<{ height: string }> = (props) => {
  const { state } = useStore();
  const { loading, showLoader } = useLoader();
  const [currentPage, setCurrentPage] = useState(0);
  const { fetchApplicants } = useApplicants();
  const isMountedRef = useIsMountedRef();
  const url = useHistory();
  const [totalCount,setTotalCount]=useState(0)

  useEffect(() => {
    if (url.location.pathname == "/admin/candidates") {
      showLoader();
      fetchApplicants(0, 14).then((cb) => {
        if (isMountedRef.current) {
          const total=cb();
          setTotalCount(total)
          }
        setCurrentPage(1);
      });
    }
  }, [url.location]);

  const onScroll = (e) => {
    if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 1 && Object.keys(state.applicants).length<totalCount)
      fetchApplicants(currentPage, 14).then((cb) => {
        if (isMountedRef.current) {
          cb();
          const total=cb();
          setTotalCount(total)
          console.log(Object.keys(state.applicants).length)
          console.log(totalCount)
        }
        setCurrentPage((prevState) => prevState + 1);
      });
  };

  return (
    <Scrollbars
      onScroll={(e) => onScroll(e)}
      style={{ width: "100%", height: `${props.height}` }}
      autoHide
      renderThumbVertical={(props) => (
        <div {...props} className={styles.Scrollbar} />
      )}
    >
      {props.children}
    </Scrollbars>
  );
};

export default Scrollbar;
