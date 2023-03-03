import React from "react";
import { createRoot } from "react-dom/client";
//import Hello from "./Hello.jsx";
import App from "./App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
