import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";
import { TrackProvider } from "./contexts/TrackContext";

ReactDOM.render(
  <AuthProvider>
    <TrackProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TrackProvider>
  </AuthProvider>,
  document.getElementById("root")
);
