import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import HostRoute from "./HostRoute";
import "antd/dist/antd.css";
import "./App.css";

import fire from "./config/config";

function App() {
  // const [userVal, setUserVal] = useState(false);
  // const session = localStorage.getItem("Auth Token");
  // const type = localStorage.getItem("type");
  // console.log(session);

  return (
    <div style={{ height: "100%" }}>
      <Routes />
    </div>
  );
}

export default App;
