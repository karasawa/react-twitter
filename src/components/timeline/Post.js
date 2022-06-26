import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  PublishOutlined,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentUserState, otherUserState } from "../../recoil/atom";
import "./Post.css";

const Post = forwardRef(
  ({ displayName, userName, verified, text, avator, image, sender }, ref) => {
    const navigate = useNavigate();

    const currentUser = useRecoilValue(currentUserState);
    const uid = currentUser.uid;

    const setOtherUser = useSetRecoilState(otherUserState);

    const otherUserProfileOpen = (sender) => {
      if (sender == uid) {
        navigate("/profile");
      } else {
        setOtherUser({ uid: sender });
        navigate("/home/otherUserProfile");
      }
    };
    return (
      <div className="post" ref={ref}>
        <div className="post--avator">
          <Avatar src={avator} />
        </div>
        <div className="post--body">
          <div className="post--header">
            <div className="post--headerText">
              <h3 onClick={() => otherUserProfileOpen(sender)}>
                {displayName}
              </h3>
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
            <ChatBubbleOutline className="chatBubbleOutline" fontSize="small" />
            <Repeat className="repeat" fontSize="small" />
            <FavoriteBorder className="favoriteBorder" fontSize="small" />
            <PublishOutlined className="publishOutlined" fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
