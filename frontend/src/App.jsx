import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AdvancedPreloader from "./components/AdvancedPreloader";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <AdvancedPreloader />
        <div className="h-screen grid sm:grid-rows-12 box-border">
          <div className="row-span-1 z-15">
            <Header />
          </div>
          <div className="row-span-11 grid grid-cols-12">
            <div className="col-span-2">
              <SideBar />
            </div>
            <div className="col-span-10 overflow-y-auto hide-scrollbar scroll-smooth"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 30%, rgba(70, 192, 141, 0.25), transparent 70%), #000000",
              }}
            >
              <Outlet />
            </div>
            <style>
              {`
                .hide-scrollbar {
                  scrollbar-width: none;
                }
              `}
            </style>
          </div>
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
