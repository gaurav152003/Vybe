import React from "react";
import logo from "../assets/logo2.png";
import { FaRegHeart } from "react-icons/fa6";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setuserData } from "../redux/UserSlice";
import Otherusers from "./Otherusers";
import { useNavigate } from "react-router-dom";
function Lefthome() {
  const navigate = useNavigate();
  const { userData, suggestedusers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setuserData(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo} className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      <div className="flex items-center gap-[10px] justify-between px-[10px] ">
        <div className="flex items-center gap-[10px]">
          <div className="w-[50px] h-[50px] rounded-full border border-black cursor-pointer overflow-hidden ">
            <img
              onClick={() => navigate(`/profile/${userData.username}`)}
              src={userData.profileImage || dp}
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white w-full  font-semibold">
              {userData.username}
            </div>
            <div className="text-[13px] text-gray-400 ">{userData.name}</div>
          </div>
        </div>
        <div
          className="text-blue-500 font-semibold cursor-pointer"
          onClick={handlelogout}
        >
          Log Out
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-gray-700  to-transparent h-[2px] w-full mt-[10px]" />
      <div className="w-full flex flex-col gap-[20px] p-[20px] ">
        <h1 className="text-white font-semibold ">Suggested Users</h1>
        {suggestedusers &&
          suggestedusers
            .slice(0, 4)
            .map((user, index) => <Otherusers key={index} user={user} />)}
      </div>
    </div>
  );
}

export default Lefthome;
