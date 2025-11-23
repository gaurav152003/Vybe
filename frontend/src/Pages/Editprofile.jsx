import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import axios from "axios";
import { serverUrl } from "../App";
import { setprofiledata, setuserData } from "../redux/UserSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { setpostData } from "../redux/PostSlice";

function Editprofile() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [frontendimage, setfrontendimage] = useState(
    userData?.profileImage || dp
  );
  const [backendimage, setbackendimage] = useState(null);
  const imageinput = useRef();
  const [fromdata, setformdata] = useState({
    name: userData.name,
    username: userData.username,
    bio: userData.bio || "",
    profession: userData.profession || "",
  });
  const dispatch = useDispatch();
  const handlechange = (e) => {
    setformdata({ ...fromdata, [e.target.name]: e.target.value });
  };
  const handleimage = (e) => {
    const file = e.target.files[0];
    if (!file) return; // prevent crash
    setbackendimage(file);
    setfrontendimage(URL.createObjectURL(file)); // preview image
  };

  const handleditprofile = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const form = new FormData();
      form.append("name", fromdata.name);
      form.append("username", fromdata.username);
      form.append("bio", fromdata.bio);
      form.append("profession", fromdata.profession);
      if (backendimage) {
        form.append("profileimage", backendimage);
      }

      const response = await axios.post(
        `${serverUrl}/api/user/editprofile`,
        form,
        { withCredentials: true }
      );

      dispatch(setprofiledata(response.data.user));
      dispatch(setuserData(response.data.user));

      setloading(false);
      navigate(`/profile/${userData.username}`);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      <div className="absolute inset-0 bg-white z-0"></div>

      <div className="absolute left-[5%] top-[5%] w-[90%] min-h-screen bg-black z-10 rounded-t-[60px]">
        {/* Back Icon + Header */}
        <div className="p-10 flex items-center gap-3">
          <IoMdArrowRoundBack
            className="h-[30px] w-[30px] text-white cursor-pointer active:scale-95 transition"
            onClick={() => navigate(`/profile/${userData.username}`)}
          />
          <h2 className="text-white text-xl font-semibold cursor-pointer">
            Edit Profile
          </h2>
        </div>

        {/* CENTER DP */}
        <div className="w-full flex flex-col justify-center items-center mt-5">
          {/* Profile Image */}
          <div
            onClick={() => imageinput.current.click()}
            className="w-[80px] h-[80px] lg:w-[140px] lg:h-[140px] border-2 border-white rounded-full cursor-pointer overflow-hidden"
          >
            <input
              type="file"
              accept="image/*"
              ref={imageinput}
              hidden
              onChange={handleimage}
            />
            <img
              src={frontendimage}
              className="w-full h-full object-cover"
              alt="Profile Preview"
            />
          </div>

          <div
            onClick={() => imageinput.current.click()}
            className="mt-3 text-blue-400 text-sm lg:text-base cursor-pointer"
          >
            Change Your Profile Picture
          </div>

          {/* Input Fields */}
          <input
            type="text"
            className="mt-[15px] w-[90%] max-w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
            placeholder="Enter Your Name"
            onChange={handlechange}
            name="name"
            id="name"
            value={fromdata.name}
          />

          <input
            type="text"
            className="mt-[15px] w-[90%] max-w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
            placeholder="Enter Your Username"
            onChange={handlechange}
            name="username"
            id="username"
            value={fromdata.username}
          />

          <input
            type="text"
            className="mt-[15px] w-[90%] max-w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
            placeholder="Enter Your Bio"
            onChange={handlechange}
            name="bio"
            id="bio"
            value={fromdata.bio}
          />

          <input
            type="text"
            className="mt-[15px] w-[90%] max-w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
            placeholder="Enter Your Profession"
            onChange={handlechange}
            name="profession"
            id="profession"
            value={fromdata.profession}
          />

          {/* Save Button */}
          <div className="flex gap-[10px]">
            <button
              onClick={handleditprofile}
              className="px-[10px] min-w-[100px] lg:min-w-[120px] py-[3px] md:py-[5px] mt-[20px] h-[35px] md:h-[40px] bg-white cursor-pointer rounded-2xl hover:bg-[linear-gradient(to_left,_#a855f7,_#ec4899,_#ef4444,_#facc15)] hover:text-white"
            >
              {loading ? (
                <ClipLoader size={30} color="black" />
              ) : (
                "Save Profile"
              )}
            </button>
            <button
              onClick={() => navigate(`/profile/${userData.username}`)}
              className="px-[10px] min-w-[100px] lg:min-w-[120px] py-[3px] md:py-[5px] mt-[20px] h-[35px] md:h-[40px] bg-white cursor-pointer rounded-2xl hover:bg-[linear-gradient(to_left,_#a855f7,_#ec4899,_#ef4444,_#facc15)] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
