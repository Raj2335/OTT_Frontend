import React, { useState } from "react";
import { Himage1 } from "../assets/index";
import { useNavigate } from "react-router-dom";
import DeleteVideoButton from "./DeleteVideoButton";

function Card({
  layout = "vertical",
  image = Himage1,
  title = "How to make magiee in 10 seconds without water..",
  views = "100k Views",
  time = "18hrs ago",
  authorName = "Yash Mittal",
  authorAvatar = "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  videoId,
  showDelete = false,
  onDeleteVideo
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (videoId) {
      navigate(`/video/${videoId}`);
    } else {
      navigate(`/video-section`);
    }
  }



  // Vertical layout
  if (layout === "vertical") {
    return (
      <div
        className="h-full w-[18rem] flex flex-col relative z-0 cursor-pointer mt-4 ml-4 hover:scale-102"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Delete Button - Only shown when showDelete is true and on hover */}
        {showDelete && isHovered && (
          <DeleteVideoButton
            videoId={videoId}
            onDelete={onDeleteVideo}
          />
        )}

        {/* Image */}
        <div className="h-[9rem] text-center relative">
          <img
            src={image}
            className="rounded-sm w-full h-full"
            alt="card-pic"
          />
        </div>

        {/* Avatar + Title */}
        <div className="h-[3rem] flex mt-2">
          <div className="avatar">
            <div className="h-11 w-12 rounded-full overflow-hidden">
              <img src={authorAvatar} alt={'avatar'} />
            </div>
          </div>
          <div className="w-full text-start px-3 font-bold overflow-hidden">
            <span className="leading-tight">{title}</span>
          </div>
        </div>

        {/* Views + Time + Author Name */}
        <div className="h-[2.5rem]">
          <ul className="flex text-sm px-4 justify-between">
            <li className="pl-10.5">{views}</li>
            <li className="list-disc">{time}</li>
          </ul>
          <ul className="text-start px-15">
            <li>{authorName}</li>
          </ul>
        </div>
      </div>
    );
  }

  // Horizontal layout
  else return (
    <div
  className="flex gap-5 max-w-[65rem] bg-transparent p-3 rounded-md border-1 border-blue-800 shadow-[0px_0px_6px_blue] 
  overflow-hidden relative transition-transform hover:scale-101 cursor-pointer z-0 mt-4 ml-4"
      onClick={handleClick}
    >
      {/* Delete Button - Only shown when showDelete is true and on hover */}
      {showDelete && isHovered && (
        <DeleteVideoButton
          videoId={videoId}
          onDelete={onDeleteVideo}
        />
      )}

      {/* Image */}
      <div className="w-1/3 min-w-[200px] max-w-[250px] h-[170px] rounded-md overflow-hidden flex items-center justify-center bg-black/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-evenly flex-1">
        {title && (
          <span className="font-bold text-lg leading-snug w-10/14 h-1/2 overflow-hidden">{title}</span>
        )}
        <div className="flex gap-3 text-sm text-gray-400 mt-1">
          <span>{views}</span>
          <li claclassName="list-disc">{time}</li>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {authorAvatar && (
            <img
              src={authorAvatar}
              alt={authorName}
              className="h-10 w-10 object-cover rounded-full"
            />
          )}
          <span className="font-medium">{authorName}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
