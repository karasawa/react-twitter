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
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState, otherUserState } from "../../recoil/atom";
import Dialog from "../modal/Dialog";
import { useLocation } from "react-router-dom";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);

  const currentUser = useRecoilValue(currentUserState);
  const uid = currentUser.uid;

  const otherUser = useRecoilValue(otherUserState);
  const otherUserUid = otherUser.uid;

  const follow = async () => {
    const userDocRef = doc(db, "user", uid);
    await updateDoc(userDocRef, {
      followee: arrayUnion(otherUserUid),
    })
      .then(() => {
        console.log("success add followee");
      })
      .catch((error) => {
        console.log(error);
      });
    const otherUserDocRef = doc(db, "user", otherUserUid);
    await updateDoc(otherUserDocRef, {
      follower: arrayUnion(uid),
    })
      .then(() => {
        console.log("success add follower");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();
  let path;
  let target;
  let button;
  if (otherUserUid !== "") {
    path = "/home/otherUserProfile";
    target = otherUserUid;
    button = (
      <Button className="profile--button" onClick={follow}>
        フォローする
      </Button>
    );
  } else {
    path = location.pathname;
    target = uid;
    button = (
      <Button className="profile--button" onClick={() => setOpen(true)}>
        プロフィールを編集
      </Button>
    );
  }

  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(
      postData,
      where("sender", "==", target),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
    const docRef = doc(db, "user", target);
    onSnapshot(docRef, (snapShot) => {
      setProfile(snapShot.data({ serverTimestamps: "estimate" }));
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
          {button}
          <h3>{profile.username}</h3>
          <span className="profile--headerSpecial">
            <VerifiedUser className="profile--badge" />@{profile.username}
          </span>
          <h4>{profile.introduction}</h4>
          <div className="profile--roomLinkIcon">
            <div className="profile--roomIcon">
              <RoomIcon className="profile--room" />
              {profile.address}
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
            {profile.timestamp
              ? `${profile.timestamp.toDate().getFullYear()}年${
                  profile.timestamp.toDate().getMonth() + 1
                }月`
              : ""}
            からTwitterを利用しています
          </div>
          <div className="profile--follow">
            <h4>
              {typeof profile.followee === "undefined"
                ? 0
                : profile.followee.length}
              フォロー中{" "}
              {typeof profile.follower === "undefined"
                ? 0
                : profile.follower.length}
              フォロワー
            </h4>
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
      {path === "/home/otherUserProfile" ? (
        <></>
      ) : (
        <Dialog
          open={open}
          setOpen={setOpen}
          path={path}
          firstValue={profile.username}
          secondValue={profile.introduction}
          thirdValue={profile.address}
        />
      )}
    </>
  );
}

export default Profile;
