import React from "react"
import * as style from "./Table.module.css"

const Table = ({ table }) => {
  return (
    <div className={style.table}>
      {table.map((row, index) => {
        return (
          <div key={index} className={style.row}>
            {row.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ width: `${100 / row.length}%` }}
                  className={style.item}
                >
                  {item
                    .replaceAll(
                      '<div class="tc-table__area"><div class="tc-table__inp" contenteditable="true">',
                      ""
                    )
                    .replaceAll("</div></div>", "")}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Table
