import React, { useState } from "react";

import { Box, Text, Button } from "rebass";
import TimeAgo from "react-timeago";

import Reply from "./Reply";

const Comment = ({ comment, hideChildComments, addChildComment }) => {
  const [showReply, toggleReply] = useState(false);

  const handleSubmit = formData => {
    addChildComment(comment, formData.text);
    toggleReply(false);
  };
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
        {comment.authorName} <TimeAgo date={comment.createdAt} />{" "}
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
            mb={1}
            fontWeight="500"
            color="gray"
            variant="outline"
            onClick={() => toggleReply(!showReply)}
          >
            reply
          </Button>
          {showReply && <Reply handleSubmit={handleSubmit} autoFocus={true} />}
        </>
      )}
    </Box>
  );
};

export default Comment;
