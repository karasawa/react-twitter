import React from "react";
import "./SidebarOption.css";

function SidebarOption({ text, Icon, active, event }) {
  return (
    <div
      className={`sidebarOption ${active && "sidebarOption--active"}`}
      onClick={event}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
