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
  getPostInfo,
  getComments,
  getDate,
  getAllPosts,
  getPost,
} from "../../functions/post";
import { addToHistory } from "../../functions/user";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const content = post.content;
  const blocks = content.blocks;

  const user = useSelector((state) => state.auth.user);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myRate, setMyRate] = useState(null);
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [comments, setComments] = useState(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null);

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
        if (!user) return;

        const data = await getPostInfo(post._id);

        setLikes(data.likes);
        setDislikes(data.dislikes);
        setMyRate(data.myRate);
        setIsPostSaved(data.isSaved);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [post._id, user]);

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

  const onAddLike = () => {
    if (!user) return dispatch(setModalVisibility(true));

    addLike(post._id);

    if (myRate === "disliked") {
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
      setMyRate("liked");
    }

    setLikes(likes + 1);
    setMyRate("liked");
  };

  const onDeleteLike = () => {
    if (!user) return dispatch(setModalVisibility(true));

    deleteLike(post._id);

    setLikes(likes - 1);
    setMyRate(null);
  };

  const onAddDislike = () => {
    if (!user) return dispatch(setModalVisibility(true));

    addDislike(post._id);

    if (myRate === "liked") {
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
      setMyRate("disliked");
    }

    setDislikes(dislikes + 1);
    setMyRate("disliked");
  };

  const onDeleteDislike = () => {
    if (!user) return dispatch(setModalVisibility(true));

    deleteDislike(post._id);

    setDislikes(dislikes - 1);
    setMyRate(null);
  };

  const onSavePost = () => {
    if (!user) return dispatch(setModalVisibility(true));

    savePost(post._id);
    setIsPostSaved(true);
  };

  const onDeleteSavedPost = () => {
    if (!user) return dispatch(setModalVisibility(true));

    deleteSavedPost(post._id);
    setIsPostSaved(false);
  };

  const date = getDate(post.date);

  return (
    <React.Fragment>
      <Layout>
        <PostHeader
          title={post.title}
          date={date} //Dec 30, 2021
          readTime={`${post.readTime} min read`}
          author={post.author}
          avatar={post.author.avatar}
          likes={parseInt(likes)}
          dislikes={parseInt(dislikes)}
          action={myRate}
          onAddLike={onAddLike}
          onDeleteLike={onDeleteLike}
          onAddDislike={onAddDislike}
          onDeleteDislike={onDeleteDislike}
          onSavePost={onSavePost}
          onDeleteSavedPost={onDeleteSavedPost}
          isPostSaved={isPostSaved}
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
    </React.Fragment>
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
