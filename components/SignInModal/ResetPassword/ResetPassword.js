import React, { useState, useEffect } from "react";
import { Typography, Form, Input, Button, message, Result } from "antd";
import { Steps } from "antd";
import * as style from "./ResetPassword.module.css";
import { BiAt } from "@react-icons/all-files/bi/BiAt";
import ReactCodeInput from "react-code-input";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import {
  sendResetPasswordCode,
  checkResetPasswordCode,
  resetPassword,
} from "../../../functions/user";
import Spin from "../../Spin/Spin";

const { Step } = Steps;
const { Title, Text } = Typography;

const ResetPassword = ({ onClickSignIn }) => {
  const isBrowser = typeof window !== "undefined";
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(1366);
  const [cacheEmail, setCacheEmail] = useState(null);

  useEffect(() => {
    if (!isBrowser) return;

    setWidth(window.innerWidth);
  }, [isBrowser]);

  const onSendCode = async ({ email }) => {
    try {
      setIsLoading(true);
      const res = await sendResetPasswordCode(email);
      setIsLoading(false);

      if (res.message !== "success")
        return message.error("Something went wrong!");

      setCacheEmail(email);
      setStep(1);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onCheckCode = async () => {
    try {
      setIsLoading(true);
      const res = await checkResetPasswordCode(code, cacheEmail);
      setIsLoading(false);

      if (res.message === "success") return setStep(2);

      message.error("Incorrect code");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const onResetPassword = async ({ password }) => {
    try {
      setIsLoading(true);
      const res = await resetPassword(password, code, cacheEmail);
      setIsLoading(false);

      if (res.error) return message.error("Something went wrong!");

      setStep(3);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      message.error("Something went wrong!");
    }
  };

  let content = (
    <Form onFinish={onSendCode}>
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

      <button type="submit" className={style.button}>
        {isLoading ? <Spin /> : "Submit"}
      </button>
    </Form>
  );

  if (step === 1)
    content = (
      <div className={style.verifyPage}>
        <ReactCodeInput
          type="text"
          fields={5}
          inputMode="numeric"
          onChange={(code) => setCode(code)}
          value={code}
        />
        <button
          onClick={onCheckCode}
          style={{ marginTop: 50 }}
          className={style.button}
        >
          {isLoading ? <Spin /> : "Submit"}
        </button>
      </div>
    );

  if (step === 2)
    content = (
      <Form onFinish={onResetPassword}>
        <Form.Item
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
          {isLoading ? <Spin /> : "Submit"}
        </button>
      </Form>
    );

  if (step === 3)
    content = (
      <div>
        <Result
          status="success"
          title="Password successfully updated!"
          extra={[
            <Button onClick={onClickSignIn} type="primary" key="btn">
              Sign In
            </Button>,
          ]}
        />
      </div>
    );

  return (
    <>
      <Title style={{ color: "#394648" }} level={1}>
        Reset password
      </Title>
      <div className={style.wrapper}>
        <Steps
          size={width < 530 ? "small" : "default"}
          direction={width < 420 ? "vertical" : "horizontal"}
          current={step}
        >
          <Step title="Identification" />
          <Step title="Verification" />
          <Step title="Reset password" />
        </Steps>
        <div
          style={width < 420 ? { height: "40%" } : null}
          className={style.content}
        >
          {content}
        </div>
      </div>
      <Text>
        Back to
        <Button onClick={onClickSignIn} size="small" type="link">
          Sign In
        </Button>
      </Text>
    </>
  );
};

export default ResetPassword;
