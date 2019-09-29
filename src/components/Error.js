import React from "react";
import { Heading, Box, Link } from "rebass";

function Error() {
  return (
    <Box textAlign="center">
      <Heading mt={5} mb={3}>Something went wrong!</Heading>
      <Link href="#" onClick={() => window.location.reload()}>
        Please try again
      </Link>
    </Box>
  );
}

export default Error;
