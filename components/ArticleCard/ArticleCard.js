import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Dropdown, Menu } from "antd";
import * as style from "./ArticleCard.module.css";
import { HiDotsHorizontal } from "@react-icons/all-files/hi/HiDotsHorizontal";
import { MdTurnedInNot } from "@react-icons/all-files/md/MdTurnedInNot";
import { MdTurnedIn } from "@react-icons/all-files/md/MdTurnedIn";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";
import {
  getPostInfo,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike,
  savePost,
  deleteSavedPost,
  getDate,
} from "../../functions/post";

const ArticleCard = ({
  title,
  linkTo,
  big,
  author,
  thumbnail,
  postId,
  onRemoveFromSaves,
  date,
  customMenu,
  content,
}) => {
  const { Paragraph, Text, Title } = Typography;

  const [myRate, setMyRate] = useState(null);
  const [isPostSaved, setIsPostSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPostInfo(postId);
        setMyRate(data.myRate);
        setIsPostSaved(data.isSaved);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [postId]);

  const onAddLike = ({ domEvent }) => {
    domEvent.stopPropagation();
    addLike(postId);
    setMyRate("liked");
  };

  const onDeleteLike = ({ domEvent }) => {
    domEvent.stopPropagation();
    deleteLike(postId);
    setMyRate(null);
  };

  const onAddDislike = ({ domEvent }) => {
    domEvent.stopPropagation();
    addDislike(postId);
    setMyRate("disliked");
  };

  const onDeleteDislike = ({ domEvent }) => {
    domEvent.stopPropagation();
    deleteDislike(postId);
    setMyRate(null);
  };

  const onSavePost = ({ domEvent }) => {
    domEvent.stopPropagation();
    savePost(postId);
    setIsPostSaved(true);
  };

  const onDeleteSavedPost = ({ domEvent }) => {
    domEvent.stopPropagation();
    deleteSavedPost(postId);
    setIsPostSaved(false);

    if (onRemoveFromSaves) {
      onRemoveFromSaves();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={myRate === "liked" ? onDeleteLike : onAddLike}
        icon={
          myRate === "liked" ? (
            <AiFillLike className={style.menuIcon} />
          ) : (
            <AiOutlineLike className={style.menuIcon} />
          )
        }
        key="0"
      >
        Like
      </Menu.Item>
      <Menu.Item
        onClick={myRate === "disliked" ? onDeleteDislike : onAddDislike}
        icon={
          myRate === "disliked" ? (
            <AiFillDislike className={style.menuIcon} />
          ) : (
            <AiOutlineDislike className={style.menuIcon} />
          )
        }
        key="1"
      >
        Dislike
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={isPostSaved ? onDeleteSavedPost : onSavePost}
        icon={
          isPostSaved ? (
            <MdTurnedIn className={style.menuIcon} />
          ) : (
            <MdTurnedInNot className={style.menuIcon} />
          )
        }
        key="2"
      >
        Save
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={big ? style.big : null}>
      <Link href={linkTo}>
        <a className={style.card}>
          <div
            className={style.thumb}
            style={{
              backgroundImage: `url("${thumbnail}")`,
            }}
          ></div>
          <article>
            <Title>{title}</Title>
            <Paragraph
              ellipsis={{ rows: 10 }}
              className={big ? style.paragraphBig : style.paragraph}
            >
              {content}
            </Paragraph>
            <div className={style.infoContainer}>
              <Text style={{ margin: 0 }}>
                {author ? author : getDate(date)}
              </Text>
              <Dropdown
                placement="topCenter"
                overlay={customMenu ? customMenu : menu}
                trigger={["click"]}
              >
                <HiDotsHorizontal className={style.menu} />
              </Dropdown>
            </div>
          </article>
        </a>
      </Link>
    </div>
  );
};

export default ArticleCard;
