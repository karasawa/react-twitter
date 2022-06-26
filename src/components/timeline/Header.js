import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  let headerText;
  switch (path) {
    case "/home":
      headerText = "ホーム";
      break;
    case "/profile":
      headerText = "プロフィール";
      break;
  }

  return (
    <div className="timeline--header">
      <h2>{headerText}</h2>
    </div>
  );
}

export default Header;
