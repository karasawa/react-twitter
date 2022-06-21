import React from "react";
import "./Profile.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../timeline/Header";
import Widgets from "../widget/Widgets";
import { Avatar, Button } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import RoomIcon from "@mui/icons-material/Room";
import LinkIcon from "@mui/icons-material/Link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Profile() {
  return (
    <>
      <Sidebar />
      <div className="profile">
        <Header />
        <div className="profile--avatorContainer">
          <Avatar />
        </div>
        <div className="profile--buttonContainer">
          <Button className="profile--editButton">プロフィールを編集</Button>
        </div>
        <div className="profile--mainContainer">
          <h3>バズライター</h3>
          <span className="profile--headerSpecial">
            <VerifiedUser className="profile--badge" />
            @bazwriter
          </span>
          <h4>誰かの役に立つような素敵なコンテンツを作成しています。</h4>
          <div>
            <div>
              <RoomIcon />
              <p>名古屋県名古屋市</p>
            </div>
            <div>
              <LinkIcon />
              <p>https://www.howtonote.jp/twitter/setting/index1.html</p>
            </div>
          </div>
          <div>
            <CalendarMonthIcon />
            <p>2018年12月からTwitterを利用しています</p>
          </div>
          <div>
            <h4>24フォロー中 2フォロワー</h4>
          </div>
        </div>
      </div>
      <Widgets />
    </>
  );
}

export default Profile;
