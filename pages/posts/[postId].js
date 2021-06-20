import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";
import ArticleBlock from "../../components/articleBlocks/ArticleBlock";
import PostHeader from "../../components/PostHeader/PostHeader";
import Comment from "../../components/Comment/Comment";
import { Form, Button, Input, Avatar, Typography, message } from "antd";
import { setModalVisibility } from "../../store/actions/index";
import {
  postComment,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike,
  savePost,
  deleteSavedPost,
  likeComm,
  dislikeComm,
  getComments,
  getDate,
  getAllPosts,
  getPost,
  getTextFromContent,
} from "../../functions/post";
import { addToHistory } from "../../functions/user";
import useSWR from "swr";
import Head from "next/head";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const content = post.content;
  const blocks = content.blocks;

  const user = useSelector((state) => state.auth.user);
  const [comments, setComments] = useState(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  const {
    data: info = { myRate: false, isSaved: false, likes: 0, dislikes: 0 },
    mutate,
  } = useSWR(`posts/${post._id}/rate`);

  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      addToHistory(post._id, post.author._id);
    }
  }, [post._id, post.author._id, user]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(post._id);

        setComments(data);
        setIsCommentsLoading(false);
      } catch (error) {
        setIsCommentsLoading(false);
        console.log(error);
      }
    })();
  }, [post._id]);

  const onPostComment = async ({ comment }) => {
    try {
      if (!user) return dispatch(setModalVisibility(true));

      setIsCommentsLoading(true);
      const data = await postComment(post._id, comment, replyTo);
      if (data.error) {
        message.error("Something went wrong! Try again later");
        setIsCommentsLoading(false);
        return;
      }

      form.setFields([{ name: "comment", value: "" }]);

      setComments(data);
      setReplyTo(null);
      setIsCommentsLoading(false);
    } catch (error) {
      setIsCommentsLoading(false);
      message.error("Something went wrong! Try again later");
    }
  };

  const onAddLike = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    let newData = {
      ...info,
      myRate: "liked",
      likes: info.likes + 1,
    };

    if (info.myRate === "disliked") {
      newData.dislikes = info.dislikes - 1;
    }

    mutate(newData, false);
    await addLike(post._id);
    mutate();
  };

  const onDeleteLike = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, likes: info.likes - 1, myRate: false }, false);
    await deleteLike(post._id);
    mutate();
  };

  const onAddDislike = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    let newData = {
      ...info,
      myRate: "disliked",
      dislikes: info.dislikes + 1,
    };

    if (info.myRate === "liked") {
      newData.likes = info.likes - 1;
    }

    mutate(newData, false);
    await addDislike(post._id);
    mutate();
  };

  const onDeleteDislike = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, dislikes: info.dislikes - 1, myRate: false }, false);
    await deleteDislike(post._id);
    mutate();
  };

  const onSavePost = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, isSaved: true }, false);
    await savePost(post._id);
    mutate();
  };

  const onDeleteSavedPost = async () => {
    if (!user) return dispatch(setModalVisibility(true));

    mutate({ ...info, isSaved: false }, false);
    await deleteSavedPost(post._id);
    mutate();
  };

  const date = getDate(post.date);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={getTextFromContent(post.content)} />
      </Head>
      <Layout>
        <PostHeader
          title={post.title}
          date={date} //Dec 30, 2021
          readTime={`${post.readTime} min read`}
          author={post.author}
          avatar={post.author.avatar}
          likes={parseInt(info.likes)}
          dislikes={parseInt(info.dislikes)}
          action={info.myRate}
          onAddLike={onAddLike}
          onDeleteLike={onDeleteLike}
          onAddDislike={onAddDislike}
          onDeleteDislike={onDeleteDislike}
          onSavePost={onSavePost}
          onDeleteSavedPost={onDeleteSavedPost}
          isPostSaved={info.isSaved}
        />
        <Container style={{ fontSize: 16, padding: 15 }} sm>
          {blocks.map((block) => (
            <ArticleBlock
              key={block.id}
              type={block.type || ""}
              data={block.data || ""}
            />
          ))}
        </Container>
        <div style={{ borderTop: "1px solid black", padding: "20px 0" }}>
          <Container sm>
            {replyTo && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#5d6161",
                  padding: "8px 7px",
                  margin: "10px 0",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{ margin: 0, color: "#efefef" }}
                >
                  Reply To:{" "}
                  <span style={{ fontWeight: 400 }}>{replyTo.name}</span>
                </Typography.Title>
                <CloseOutlined
                  onClick={() => setReplyTo(null)}
                  style={{ cursor: "pointer", color: "red", fontSize: 20 }}
                />
              </div>
            )}
            <div style={{ display: "flex" }}>
              <Avatar
                style={{ marginRight: 12 }}
                icon={<UserOutlined />}
                src={user && user.avatar}
                alt={user && user.name}
              />
              <Form
                onFinish={onPostComment}
                form={form}
                style={{ width: "100%" }}
              >
                <Form.Item
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: "Write a comment first!",
                    },
                  ]}
                >
                  <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={isCommentsLoading}
                    htmlType="submit"
                    type="primary"
                  >
                    Add Comment
                  </Button>
                </Form.Item>
              </Form>
            </div>
            {comments &&
              comments
                .slice()
                .sort((a, b) => b.likes[0] - a.likes[0])
                .map((comment) => (
                  <Comment
                    action={comment.myAction}
                    authorId={comment.authorId}
                    key={comment._id}
                    likes={comment.likes[0]}
                    dislikes={comment.dislikes[0]}
                    author={comment.author.name}
                    comment={comment.comment}
                    avatar={comment.author.avatar}
                    onLike={() => likeComm(post._id, comment._id)}
                    onDislike={() => dislikeComm(post._id, comment._id)}
                    user={user}
                    onShowLogin={() => dispatch(setModalVisibility(true))}
                    onReply={() =>
                      setReplyTo({
                        name: comment.author.name,
                        _id: comment._id,
                      })
                    }
                  >
                    {comment.replies
                      .slice()
                      .sort((a, b) => b.likes[0] - a.likes[0])
                      .map((nestedComm) => (
                        <Comment
                          action={nestedComm.myAction}
                          authorId={nestedComm.authorId}
                          key={nestedComm._id}
                          likes={nestedComm.likes[0]}
                          dislikes={nestedComm.dislikes[0]}
                          author={nestedComm.author.name}
                          comment={nestedComm.comment}
                          avatar={nestedComm.author.avatar}
                          reply={false}
                          user={user}
                          onShowLogin={() => dispatch(setModalVisibility(true))}
                          onLike={() =>
                            likeComm(post._id, comment._id, nestedComm._id)
                          }
                          onDislike={() =>
                            dislikeComm(post._id, comment._id, nestedComm._id)
                          }
                        />
                      ))}
                  </Comment>
                ))}
          </Container>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts.map((post) => {
    return { params: { postId: post.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.postId);

  return {
    revalidate: 1,
    props: {
      post,
    },
  };
}

export default Post;
