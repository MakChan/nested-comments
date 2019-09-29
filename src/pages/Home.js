import React, { useState, useEffect } from "react";
import { Heading, Box } from "rebass";

import http from "../utils/http";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await http("posts");
      setPosts(result);
    };

    fetchPosts();
  }, []);
  return (
    <Box p={1}>
      <Heading fontSize={[2, 3, 4]} color="primary" as="h1" mb={3} mt={2}>
        All Posts
      </Heading>

      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Home;
