import React from "react"
import { Typography } from "antd"

const Header = ({ text, level = 1 }) => {
  const { Title } = Typography

  return <Title level={level}>{text}</Title>
}

export default Header
