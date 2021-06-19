import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import parse from "html-react-parser";
import { setModalVisibility } from "../../store/actions/index";
import {
  addLike,
  deleteLike,
  addDislike,
  deleteDislike,
  savePost,
  deleteSavedPost,
  getDate,
} from "../../functions/post";
import useSWR from "swr";

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
  authorId,
}) => {
  const dispatch = useDispatch();
  const { Paragraph, Text, Title } = Typography;
  const user = useSelector((state) => state.auth.user);
  const { data: info = { myRate: false, isSaved: false }, mutate } = useSWR(
    `posts/${postId}/rate`
  );

  const onAddLike = async ({ domEvent }) => {
    domEvent.stopPropagation();

    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, myRate: "liked" }, false);
    await addLike(postId);
    mutate();
  };

  const onDeleteLike = async ({ domEvent }) => {
    domEvent.stopPropagation();
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, myRate: false }, false);
    await deleteLike(postId);
    mutate();
  };

  const onAddDislike = async ({ domEvent }) => {
    domEvent.stopPropagation();
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, myRate: "disliked" }, false);
    await addDislike(postId);
    mutate();
  };

  const onDeleteDislike = async ({ domEvent }) => {
    domEvent.stopPropagation();
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, myRate: false }, false);
    await deleteDislike(postId);
    mutate();
  };

  const onSavePost = async ({ domEvent }) => {
    domEvent.stopPropagation();
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ isSaved: true, ...info }, false);
    await savePost(postId);
    mutate();
  };

  const onDeleteSavedPost = async ({ domEvent }) => {
    domEvent.stopPropagation();
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ isSaved: false, ...info }, false);
    await deleteSavedPost(postId);
    mutate();

    if (onRemoveFromSaves) {
      onRemoveFromSaves();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={info.myRate === "liked" ? onDeleteLike : onAddLike}
        icon={
          info.myRate === "liked" ? (
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
        onClick={info.myRate === "disliked" ? onDeleteDislike : onAddDislike}
        icon={
          info.myRate === "disliked" ? (
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
        onClick={info.isSaved ? onDeleteSavedPost : onSavePost}
        icon={
          info.isSaved ? (
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
              {parse(content)}
            </Paragraph>
            <div className={style.infoContainer}>
              {author ? (
                <Link href={`/user/${authorId}`}>
                  <Text className={style.author}>{author}</Text>
                </Link>
              ) : (
                <Text style={{ margin: 0 }}>{getDate(date)}</Text>
              )}
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

export default memo(ArticleCard);
