import React from "react";
import * as style from "./PostHeader.module.css";
import { UserOutlined } from "@ant-design/icons";
import { MdTurnedInNot } from "@react-icons/all-files/md/MdTurnedInNot";
import { MdTurnedIn } from "@react-icons/all-files/md/MdTurnedIn";
import Rating from "../Rating/Rating";
import { Avatar, Typography, Tooltip } from "antd";
import Container from "../Container/Container";
import Link from "next/link";
import { useRouter } from "next/router";

const PostHeader = ({
  author,
  avatar,
  date,
  readTime,
  title,
  likes,
  dislikes,
  action,
  onAddLike,
  onDeleteLike,
  onAddDislike,
  onDeleteDislike,
  onSavePost,
  onDeleteSavedPost,
  isPostSaved,
}) => {
  const router = useRouter();
  const { Title, Text } = Typography;
  return (
    <div className={style.header}>
      <Container sm>
        <Title
          style={{ fontSize: 45, textAlign: "center", marginBottom: 5 }}
          level={1}
        >
          {title}
        </Title>
        <div className={style.infoContainer}>
          <div className={style.infoLeft}>
            <Avatar
              onClick={() => router.push(`/user/${author._id}`)}
              size={35}
              icon={<UserOutlined />}
              src={avatar}
              style={{
                backgroundColor: "rgb(134 133 160)",
                cursor: "pointer",
              }}
            />
            <Link href={`/user/${author._id}`}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: "#8E8DBE",
                  cursor: "pointer",
                }}
              >
                {author.name}
              </Text>
            </Link>
            <Text style={{ fontSize: 15, marginLeft: 10, color: "#8E8DBE" }}>
              {date} - {readTime}
            </Text>
          </div>
          <div className={style.infoRight}>
            <Rating
              onAddLike={onAddLike}
              onDeleteLike={onDeleteLike}
              onAddDislike={onAddDislike}
              onDeleteDislike={onDeleteDislike}
              likes={likes}
              dislikes={dislikes}
              action={action}
            />
            <Tooltip title="Save">
              {isPostSaved ? (
                <MdTurnedIn
                  onClick={onDeleteSavedPost}
                  style={{ marginLeft: 10 }}
                  size={27}
                  className={style.icon}
                />
              ) : (
                <MdTurnedInNot
                  onClick={onSavePost}
                  style={{ marginLeft: 10 }}
                  size={27}
                  className={style.icon}
                />
              )}
            </Tooltip>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostHeader;
