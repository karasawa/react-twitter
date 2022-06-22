import React, { useState, useEffect } from "react";
import "./Profile.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../timeline/Header";
import Widgets from "../widget/Widgets";
import { Avatar, Button } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import RoomIcon from "@mui/icons-material/Room";
import LinkIcon from "@mui/icons-material/Link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlipMove from "react-flip-move";
import Post from "../timeline/Post";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";

function Profile() {
  const [posts, setPosts] = useState([]);

  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(
      postData,
      where("sender", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="profile">
        <Header />
        <div className="profile--avatorContainer">
          <Avatar className="profile--avator" />
        </div>
        <div className="profile--mainContainer">
          <Button className="profile--editButton">プロフィールを編集</Button>
          <h3>バズライター</h3>
          <span className="profile--headerSpecial">
            <VerifiedUser className="profile--badge" />
            @bazwriter
          </span>
          <h4>誰かの役に立つような素敵なコンテンツを作成しています。</h4>
          <div className="profile--roomLinkIcon">
            <div className="profile--roomIcon">
              <RoomIcon className="profile--room" />
              名古屋県名古屋市
            </div>
            <div className="profile--linkIcon">
              <LinkIcon className="profile--link" />
              <a href="#">
                https://www.howtonote.jp/twitter/setting/index1.html
              </a>
            </div>
          </div>
          <div className="profile--calenderIcon">
            <CalendarMonthIcon className="profile--calender" />
            2018年12月からTwitterを利用しています
          </div>
          <div className="profile--follow">
            <h4>24フォロー中 2フォロワー</h4>
          </div>
        </div>
        <FlipMove>
          {posts.map((post) => (
            <Post
              key={post.text}
              displayName={post.displayName}
              userName={post.userName}
              verified={post.verified}
              text={post.text}
              avator={post.avator}
              image={post.image}
            />
          ))}
        </FlipMove>
      </div>
      <Widgets />
    </>
  );
}

export default Profile;
