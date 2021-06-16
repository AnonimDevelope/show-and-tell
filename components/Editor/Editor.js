import React from "react";
import EditorJs from "react-editor-js";
import Image from "@editorjs/image";

import { EDITOR_JS_TOOLS } from "./editorTools";

const Editor = ({ editorRef, data }) => {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    return <div></div>;
  }

  const token = localStorage.getItem("token");

  return (
    <EditorJs
      instanceRef={(instance) => (editorRef.current = instance)}
      tools={{
        ...EDITOR_JS_TOOLS,
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile:
                process.env.NEXT_PUBLIC_DOMAIN_API +
                "upload/posts/file?secret_token=" +
                token,
              byUrl:
                process.env.NEXT_PUBLIC_DOMAIN_API +
                "upload/posts/url?secret_token=" +
                token,
            },
          },
        },
      }}
      holder="editor"
      data={
        data
          ? data
          : {
              time: 1556098174501,
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "Header",
                    level: 1,
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: "Some text.",
                  },
                },
              ],
              version: "2.12.4",
            }
      }
    >
      <div
        id="editor"
        style={{
          borderRadius: 10,
          margin: "0 auto",
          maxWidth: 1024,
          boxShadow: "2px 2px 6px 0px grey",
          fontSize: 15,
          padding: 15,
        }}
      />
    </EditorJs>
  );
};

export default Editor;
