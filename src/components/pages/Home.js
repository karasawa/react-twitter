import React from "react";
import "../../App.css";
import Sidebar from "../sidebar/Sidebar";
import Timeline from "../timeline/Timeline";
import Widgets from "../widget/Widgets";

function Home() {
  return (
    <>
      <Sidebar />
      <Timeline />
      <Widgets />
    </>
  );
}

export default Home;
