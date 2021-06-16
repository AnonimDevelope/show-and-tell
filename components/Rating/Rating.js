import React from "react"
import * as style from "./Rating.module.css"
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike"
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike"
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike"
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike"
import { Typography, Tooltip } from "antd"

const Rating = ({
  likes = 0,
  dislikes = 0,
  action,
  onAddLike,
  onDeleteLike,
  onAddDislike,
  onDeleteDislike,
}) => {
  const { Text } = Typography
  return (
    <div className={style.rating}>
      <Tooltip title="Like">
        {action === "liked" ? (
          <AiFillLike
            onClick={onDeleteLike}
            size={27}
            className={style.iconActive}
          />
        ) : (
          <AiOutlineLike onClick={onAddLike} size={27} className={style.icon} />
        )}
      </Tooltip>
      <Text style={{ fontSize: 16, color: "#8E8DBE", marginRight: 5 }}>
        {likes}
      </Text>
      <Tooltip title="Dislike">
        {action === "disliked" ? (
          <AiFillDislike
            onClick={onDeleteDislike}
            size={27}
            className={style.iconActive}
          />
        ) : (
          <AiOutlineDislike
            onClick={onAddDislike}
            size={27}
            className={style.icon}
          />
        )}
      </Tooltip>
      <Text style={{ fontSize: 16, color: "#8E8DBE" }}>{dislikes}</Text>
    </div>
  )
}

export default Rating
