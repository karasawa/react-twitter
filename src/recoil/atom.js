import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    uid: "",
  },
});

export const dialogState = atom({
  key: "dialogState",
  default: "",
});
