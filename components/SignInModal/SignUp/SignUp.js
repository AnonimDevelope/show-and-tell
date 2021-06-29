import React from "react";
import { BiAt } from "@react-icons/all-files/bi/BiAt";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import { Typography, Input, Button, Form } from "antd";
import Spin from "../../Spin/Spin";
import { signupCredentials } from "../../../store/actions/index";
import { useDispatch } from "react-redux";
import * as style from "../SignInModal.module.css";

const SignUp = ({ isLoading, onClickSignIn }) => {
  const dispatch = useDispatch();

  const { Title, Text } = Typography;

  return (
    <>
      <Title style={{ color: "#394648" }} level={1}>
        Sign Up
      </Title>
      <div className={style.formWrapper}>
        <Form onFinish={(values) => dispatch(signupCredentials(values))}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              autoComplete="false"
              className={style.input}
              size="large"
              placeholder="Name"
              prefix={<AiOutlineUser className={style.inputIcon} size={20} />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Invalid email!",
              },
            ]}
          >
            <Input
              className={style.input}
              size="large"
              placeholder="E-Mail"
              prefix={<BiAt className={style.inputIcon} size={20} />}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 4,
                message: "Password must contain at least 4 characters!",
              },
            ]}
          >
            <Input.Password
              className={style.input}
              size="large"
              placeholder="Password"
              prefix={<MdLockOutline className={style.inputIcon} size={20} />}
            />
          </Form.Item>
          <button type="submit" className={style.button}>
            {isLoading ? <Spin /> : "Sign Up"}
          </button>
        </Form>
      </div>
      <Text>
        Have an account?{" "}
        <Button onClick={onClickSignIn} size="small" type="link">
          Sign In
        </Button>
      </Text>
    </>
  );
};

export default SignUp;
