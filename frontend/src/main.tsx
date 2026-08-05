import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// Self-hosted variable font. Replaces the render-blocking Google Fonts
// @import that previously sat at the top of index.css — the browser no
// longer has to resolve fonts.googleapis.com before it can paint text.
import "@fontsource-variable/inter";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found in index.html");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
