import React from "react";
import * as style from "./Image.module.css";
import { Typography } from "antd";

const Image = ({ data }) => {
  const { Text } = Typography;

  let imageClassName = style.image;

  if (data.withBorder) {
    imageClassName = style.withBorder;
  }

  if (data.withBackground) {
    imageClassName = style.withBackground;
  }

  return (
    <div className={style.container}>
      <img src={data.file.url} alt="Loading..." className={imageClassName} />
      {data.caption && <Text>{data.caption}</Text>}
    </div>
  );
};

export default Image;
