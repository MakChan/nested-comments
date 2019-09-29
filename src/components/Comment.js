import React, { useState } from "react";

import { Box, Text, Button, Flex } from "rebass";
import { Textarea, Input, Label } from "@rebass/forms";
import TimeAgo from "react-timeago";
import { Form, Field } from "react-final-form";

import http from "../utils/http";
import { required } from "../utils/validations";

import Reply from "./Reply";

const buttonProps = {
  fontSize: "1",
  py: 0,
  px: 1,
  fontWeight: "500",
  color: "gray",
  variant: "outline"
};

const Comment = ({ comment, hideChildComments, addChildComment, userId }) => {
  const [showReply, toggleReply] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [_comment, setComment] = useState(comment);

  const replyComment = formData => {
    addChildComment(comment, formData.text);
    toggleReply(false);
  };

  const editComment = async formData => {
    const result = await http("comments/" + _comment.id, "PUT", formData);
    setComment({ ..._comment, text: result.text, updatedAt: result.updatedAt });
    setEditing(false);
  };

  return (
    <Box
      my={3}
      p={2}
      ml={`${15 * (_comment.path.length - 1)}px`}
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
          onClick={() => hideChildComments(_comment)}
          sx={{ all: "unset", cursor: "pointer" }}
          as="button"
        >
          [
          {_comment.hideContent && _comment.childrenCount
            ? "+" + _comment.childrenCount
            : "-"}
          ]
        </Box>
      </Text>
      {!_comment.hideContent && (
        <>
          {isEditing && (
            <Form
              onSubmit={editComment}
              initialValues={{ text: _comment.text }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="text" validate={required} autoFocus={true}>
                    {({ input, meta }) => (
                      <>
                        <Textarea
                          {...input}
                          my={1}
                          width={[1, 1 / 3, 1 / 4]}
                          autoFocus={true}
                        />
                        {meta.touched && meta.error && (
                          <Box color="red">{meta.error}</Box>
                        )}
                      </>
                    )}
                  </Field>
                  <Button {...buttonProps}>save</Button>
                </form>
              )}
            </Form>
          )}
          {!isEditing && (
            <>
              <Text py={2}>{_comment.text}</Text>
              <Flex mb={1}>
                <Button
                  {...buttonProps}
                  onClick={() => toggleReply(!showReply)}
                >
                  reply
                </Button>
                {userId === _comment.userId && (
                  <Button
                    {...buttonProps}
                    ml={2}
                    onClick={() => setEditing(true)}
                  >
                    edit
                  </Button>
                )}
              </Flex>
            </>
          )}

          {showReply && <Reply handleSubmit={replyComment} autoFocus={true} />}
        </>
      )}
    </Box>
  );
};

export default Comment;
