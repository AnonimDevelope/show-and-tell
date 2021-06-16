import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Code = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
