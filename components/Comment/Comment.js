import React, { useState } from "react";
import { Comment as AntComment, Avatar, Tooltip } from "antd";
import Link from "next/link";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  UserOutlined,
} from "@ant-design/icons";

const Comment = ({
  author,
  comment,
  avatar,
  children,
  action,
  dislikes = 0,
  likes = 0,
  reply = true,
  onLike,
  onDislike,
  onReply,
  authorId,
}) => {
  const [likesLocal, setLikesLocal] = useState(likes);
  const [dislikesLocal, setDislikesLocal] = useState(dislikes);
  const [myAction, setMyAction] = useState(action);

  const likeHandler = () => {
    if (myAction === "liked") {
      onLike();
      setLikesLocal(likesLocal - 1);
      setMyAction(false);
    } else if (myAction === "disliked") {
      onLike();
      setLikesLocal(likesLocal + 1);
      setDislikesLocal(dislikesLocal - 1);
      setMyAction("liked");
    } else {
      onLike();
      setLikesLocal(likesLocal + 1);
      setMyAction("liked");
    }
  };

  const dislikeHandler = () => {
    if (myAction === "disliked") {
      onDislike();
      setDislikesLocal(dislikesLocal - 1);
      setMyAction(false);
    } else if (myAction === "liked") {
      onDislike();
      setDislikesLocal(dislikesLocal + 1);
      setLikesLocal(likesLocal - 1);
      setMyAction("disliked");
    } else {
      onDislike();
      setDislikesLocal(dislikesLocal + 1);
      setMyAction("disliked");
    }
  };

  const actions = [
    <Tooltip title="like">
      <span onClick={likeHandler}>
        {React.createElement(myAction === "liked" ? LikeFilled : LikeOutlined)}
        <span style={{ marginLeft: 5 }}>{likesLocal}</span>
      </span>
    </Tooltip>,
    <Tooltip title="dislike">
      <span onClick={dislikeHandler}>
        {React.createElement(
          myAction === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span style={{ marginLeft: 5 }}>{dislikesLocal}</span>
      </span>
    </Tooltip>,
    reply && <span onClick={onReply}>Reply to</span>,
  ];

  return (
    <AntComment
      actions={actions}
      author={
        <Link href={`/user/${authorId}`}>
          <a>{author}</a>
        </Link>
      }
      avatar={
        <Link href={`/user/${authorId}`}>
          <Avatar icon={<UserOutlined />} src={avatar || null} alt={author} />
        </Link>
      }
      content={<p>{comment}</p>}
    >
      {children}
    </AntComment>
  );
};

export default Comment;
