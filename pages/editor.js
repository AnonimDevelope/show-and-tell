import React, { useRef, useState, useEffect } from "react";
import * as style from "../styles/editor.module.css";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { setModalVisibility } from "../store/actions/index";
import { Input, Button, Form, Result, message } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const EditorPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postStatus, setPostStatus] = useState(null);

  const editorRef = useRef(null);
  const uploadRef = useRef(null);

  const [form] = Form.useForm();

  const user = useSelector((state) => state.auth.user);

  const editingPost = router.query.post ? JSON.parse(router.query.post) : null;

  useEffect(() => {
    if (editingPost) {
      form.setFields([
        { name: "title", value: editingPost.title },
        { name: "readTime", value: editingPost.readTime },
      ]);
    }
  }, [editingPost, form]);

  const savePost = async ({ title, readTime }) => {
    try {
      setIsLoading(true);

      const savedData = await editorRef.current.save();
      const formData = new FormData();

      formData.append("title", title);
      formData.append("readTime", readTime);
      formData.append("content", JSON.stringify(savedData));
      formData.append("thumbnail", thumbnail);

      const token = localStorage.getItem("token");

      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN_API + "posts?secret_token=" + token,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      setIsLoading(false);

      if (data.message === "success") {
        setPostStatus("success");
      }
      if (data.error) {
        message.error("Something went wrong! Try again later");
      }
    } catch (error) {
      message.error("Something went wrong! Try again later");
      setIsLoading(false);
    }
  };

  const editPost = async ({ title, readTime }) => {
    try {
      setIsLoading(true);

      const savedData = await editorRef.current.save();
      const formData = new FormData();

      formData.append("title", title);
      formData.append("readTime", readTime);
      formData.append("content", JSON.stringify(savedData));
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN_API +
          "posts/" +
          editingPost.postId +
          "/edit" +
          "?secret_token=" +
          token,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.message === "success") {
        setPostStatus("success");
      }
      setIsLoading(false);
    } catch (error) {
      message.error("Something went wrong! Try again later");
      setIsLoading(false);
    }
  };

  if (typeof window === "undefined" || !process.browser) {
    return <div>Loading</div>;
  }

  if (!user) {
    return (
      <Layout>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "95%",
            minHeight: "90vh",
          }}
        >
          <Button
            style={{ backgroundColor: "#6f6cec" }}
            onClick={() => dispatch(setModalVisibility(true))}
            type="primary"
          >
            Sign In
          </Button>
        </Container>
      </Layout>
    );
  }

  if (postStatus === "success") {
    return (
      <Layout>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "95%",
            minHeight: "90vh",
          }}
        >
          <Result
            status="success"
            title="Published successfully!"
            extra={[
              <Button
                onClick={() => router.push("/user/" + user._id)}
                type="primary"
              >
                My posts
              </Button>,
            ]}
          />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container style={{ padding: "20px 0" }}>
        <div className={style.formContainer}>
          <Form
            className={style.form}
            form={form}
            onFinish={editingPost ? editPost : savePost}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                },
              ]}
            >
              <Input
                style={{ width: 250 }}
                placeholder="Title"
                autoComplete="off"
                value={editingPost ? editingPost.title : ""}
              />
            </Form.Item>
            <Form.Item
              name="readTime"
              label="Read time"
              rules={[
                {
                  required: true,
                  message: "Read time is required!",
                },
              ]}
            >
              <Input
                style={{ width: 250 }}
                placeholder="Time to read in minutes"
                autoComplete="off"
                type="number"
                value={editingPost ? editingPost.readTime : ""}
              />
            </Form.Item>
            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[
                {
                  required: editingPost ? false : true,
                  message: "Thumbnail is required!",
                },
              ]}
            >
              <div>
                <input
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  id="thumbnailUpload"
                  ref={uploadRef}
                  type="file"
                  style={{ display: "none" }}
                />
                {thumbnail || editingPost ? (
                  <div className={style.preview}>
                    <img
                      src={
                        editingPost && !thumbnail
                          ? editingPost.thumbnail
                          : URL.createObjectURL(thumbnail)
                      }
                      style={{ maxWidth: 100, height: 40 }}
                      alt=""
                    />
                    <Button
                      onClick={() => uploadRef.current.click()}
                      icon={<EditOutlined />}
                      shape="circle"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => uploadRef.current.click()}
                    icon={<UploadOutlined />}
                    style={{ width: 250 }}
                  >
                    Upload thumbnail
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
        {process.browser && (
          <Editor
            editorRef={editorRef}
            data={editingPost ? JSON.parse(editingPost.content) : false}
          />
        )}
        <div className={style.publishContainer}>
          <Button onClick={form.submit} type="primary" loading={isLoading}>
            Publish
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default EditorPage;
