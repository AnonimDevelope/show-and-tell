import React, { useState, memo } from "react";
import * as style from "./SignInModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { BiAt } from "@react-icons/all-files/bi/BiAt";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import { Typography, Input, Button, Form } from "antd";
import { GoogleLogin } from "react-google-login";
import Spin from "../Spin/Spin";
import {
  signinGoogle,
  signinCredentials,
  signupCredentials,
} from "../../store/actions/index";

const SignInModal = ({ onClose, isVisible }) => {
  const [isSignin, setIsSignin] = useState(true);
  const isLoading = useSelector((state) => state.auth.userLoading);

  const dispatch = useDispatch();

  const { Title, Text } = Typography;

  const signIn = (
    <>
      <GrClose onClick={onClose} className={style.close} size={25} />
      <Title style={{ color: "#394648" }} level={1}>
        Sign In
      </Title>
      <div className={style.formWrapper}>
        <Form onFinish={(values) => dispatch(signinCredentials(values))}>
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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" type="link">
              Forgot password?
            </Button>
          </div>
          <button type="submit" className={style.button}>
            {isLoading ? <Spin /> : "Sign In"}
          </button>
        </Form>
        <Text style={{ margin: 15 }}>Or</Text>
        <GoogleLogin
          clientId="653264637058-sk0aupiel1dkjqt2tmpvn0lkvvm8g512.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={(res) => dispatch(signinGoogle(res))}
          onFailure={(err) => console.log(err)}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <Text>
        Dont have an account?{" "}
        <Button onClick={() => setIsSignin(false)} size="small" type="link">
          Sign Up
        </Button>
      </Text>
    </>
  );

  const signUp = (
    <>
      <GrClose onClick={onClose} className={style.close} size={25} />
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
        <Button onClick={() => setIsSignin(true)} size="small" type="link">
          Sign In
        </Button>
      </Text>
    </>
  );

  if (isVisible) {
    return (
      <div className={style.wrapper}>
        <ClickAwayListener onClickAway={onClose}>
          <div className={style.card}>{isSignin ? signIn : signUp}</div>
        </ClickAwayListener>
      </div>
    );
  }

  return null;
};

export default memo(SignInModal);
