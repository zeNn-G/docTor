import LiveDemo from "@/components/live-demo";
import React from "react";

import "@mdxeditor/editor/style.css";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className="container  max-w-screen-2xl">
      <LiveDemo />
    </div>
  );
};

export default MainPage;
