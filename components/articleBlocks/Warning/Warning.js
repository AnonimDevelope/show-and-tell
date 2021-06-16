import React from "react"
import { Alert } from "antd"

const Warning = ({ data }) => {
  return (
    <Alert
      style={{ margin: "20px 0" }}
      message={data.title}
      description={data.message}
      type="warning"
      showIcon
    />
  )
}

export default Warning
