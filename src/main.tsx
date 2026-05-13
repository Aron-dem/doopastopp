import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Disable right-click globally
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable drag globally
document.addEventListener('dragstart', (e) => e.preventDefault());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
