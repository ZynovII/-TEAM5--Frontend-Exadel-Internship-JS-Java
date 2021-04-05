import React, { useEffect, useState } from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";

export const withRequest = (WrapedComponent, request) => {
  return ({ ...props }) => {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      request.then((res) => {
        setData(JSON.parse(res));
        setLoading(false);
      });
    }, []);
    return isLoading ? (
      <Spinner size={SpinnerSize.large} />
    ) : (
      <WrapedComponent {...props} data={data} />
    );
  };
};
