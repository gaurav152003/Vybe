import React from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { useNavigate } from "react-router-dom";
import Followbutton from "./Followbutton";

function Otherusers({ user }) {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80px] flex items-center justify-between border-b-2 border-gray-900 px-[10px]">
      {/* Left side: profile image + names */}
      <div className="flex items-center gap-[10px]">
        <div
          className="w-[40px] h-[40px] rounded-full border border-black cursor-pointer overflow-hidden"
          onClick={() => navigate(`/profile/${user.username}`)}
        >
          <img
            src={user.profileImage || dp}
            className="w-full object-cover"
            alt="user"
          />
        </div>
        <div>
          <div className="text-[18px] text-white font-semibold">
            {user.username}
          </div>
          <div className="text-[13px] text-gray-400">{user.name}</div>
        </div>
      </div>

      {/* Right side: Follow button */}
      <Followbutton
        tailwind={
          "px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl flex items-center justify-center font-semibold cursor-pointer hover:bg-blue-500 transition"
        }
        targertuserId={user._id}
      />
    </div>
  );
}

export default Otherusers;
