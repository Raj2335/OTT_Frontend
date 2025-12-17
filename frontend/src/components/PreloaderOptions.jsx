import React, { useEffect, useState } from "react";
import "./PreloaderOptions.css";

const PreloaderOptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoader, setSelectedLoader] = useState(4); // Default to loader #5 (index 4)

  useEffect(() => {
    // Simulate content loading with a timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  const loaders = [
    // Loader 1: Pulsing circles
    <svg
      key="loader1"
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>,

    // Loader 2: Vertical bars translate
    <svg
      key="loader2"
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <rect x="20" y="50" width="4" height="10">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="50" width="4" height="10">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="40" y="50" width="4" height="10">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>,

    // Loader 3: Circles translate vertically
    <svg
      key="loader3"
      version="1.1"
      id="L5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle cx="6" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 15; 0 -15; 0 15"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle cx="30" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 10; 0 -10; 0 10"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle cx="54" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 5; 0 -5; 0 5"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>,

    // Loader 4: Rotating shrinking box
    <svg
      key="loader4"
      version="1.1"
      id="L6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <rect
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        x="25"
        y="25"
        width="50"
        height="50"
      >
        <animateTransform
          attributeName="transform"
          dur="0.5s"
          from="0 50 50"
          to="180 50 50"
          type="rotate"
          id="strokeBox"
          attributeType="XML"
          begin="rectBox.end"
        />
      </rect>
      <rect x="27" y="27" fill="#fff" width="46" height="50">
        <animate
          attributeName="height"
          dur="1.3s"
          attributeType="XML"
          from="50"
          to="0"
          id="rectBox"
          fill="freeze"
          begin="0s;strokeBox.end"
        />
      </rect>
    </svg>,

    // Loader 5: Rotating lines
    <svg
      key="loader5"
      version="1.1"
      id="L2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle
        fill="none"
        stroke="#00f5d4"
        strokeWidth="4"
        strokeMiterlimit="10"
        cx="50"
        cy="50"
        r="48"
      />
      <line
        fill="none"
        strokeLinecap="round"
        stroke="#00f5d4"
        strokeWidth="4"
        strokeMiterlimit="10"
        x1="50"
        y1="50"
        x2="85"
        y2="50.5"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
      <line
        fill="none"
        strokeLinecap="round"
        stroke="#00f5d4"
        strokeWidth="4"
        strokeMiterlimit="10"
        x1="50"
        y1="50"
        x2="49.5"
        y2="74"
      >
        <animateTransform
          attributeName="transform"
          dur="15s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
    </svg>,

    // Loader 6: Complex rotating shapes
    <svg
      key="loader6"
      version="1.1"
      id="L7"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <path
        fill="#00f5d4"
        d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="2s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="#00f5d4"
        d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="-360 50 50"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="#00f5d4"
        d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="2s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>,

    // Loader 7: Bars animating height
    <svg
      key="loader7"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <rect
        width="3"
        height="100"
        fill="#00f5d4"
        transform="translate(0) rotate(180 3 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="17"
        width="3"
        height="100"
        fill="#00f5d4"
        transform="translate(0) rotate(180 20 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
      <rect
        x="40"
        width="3"
        height="100"
        fill="#00f5d4"
        transform="translate(0) rotate(180 40 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </rect>
      <rect
        x="60"
        width="3"
        height="100"
        fill="#00f5d4"
        transform="translate(0) rotate(180 58 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </rect>
      <rect
        x="80"
        width="3"
        height="100"
        fill="#00f5d4"
        transform="translate(0) rotate(180 76 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
    </svg>,
  ];

  return <div className="preloader">{loaders[selectedLoader]}</div>;
};

export default PreloaderOptions;
