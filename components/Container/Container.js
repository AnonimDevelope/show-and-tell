import React from "react"

const Container = ({ children, sm, style = {} }) => {
  return (
    <div
      style={{
        maxWidth: sm ? 900 : 1400,
        paddingLeft: 15,
        paddingRight: 15,
        boxSizing: "border-box",
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Container
