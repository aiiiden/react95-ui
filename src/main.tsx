import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/fonts/fonts.css"
import "./styles/react95.css"
import "./styles/themes.css"
import { App } from "./showcase/App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
