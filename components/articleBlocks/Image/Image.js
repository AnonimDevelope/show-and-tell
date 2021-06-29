import React from "react";
import * as style from "./Image.module.css";
import { Typography } from "antd";
import NextImage from "next/image";

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
      <NextImage
        src={data.file.url}
        alt="Loading..."
        className={imageClassName}
        width={data.file.width}
        height={data.file.height}
        layout="responsive"
        quality={90}
      />
      {data.caption && <Text>{data.caption}</Text>}
    </div>
  );
};

export default Image;
