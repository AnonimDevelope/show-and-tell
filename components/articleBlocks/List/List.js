import React from "react"
import { Typography } from "antd"

const List = ({ items, style }) => {
  const { Paragraph } = Typography

  return (
    <Paragraph style={{ fontSize: 20 }}>
      {style === "ordered" ? (
        <ol>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </Paragraph>
  )
}

export default List
