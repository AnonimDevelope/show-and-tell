import React from "react"
import { Typography } from "antd"
import parse from "html-react-parser"

const Paragraph = ({ text }) => {
  const { Paragraph } = Typography

  return <Paragraph>{parse(text)}</Paragraph>
}

export default Paragraph
