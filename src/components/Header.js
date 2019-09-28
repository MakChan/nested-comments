import React from "react";
import { Box, Flex, Link, Heading, Text, Button } from "rebass";

const Header = ({ user, logOut }) => {
  return (
    <Flex px={2} color="white" bg="black" alignItems="center" as="nav">
      {/* <Text p={2} fontWeight="bold">
        Nested Comments
      </Text> */}
      <span>Hi {user.name}</span>
      <Box mx="auto" />
      {/* <Link variant="nav" href="#!">
        Posts
      </Link> */}
      <Button
        onClick={logOut}
        color="accent"
        sx={{ backgroundColor: "transparent" }}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default Header;
