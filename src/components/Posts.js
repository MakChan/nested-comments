import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heading, Box } from "rebass";
import TimeAgo from "react-timeago";

import http from "../utils/http";

const Post = ({ post }) => (
  <Box mb={3}>
    <Heading fontSize={[1, 2, 2]} color="secondary">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </Heading>
    <div>
      By {post.user.username} <TimeAgo date={post.createdAt} /> |{" "}
      <Link to={`/post/${post.id}`}>{post.commentCount} comments</Link>
    </div>
  </Box>
);

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await http("posts");
      setPosts(result);
    };

    fetchPosts();
  }, []);
  return (
    <div>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
