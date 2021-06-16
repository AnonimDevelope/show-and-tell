import React from "react"
import { LoadingOutlined } from "@ant-design/icons"

const Loading = ({ size = 24 }) => (
  <LoadingOutlined style={{ fontSize: size }} spin />
)

export default Loading
