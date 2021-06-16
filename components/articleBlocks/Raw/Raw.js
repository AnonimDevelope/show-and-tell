import React from "react"
import parse from "html-react-parser"

const Raw = ({ data }) => {
  return <div style={{ maxWidth: "100%" }}>{parse(data.html)}</div>
}

export default Raw
