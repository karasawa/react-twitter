import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./Dialog.css";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Dialog({ open, setOpen, path, firstValue, secondValue, thirdValue }) {
  const [content, setContent] = useState({ first: "", second: "", third: "" });

  const currentUser = useRecoilValue(currentUserState);
  const uid = currentUser.uid;

  useEffect(() => {
    setContent({ first: firstValue, second: secondValue, third: thirdValue });
  }, [open]);

  const clickEvent = async () => {
    if (path === "/profile") {
      const docRef = doc(db, "user", uid);
      await updateDoc(docRef, {
        username: content.first,
        introduction: content.second,
        address: content.third,
      })
        .then(() => {
          console.log("success profile update");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  let mainText;
  let label;
  let buttonText;
  switch (path) {
    case "/profile":
      mainText = "プロフィールを編集";
      label = {
        firstLabel: "名前",
        secondLabel: "自己紹介",
        thirdLabel: "場所",
      };
      buttonText = "保存";
      break;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="dialog--container">
            <IconButton
              className="dialog--closeButton"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <h2>{mainText}</h2>
            <label>{label.firstLabel}</label>
            <input
              value={content.first}
              onChange={(e) =>
                setContent({ ...content, first: e.target.value })
              }
            />
            <label>{label.secondLabel}</label>
            <input
              value={content.second}
              onChange={(e) =>
                setContent({ ...content, second: e.target.value })
              }
            />
            <label>{label.thirdLabel}</label>
            <input
              value={content.third}
              onChange={(e) =>
                setContent({ ...content, third: e.target.value })
              }
            />
            <Button className="dialog--button" onClick={clickEvent}>
              {buttonText}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Dialog;
