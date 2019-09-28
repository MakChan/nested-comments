import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Heading, Box, Text, Button, Flex } from "rebass";
import { Label, Textarea } from "@rebass/forms";
import TimeAgo from "react-timeago";

import http from "../utils/http";

const Comment = ({ comment, hideChildComments }) => {
  const [showTextbox, toggleTextbox] = useState(false);
  return (
    <Box
      my={3}
      p={2}
      ml={`${15 * (comment.path.length - 1)}px`}
      sx={{
        borderLeft: "2px solid #777777",
        boxShadow: "1px 1px 10px #d6d6d673"
      }}
    >
      <Text color="text">
        {comment.authorname} <TimeAgo date={comment.createdat} />{" "}
        <Box
          onClick={() => hideChildComments(comment)}
          sx={{ all: "unset", cursor: "pointer" }}
          as="button"
        >
          [
          {comment.hideContent && comment.childrenCount
            ? "+" + comment.childrenCount
            : "-"}
          ]
        </Box>
      </Text>
      {!comment.hideContent && (
        <>
          <Text py={1}>{comment.text}</Text>
          <Button
            fontSize="1"
            py={0}
            px={1}
            fontWeight="500"
            color="gray"
            variant="outline"
            onClick={() => toggleTextbox(!showTextbox)}
          >
            reply
          </Button>
          {showTextbox && (
            <Box>
              <Textarea name="comment" width={[1, 1 / 2, 1 / 3]} />
              <Button mt={2} p={1} fontWeight="500" variant="secondary">
                Add Comment
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

function PostPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async postId => {
      const result = await http("posts/" + postId);
      setPost(result);
    };

    fetchPost(postId);
  }, [postId]);

  const postComment = async (parentComment, text) => {
    const result = await http("comments/" + post.id, "POST", {
      parentComment,
      text
    });
  };

  const hideChildComments = comment => {
    // TODO: Would it be better if index is passed from the comments list?

    const comments = post.comments.slice();
    const index = comments.findIndex(com => com.id === comment.id);
    if (!comment.hideContent) {
      comments[index].childrenCount = 0;
      comments[index].hideContent = true;
      for (let i = index + 1; i < comments.length; i++) {
        if (comments[i].path[0] === comment.path[0]) {
          comments[i].hide = true;
          comments[index].childrenCount += 1;
        } else break;
      }
    } else {
      comments[index].hideContent = false;
      for (let i = index + 1; i < comments.length; i++) {
        if (comments[i].path[0] === comment.path[0]) {
          comments[i].hide = false;
        } else break;
        if (comments[i].hideContent) break;
      }
    }
    setPost({ ...post, comments: comments });
  };

  if (!post) return "Loading";

  return (
    <>
      <Box my={3}>
        <Heading fontSize={[2, 2, 3]} mb={1} color="secondary">
          {post.title}
        </Heading>
        <div>
          By {post.user.username} <TimeAgo date={post.createdAt} /> |{" "}
          {post.comments.length} comments
        </div>
        <Text mt={2} fontSize={1}>
          {post.text}
        </Text>
      </Box>

      <Flex flexDirection="column" alignItems="flex-start" as="form">
        <Textarea name="comment" width={[1, 1 / 2, 1 / 3]} />
        <Button mt={2} p={1} variant="secondary">
          Add Comment
        </Button>
      </Flex>
      <hr />

      {post.comments &&
        post.comments.map(
          comment =>
            !comment.hide && (
              <Comment
                comment={comment}
                key={comment.id}
                hideChildComments={hideChildComments}
              />
            )
        )}
    </>
  );
}

export default PostPage;
