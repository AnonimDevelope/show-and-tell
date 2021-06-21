import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as style from "../styles/settings.module.css";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import { Typography, Form, Avatar, Button, Input, Modal, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import ReactCodeInput from "react-code-input";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import UnauthenticatedPage from "../components/UnauthenticatedPage/UnautheticatedPage";
import Head from "next/head";

const { Title } = Typography;

const Settings = () => {
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const user = useSelector((state) => state.auth.user) || {};

  const uploadRef = useRef(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);

      form.setFields([{ name: "username", value: user.name }]);
    }
  }, [user, form]);

  const onSubmit = async ({ username, email, password }) => {
    try {
      setModalLoading(true);

      const formData = new FormData();

      formData.append("name", username);

      formData.append("code", code);
      if (email) {
        formData.append("email", email);
      }
      if (avatar && typeof avatar !== "string") {
        formData.append("avatar", avatar);
      }
      if (password) {
        formData.append("password", password);
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_API
        }user/update?secret_token=${localStorage.getItem("token")}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.message === "success") {
        message.success("Updated successfully!");
      }

      if (data.error) {
        message.error("Error: " + data.error);
        setModalLoading(false);
        setModalVisible(false);
      }

      setModalLoading(false);
      setModalVisible(false);
    } catch (error) {
      setModalLoading(false);
      console.log(error);
      message.error("Something went wrong! Try again later");
    }
  };

  const sendCode = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_API
        }user/update?secret_token=${localStorage.getItem("token")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        message.error("Something went wrong! Try again later");
        setIsLoading(false);
        return;
      }

      setModalVisible(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error("Something went wrong! Try again later");
    }
  };

  const handleCancel = () => {
    setIsLoading(false);
    setModalVisible(false);
  };

  if (!user) {
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <UnauthenticatedPage />
    </>;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Layout>
        <Container sm style={{ minHeight: "90vh" }}>
          <Title className={style.title} level={1}>
            Settings
          </Title>
          <Form onFinish={onSubmit} form={form}>
            <Title level={3}>Avatar:</Title>
            <Form.Item>
              <div>
                <Avatar
                  icon={<UserOutlined />}
                  src={
                    typeof avatar !== "string" && avatar
                      ? URL.createObjectURL(avatar)
                      : avatar
                  }
                  size={100}
                  shape="square"
                />
                <Button
                  onClick={() => uploadRef.current.click()}
                  icon={<UploadOutlined />}
                  className={style.uploadButton}
                >
                  Upload avatar
                </Button>
                <input
                  onChange={(e) => setAvatar(e.target.files[0])}
                  id="thumbnailUpload"
                  ref={uploadRef}
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
            </Form.Item>
            <Title level={3}>Username:</Title>
            <Form.Item
              required
              name="username"
              rules={[
                { required: true, message: "Your new username is invalid" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Title level={3}>E-mail:</Title>
            <Form.Item
              rules={[
                {
                  type: "email",
                  required: false,
                  message: "Your new E-mail is invalid",
                },
              ]}
              name="email"
            >
              <Input placeholder="New E-mail" type="email" />
            </Form.Item>
            <Title level={3}>Password:</Title>
            <Form.Item
              rules={[
                {
                  min: 4,
                  message: "Password must contain at least 4 characters!",
                },
              ]}
              name="password"
            >
              <Input.Password
                placeholder="New password"
                prefix={<MdLockOutline className={style.inputIcon} size={20} />}
              />
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button loading={isLoading} onClick={sendCode} type="primary">
                  Save
                </Button>
                <Modal
                  title="Identity confirm"
                  visible={modalVisible}
                  onOk={() => form.submit()}
                  confirmLoading={modalLoading}
                  onCancel={handleCancel}
                >
                  <p>
                    Check <b>{user.email}</b> E-mail for code!
                  </p>
                  <ReactCodeInput
                    type="text"
                    fields={5}
                    inputMode="numeric"
                    onChange={(code) => setCode(code)}
                    value={code}
                  />
                </Modal>
              </div>
            </Form.Item>
          </Form>
        </Container>
      </Layout>
    </>
  );
};

export default Settings;
