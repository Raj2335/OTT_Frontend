import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Route, RouterProvider,  createRoutesFromElements} from 'react-router'

import App from "./App.jsx";
import AppRoutes from "./AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
