import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "./TweetBox.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const currentUser = useRecoilValue(currentUserState);
  const uid = currentUser.uid;

  const sendTweet = async (e) => {
    await e.preventDefault();
    const docRef = await doc(db, "user", uid);
    const docSnap = await getDoc(docRef);
    const userData = await docSnap.data();
    console.log(docSnap.data());
    try {
      await addDoc(collection(db, "posts"), {
        displayName: userData.username,
        userName: userData.username,
        verified: true,
        text: tweetMessage,
        avator: "http://shincode.info/wp-content/uploads/2021/12/icon.png",
        image: tweetImage,
        timestamp: serverTimestamp(),
        sender: uid,
      });
      await console.log("Create success");
    } catch (e) {
      await console.error("Error adding document: ", e);
    }
    await setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox--input">
          <Avatar />
          <input
            placeholder="今どうしてる？"
            type="text"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          ></input>
        </div>
        <input
          className="tweetBox--imageInput"
          placeholder="画像のURLを入力してください"
          type="text"
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
        ></input>
        <Button
          className="tweetBox--tweetButton"
          type="submit"
          onClick={sendTweet}
          disabled={tweetMessage ? false : true}
        >
          ツイートする
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
