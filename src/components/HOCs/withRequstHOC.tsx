import React from "react";

export const withRequest = (WrapedComponent, request) => {
  return async ({ ...props }) => {
    const data = await request();
    return <WrapedComponent {...props} data={data} />;
  };
};
