import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loopcard from "../components/Loopcard";
import { useSelector } from "react-redux";

function Loops() {
  const navigate = useNavigate();
  const { loopData } = useSelector((state) => state.loop);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center item-center">
      {/* HEADER FIXED */}
      <div className="flex items-center w-full h-[80px] gap-[20px] px-[20px]  fixed top-[2px] left-[5px] z-[100]">
        <IoMdArrowRoundBack
          className="h-[30px] w-[30px] text-white cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h2 className="text-white text-xl font-semibold">Loops</h2>
      </div>

      {/* SCROLL AREA */}
      <div className="h-[100vh] overflow-y-scroll  snap-y snap-mandatory scrollbar-hide">
        {loopData.map((loop, index) => (
          <div className="h-screen snap-start" key={index}>
            <Loopcard loop={loop} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loops;
