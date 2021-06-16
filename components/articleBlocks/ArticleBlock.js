import React from "react";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header/Header"));
const Paragraph = dynamic(() => import("./Paragraph/Paragraph"));
const List = dynamic(() => import("./List/List"));
const Delimiter = dynamic(() => import("./Delimiter/Delimiter"));
const Image = dynamic(() => import("./Image/Image"));
const Code = dynamic(() => import("./Code/Code"));
const Table = dynamic(() => import("./Table/Table"));
const Checklist = dynamic(() => import("./Checklist/Checklist"));
const Warning = dynamic(() => import("./Warning/Warning"));
const Raw = dynamic(() => import("./Raw/Raw"));

const ArticleBlock = ({
  type,
  text,
  level,
  items,
  style,
  data,
  code,
  table,
}) => {
  switch (type) {
    case "header":
      return <Header text={text} level={level} />;
    case "paragraph":
      return <Paragraph text={text} />;
    case "list":
      return <List items={items} style={style} />;
    case "delimiter":
      return <Delimiter />;
    case "image":
      return <Image data={data} />;
    case "code":
      return <Code code={code} />;
    case "table":
      return <Table table={table} />;
    case "checklist":
      return <Checklist items={items} />;
    case "warning":
      return <Warning data={data} />;
    case "raw":
      return <Raw data={data} />;

    default:
      return <div></div>;
  }
};

export default ArticleBlock;
