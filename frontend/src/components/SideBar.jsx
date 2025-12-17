import React from "react";
import {
  video,
  home,
  history,
  collection,
  customer,
  settings,
} from "../assets/index";
import { SiGoogleassistant } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div
        className="h-full
      flex flex-col justify-around px-4 py-8"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 30%, rgba(70, 192, 141, 0.25), transparent 70%), #000000",
              }}
      >
        <div className="grid gap-2">
          <NavLink
            to="/"
            className="block py-2 pr-4   pl-3 duration-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:scale-105 hover:border-0">
                <img
                  src={home}
                  alt="home"
                  width="25px"
                  className="mx-2"
                />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  Home
                </span>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/history"
            className="block py-2 pr-4 pl-3 duration-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:border-0">
                <img
                  src={history}
                  alt="history"
                  width="25px"
                  className="mx-2"
                />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  History
                </span>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/mycontent"
            className="block py-2 pr-4 pl-3 duration-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:border-0">
                <img
                  src={video}
                  alt="support"
                  width="25px"
                  className="mx-2"
                />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  My Content
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            to="/collection"
            className="block py-2 pr-4 pl-3 duration-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:border-0">
                <img
                  src={collection}
                  alt="collection"
                  width="25px"
                  className="mx-2"
                />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  Collection
                </span>
              </div>
            )}
          </NavLink>
        </div>

        <div className="grid gap-2">
          <NavLink
            to="/ai-assistant"
            className="block py-2 pr-4 pl-3 duration-100 border-b border-gra y-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex  font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:border-0">
                <SiGoogleassistant size={25} className="mx-2" />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  AI-Assistant
                </span>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/contact-us"
            className="block py-2 pr-4 pl-3 duration-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
          >
            {({ isActive }) => (
              <div className="border-b-1 p-1.5 flex font-bold  hover:cursor-pointer hover:opacity-50 hover:scale-x-105 transition-all duration-100 hover:border-0">
                <img
                  src={customer}
                  alt="contact-us"
                  width="25px"
                  className="mx-2"
                />
                <span
                  className={isActive ? "text-orange-700" : "text-grey-700"}
                >
                  Contact Us
                </span>
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SideBar;
