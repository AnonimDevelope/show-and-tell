import React from "react";
import { GoogleLogin } from "react-google-login";
import { signinGoogle, signinCredentials } from "../../../store/actions/index";
import { useDispatch } from "react-redux";
import { Typography, Form, Input, Button } from "antd";
import { BiAt } from "@react-icons/all-files/bi/BiAt";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import Spin from "../../Spin/Spin";

import * as style from "../SignInModal.module.css";

const SignIn = ({ isLoading, onClickSignUp, onClickResetPassword }) => {
  const dispatch = useDispatch();

  const { Title, Text } = Typography;

  return (
    <>
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
            <Button onClick={onClickResetPassword} size="small" type="link">
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
        <Button onClick={onClickSignUp} size="small" type="link">
          Sign Up
        </Button>
      </Text>
    </>
  );
};

export default SignIn;
