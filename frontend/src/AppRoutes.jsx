import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Home,
  Collection,
  MyContent,
  ContactUs,
  AIAssistant,
  History,
  VideoSection
} from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="history" element={<History />} />
      <Route path="mycontent" element={<MyContent />}/>
      <Route path="collection" element={<Collection />} />
      <Route path="ai-assistant" element={<AIAssistant />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="video/:id" element={<VideoSection/>} />
    </Route>
  )
)

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;