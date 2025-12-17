import React from "react";
import errorImg from "../assets/errorImg.png"; 

const Error = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 30%, rgba(70, 192, 141, 0.25), transparent 70%), #000000",
              }}
    >
      <img
        src={errorImg}
        alt="No content illustration"
        className="w-64 mb-6"
      />
      <p className="text-lg"> Plaese Signin or Signup first</p>
    </div>
  );
};

export default Error;
