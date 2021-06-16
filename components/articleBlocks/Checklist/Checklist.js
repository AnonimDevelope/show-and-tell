import React from "react"
import * as style from "./Checklist.module.css"
import { ImCheckmark2 } from "@react-icons/all-files/im/ImCheckmark2"
import { VscError } from "@react-icons/all-files/vsc/VscError"

const Checklist = ({ items }) => {
  return (
    <ul className={style.list}>
      {items.map((item, index) => {
        return (
          <li key={index} className={style.item}>
            {item.checked ? (
              <ImCheckmark2
                size={25}
                color="green"
                style={{ marginRight: 15 }}
              />
            ) : (
              <VscError size={25} color="red" style={{ marginRight: 15 }} />
            )}
            {item.text}
          </li>
        )
      })}
    </ul>
  )
}

export default Checklist
