import {
  ChatBubbleOutline,
  FavoriteBorder,
  PublishOutlined,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import "./Post.css";

const Post = forwardRef(
  ({ displayName, userName, verified, text, avator, image }, ref) => {
    return (
      <div className="post" ref={ref}>
        <div className="post--avator">
          <Avatar src={avator} />
        </div>
        <div className="post--body">
          <div className="post--header">
            <div className="post--headerText">
              <h3>{displayName}</h3>
              <span className="post--headerSpecial">
                <VerifiedUser className="post--badge" />@{userName}
              </span>
            </div>
            <div className="post--headerDiscription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} />
          <div className="post--footer">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
            <PublishOutlined fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
