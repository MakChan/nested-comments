import React from "react";

import { Button } from "rebass";

const buttonProps = {
  fontSize: "1",
  py: 0,
  px: 1,
  fontWeight: "500",
  color: "gray",
  variant: "outline"
};

export default allProps => {
  const { children, ...props } = allProps;
  return (
    <Button {...buttonProps} {...props}>
      {children}
    </Button>
  );
};
