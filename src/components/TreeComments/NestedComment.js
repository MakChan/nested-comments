import React, { useState } from "react";

import { Box, Text, Flex } from "rebass";
import TimeAgo from "react-timeago";

import http from "../../utils/http";

import Reply from "../Reply";
import TextWithEdit from "../TextWithEdit";

import LinkButton from "../LinkButton";
import CommentLoader from "../ContentLoader";

function NestedComment({ comment, user }) {
  const [showReply, toggleReply] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [_comment, setComment] = useState(comment);

  const replyComment = async formData => {
    toggleReply(false);
    setLoading(true);

    let result = await http("comments/" + _comment.postId, "POST", {
      parentComment: _comment,
      text: formData.text
    });
    result.authorName = user.username;

    let children = _comment.children || [];
    children.push(result);

    setComment({ ..._comment, children });
    setLoading(false);
  };

  const editComment = async formData => {
    const result = await http("comments/" + _comment.id, "PUT", formData);
    setComment({ ..._comment, text: result.text, updatedAt: result.updatedAt });
    setEditing(false);
  };

  const nestedComments = (_comment.children || []).map(comment => (
    <NestedComment key={comment.id} comment={comment} user={user} />
  ));

  return (
    <>
      <Box my={3} ml="20px">
        <Box
          p={2}
          sx={{
            borderLeft: "2px solid #777777",
            boxShadow: "1px 1px 10px #d6d6d673"
          }}
        >
          <Text color="text">
            {_comment.authorName} <TimeAgo date={_comment.createdAt} />{" "}
            {_comment.createdAt !== _comment.updatedAt && (
              <Text fontSize="12px" as="span">
                (updated <TimeAgo date={_comment.updatedAt} />)
              </Text>
            )}{" "}
            <Box
              onClick={() => setHidden(!isHidden)}
              sx={{ all: "unset", cursor: "pointer" }}
              as="button"
            >
              [
              {isHidden && _comment.children
                ? "+" + _comment.children.length
                : "-"}
              ]
            </Box>
          </Text>
          {!isHidden && (
            <>
              <TextWithEdit
                isEditing={isEditing}
                onSubmit={editComment}
                text={_comment.text}
              />
              {!isEditing && (
                <>
                  <Flex mb={1}>
                    <LinkButton onClick={() => toggleReply(!showReply)}>
                      reply
                    </LinkButton>
                    {user.id === _comment.userId && (
                      <LinkButton ml={2} onClick={() => setEditing(true)}>
                        edit
                      </LinkButton>
                    )}
                  </Flex>
                </>
              )}
              {showReply && (
                <Reply handleSubmit={replyComment} autoFocus={true} />
              )}
            </>
          )}
        </Box>
        {isLoading && <CommentLoader style={{ marginLeft: "10px" }} />}
        <div style={{ display: isHidden ? "none" : "block" }}>
          {nestedComments}
        </div>
      </Box>
    </>
  );
}

export default NestedComment;
