import React from "react";
import "./loading.css";

import { RingLoader } from "react-spinners";

function Loading() {
  return (
    <div className="loading-overlay">
      <RingLoader color="#282d8b" />
      <h2>Loading...</h2>
    </div>
  );
}

export default Loading;
