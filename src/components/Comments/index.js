import React, { useState, useEffect } from "react";

import { Box } from "rebass";

import http from "../../utils/http";
import Comment from "./Comment";

const Comments = props => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  const addChildComment = async (parentComment, text) => {
    const comments_ = comments.slice();
    const index = comments_.findIndex(com => com.id === parentComment.id);

    let result = await http("comments/" + props.postId, "POST", {
      parentComment,
      text
    });
    result.authorName = props.user.username;

    comments_.splice(index + 1, 0, result);
    setComments(comments_);

    return true;
  };

  const hideChildComments = comment => {
    const comments_ = comments.slice();
    const index = comments_.findIndex(com => com.id === comment.id);

    if (!comment.hideContent) {
      comments_[index].childrenCount = 0;
      comments_[index].hideContent = true;
      for (let i = index + 1; i < comments_.length; i++) {
        if (
          comments_[i].path[0] === comment.path[0] &&
          comments_[i].depth > comment.depth
        ) {
          comments_[i].hide = true;
          if (!comments_[i].hiddenBy) {
            comments_[i].hiddenBy = comment.id;
          }
          comments_[index].childrenCount += 1;
        } else break;
      }
    } else {
      comments_[index].hideContent = false;
      for (let i = index + 1; i < comments_.length; i++) {
        if (
          comments_[i].path[0] === comment.path[0] &&
          comments_[i].depth > comment.depth
        ) {
          if (comments_[i].hiddenBy === comment.id) {
            comments_[i].hide = false;
            comments_[i].hiddenBy = undefined;
          }
        } else break;
      }
    }

    setComments(comments_);
  };

  return (
    <Box mb={5}>
      {comments &&
        comments.map(
          comment =>
            !comment.hide && (
              <Comment
                comment={comment}
                key={comment.id}
                hideChildComments={hideChildComments}
                addChildComment={addChildComment}
                userId={props.user.id}
              />
            )
        )}
    </Box>
  );
};

export default Comments;
