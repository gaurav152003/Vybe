import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import Videoplayer from "./Videoplayer";
import { GoUnmute, GoMute } from "react-icons/go";

function Storypage() {
  const { storyData } = useSelector((state) => state.story);
  const navigate = useNavigate();

  const [mute, setmute] = useState(false);
  const [progress, setprogress] = useState(0);
  const videoref = useRef(null);
  const [playing, setisplaying] = useState(true);

  const handlevideo = async () => {
    if (playing) {
      videoref.current.pause();
      setisplaying(false);
    } else {
      videoref.current.play();
      setisplaying(true);
    }
  };
  // IMAGE → 15 sec timer
  useEffect(() => {
    if (storyData?.mediatype === "image") {
      let time = 0;
      const timer = setInterval(() => {
        time += 100;
        setprogress((time / 15000) * 100);

        if (time >= 15000) {
          clearInterval(timer);
          navigate("/");
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [storyData]);
  useEffect(() => {
    if (storyData?.mediatype === "video") {
      const v = videoref.current;
      if (!v) return;

      const updateProgress = () => {
        const percent = (v.currentTime / v.duration) * 100;
        setprogress(percent || 0);
        if (v.currentTime >= v.duration) {
          navigate("/");
        }
      };

      v.addEventListener("timeupdate", updateProgress);

      return () => v.removeEventListener("timeupdate", updateProgress);
    }
  }, [storyData, navigate]);

  return (
    <div className="w-full  max-w-[500px]  h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col items-center justify-center">
      <div className="absolute top-1 left-0 w-full h-[3px] bg-white/30">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-white transition-all duration-100"
        ></div>
      </div>
      <div className="absolute top-6 left-0 w-full px-4 flex flex-col gap-1 z-[100] ">
        <div className="flex items-center justify-start gap-3">
          <div
            onClick={() => navigate(`/`)}
            className="text-white  text-[15px] font-semibold truncate max-w-[150px] cursor-pointer"
          >
            <IoMdArrowRoundBack className="w-[20px] h-[20px]" />
          </div>
          <div
            className="w-[40px] h-[40px] rounded-full p-[1px]
              bg-white cursor-pointer"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                onClick={() =>
                  navigate(`/profile/${storyData.author?.username}`)
                }
                src={storyData?.author?.profileImage || dp}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            onClick={() => navigate(`/profile/${storyData.author?.username}`)}
            className="text-white  text-[15px] font-semibold truncate max-w-[150px] cursor-pointer"
          >
            {storyData?.author?.username}
          </div>

          {storyData?.mediatype === "video" && (
            <div
              onClick={() => setmute((prev) => !prev)}
              className="absolute bottom-[10px] right-[10px] z-100"
            >
              {!mute ? (
                <GoUnmute className="w-[20px] h-[20px] text-white" />
              ) : (
                <GoMute className="w-[20px] h-[20px] text-white" />
              )}
            </div>
          )}
        </div>
      </div>
      {storyData?.mediatype == "image" && (
        <div className="w-fit md:w-fit h-auto md:h-auto overflow-hidden rounded flex justify-center items-center bg-black">
          <img
            className="w-full h-full object-cover"
            src={storyData.media}
            alt=""
          />
        </div>
      )}
      {storyData?.mediatype == "video" && (
        <div className="w-fit h-auto overflow-hidden relative rounded-2xl flex justify-center items-center bg-black">
          <video
            onClick={handlevideo}
            autoPlay
            ref={videoref}
            src={storyData?.media}
            muted={mute}
            playsInline
            preload="none"
            className="w-full h-[calc(100%-100px)] object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default Storypage;
