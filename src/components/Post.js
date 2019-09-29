import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Box, Link } from "rebass";
import TimeAgo from "react-timeago";

const Post = ({ post }) => (
  <Box mb={3}>
    <Heading fontSize={[1, 2, 2]} color="secondary">
      <Link to={`/post/${post.id}`} as={RouterLink} sx={{ color: "secondary" }}>
        {post.title}
      </Link>
    </Heading>
    <div>
      By {post.user.username} <TimeAgo date={post.createdAt} /> |{" "}
      <Link to={`/post/${post.id}`} sx={{ color: "text" }} as={RouterLink}>
        {post.commentCount} comments
      </Link>
    </div>
  </Box>
);

export default Post;
