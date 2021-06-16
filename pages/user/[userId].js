import React, { useEffect, useState } from "react";
import * as style from "../../styles/profile.module.css";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";
import { Avatar, Menu, Empty, Modal, message } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Spin from "../../components/Spin/Spin";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { deletePost, getTextFromContent } from "../../functions/post";
import { getUserProfile } from "../../functions/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcSettings } from "@react-icons/all-files/fc/FcSettings";

const { confirm } = Modal;

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const loggedUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const [isMyAccount, setIsMyAccount] = useState(false);

  useEffect(() => {
    if (user && loggedUser) {
      setIsMyAccount(user._id.toString() === loggedUser._id.toString());
    }
  }, [user, loggedUser]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile(userId);

        if (data.error) {
          return;
        }

        setUser(data);
      } catch (error) {
        console.log("error: ", error);
        message.error("Something went wrong! Try again later");
      }
    })();
  }, [userId]);

  const onDeletePost = async (postId) => {
    try {
      deletePost(postId);
    } catch (error) {
      message.error("Something went wrong! Try again later");
    }
  };

  const showDeleteConfirm = (e, postId) => {
    e.domEvent.stopPropagation();
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDeletePost(postId);
      },
    });
  };

  if (!user) {
    return (
      <Layout>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Spin size={30} />
        </Container>
      </Layout>
    );
  }

  if (user.posts.length === 0) {
    return (
      <Layout>
        <div className={style.header}>
          <Container
            style={
              isMyAccount
                ? {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
                : {}
            }
          >
            <div className={style.avatarContainer}>
              <Avatar size={70} src={user.avatar} icon={<UserOutlined />} />
              <div className={style.avatarRight}>
                <span className={style.name}>{user.name}</span>
                <span>
                  {user.posts.length}{" "}
                  {user.posts.length === 1 ? "Article" : "Articles"}
                </span>
              </div>
            </div>
            {isMyAccount && (
              <Link
                href="/settings"
                state={{
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                }}
              >
                <FcSettings size={30} className={style.settingsIcon} />
              </Link>
            )}
          </Container>
        </div>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "95%",
            minHeight: "70vh",
          }}
        >
          <Empty
            description={
              isMyAccount ? "You have no posts" : `${user.name} has no posts`
            }
          />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={style.header}>
        <Container
          style={
            isMyAccount
              ? {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
              : {}
          }
        >
          <div className={style.avatarContainer}>
            <Avatar size={70} src={user.avatar} icon={<UserOutlined />} />
            <div className={style.avatarRight}>
              <span className={style.name}>{user.name}</span>
              <span>
                {user.posts.length}{" "}
                {user.posts.length === 1 ? "Article" : "Articles"}
              </span>
            </div>
          </div>
          {isMyAccount && (
            <Link
              href="/settings"
              state={{
                name: user.name,
                email: user.email,
                avatar: user.avatar,
              }}
            >
              <FcSettings size={30} className={style.settingsIcon} />
            </Link>
          )}
        </Container>
      </div>

      <Container>
        <div className={style.band}>
          {user.posts
            .slice()
            .sort((a, b) => b.date - a.date)
            .map((post) => {
              return (
                <ArticleCard
                  key={post._id}
                  postId={post._id}
                  style={{ marginBottom: 20 }}
                  title={post.title}
                  thumbnail={post.thumbnail}
                  content={getTextFromContent(post.content)}
                  author={post.author ? post.author.name : null}
                  linkTo={"/posts/" + post.slug}
                  date={post.date}
                  customMenu={
                    isMyAccount && (
                      <Menu>
                        <Menu.Item
                          onClick={(e) => {
                            e.domEvent.stopPropagation();
                            router.push({
                              pathname: "/editor",
                              query: {
                                post: JSON.stringify({
                                  postId: post._id,
                                  title: post.title,
                                  thumbnail: post.thumbnail,
                                  content: post.content,
                                  readTime: post.readTime,
                                }),
                              },
                            });
                          }}
                          icon={<EditOutlined style={{ fontSize: 15 }} />}
                          key="0"
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          style={{ color: "red" }}
                          icon={<DeleteOutlined style={{ fontSize: 15 }} />}
                          onClick={(e) => showDeleteConfirm(e, post._id)}
                          key="2"
                        >
                          Delete
                        </Menu.Item>
                      </Menu>
                    )
                  }
                />
              );
            })}
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;
