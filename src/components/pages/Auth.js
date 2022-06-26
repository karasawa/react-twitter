import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import "./Auth.css";
import { db, auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginOrRegister = async (e) => {
    await e.preventDefault();
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await setCurrentUser({ uid: userCredential.user.uid });
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log(userCredential.user.uid);
          const uid = await userCredential.user.uid;
          const userDocRef = await doc(db, "user", uid);
          await setDoc(userDocRef, {
            username: "",
            introduction: "",
            address: "",
            timestamp: serverTimestamp(),
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
      setIsLogin(true);
    }
  };

  return (
    <div className="auth">
      <div className="auth--header">
        <h2>Twitterにログイン</h2>
      </div>
      <div>
        <form>
          <div className="auth--input">
            <div className="auth--icon">
              <TwitterIcon className="auth--twitterIcon" />
            </div>
            <input
              placeholder="メールアドレス"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {isLogin ? (
              <div className="auth--buttonContainer">
                <Button className="auth--passChangeButton" type="button">
                  パスワードを忘れた場合はこちら
                </Button>
              </div>
            ) : (
              <></>
            )}
            <Button
              className="auth--loginButton"
              type="submit"
              onClick={loginOrRegister}
            >
              {isLogin ? "ログイン" : "新規作成"}
            </Button>
          </div>
        </form>
      </div>
      <div className="auth--footer">
        {isLogin ? <h2>アカウントをお持ちでない場合</h2> : <></>}
        <Button
          className="auth--toggleButton"
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "アカウント作成" : "ログイン画面へ戻る"}
        </Button>
      </div>
    </div>
  );
}

export default Auth;
