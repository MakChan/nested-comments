import React, { useState, useEffect } from "react";

import { Box } from "rebass";

import NestedComment from "./NestedComment";

const Comments = props => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  return (
    <Box mb={5}>
      {comments &&
        comments.map(comment => (
          <NestedComment comment={comment} key={comment.id} user={props.user} />
        ))}
    </Box>
  );
};

export default Comments;
