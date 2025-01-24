import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { StocksProvider } from "./context/StocksContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StocksProvider>
    <ToastContainer />
    <App />
  </StocksProvider>
);
