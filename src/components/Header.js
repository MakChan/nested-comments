import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Button } from "rebass";

const Header = ({ user, logOut }) => {
  return (
    <Flex p={2} color="white" bg="black" alignItems="center" as="nav">
      <Link to="/" color="#FFF" mr={2} as={RouterLink}>
        Home
      </Link>
      <Link to="/post/create" color="#FFF" as={RouterLink}>
        Create Post
      </Link>
      <Box mx="auto" />
      <span>Hi {user.name}</span>
      <Button
        onClick={logOut}
        color="accent"
        sx={{
          backgroundColor: "transparent",
          padding: 0,
          fontSize: 1,
          fontWeight: 500,
          textDecoration: "underline",
          marginLeft: 2
        }}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default Header;
