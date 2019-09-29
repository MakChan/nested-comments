import React from "react";
import { Link } from "react-router-dom";
import { Heading, Box } from "rebass";

function NoMatch() {
  return (
    <Box textAlign="center">
      <Heading mt={5} mb={3}>404 | Not found!</Heading>
      <Link to="/">Go Home</Link>
    </Box>
  );
}

export default NoMatch;
