import React, { useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { otherUserState } from "../../recoil/atom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const setOtherUser = useSetRecoilState(otherUserState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        logOut();
      }
    });
  });

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setOtherUser({ uid: "" });
        console.log("signout");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sidebar">
      {/* ツイッターアイコン */}
      <TwitterIcon className="sidebar--twitterIcon" />
      {/* SidebarOption */}
      <SidebarOption text="ログアウト" Icon={LogoutIcon} event={logOut} />
      <SidebarOption
        text="ホーム"
        Icon={HomeIcon}
        active={path === "/home" ? true : false}
        event={() => {
          setOtherUser({ uid: "" });
          navigate("/home");
        }}
      />
      <SidebarOption text="話題を検索" Icon={SearchIcon} />
      <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
      <SidebarOption text="メッセージ" Icon={MailOutlineIcon} />
      <SidebarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
      <SidebarOption
        text="プロフィール"
        Icon={PermIdentityIcon}
        active={path === "/profile" ? true : false}
        event={() => {
          setOtherUser({ uid: "" });
          navigate("/profile");
        }}
      />
      <SidebarOption text="もっとみる" Icon={MoreHorizIcon} />
      {/* ツイートボタン */}
      <Button variant="outlined" className="sidebar--tweet" fullWidth>
        ツイートする
      </Button>
    </div>
  );
}

export default Sidebar;
