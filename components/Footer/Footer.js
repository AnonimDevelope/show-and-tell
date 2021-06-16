import React from "react";
import * as style from "./Footer.module.css";
import { Typography } from "antd";
import Container from "../Container/Container";

const Footer = () => {
  const { Text } = Typography;

  return (
    <div className={style.footer}>
      <Container style={{ height: "100%" }}>
        <div className={style.wrapper}>
          <Text className={style.text}>
            Copyright © 2021{" "}
            <a href="https://github.com/AnonimDevelope">AnonimDevelope</a>. All
            Rights reserved
          </Text>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
