import React from "react";
import { Heading , Box} from "rebass";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <Box p={1}>
      <Heading fontSize={[2, 3, 4]} color="primary" as="h1" mb={3} mt={2}>
        All Posts
      </Heading>
      <Posts />
    </Box>
  );
};

export default Home;
