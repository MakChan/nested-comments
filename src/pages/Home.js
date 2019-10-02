import React, { useState, useEffect } from "react";
import { Heading, Box } from "rebass";

import http from "../utils/http";
import Post from "../components/Post";
import Loader from "../components/ContentLoader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await http("posts");
      setLoading(false);
      setPosts(result);
    };

    fetchPosts();
  }, []);

  return (
    <Box p={1}>
      <Heading fontSize={[2, 3, 4]} color="primary" as="h1" mb={3} mt={2}>
        All Posts
      </Heading>

      {isLoading && (
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      )}

      {!isLoading && posts.length === 0 && "No posts yet"}

      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Home;
