import React from "react";
import { Typography } from "antd";
import { stripHtml } from "string-strip-html";

const List = ({ items, style }) => {
  const { Paragraph } = Typography;

  return (
    <Paragraph style={{ fontSize: 20 }}>
      {style === "ordered" ? (
        <ol>
          {items.map((item, index) => (
            <li key={index}>{stripHtml(item).result}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{stripHtml(item).result}</li>
          ))}
        </ul>
      )}
    </Paragraph>
  );
};

export default List;
