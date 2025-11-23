import React, { useState } from "react";

import logo from "../assets/logo2.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setfollowing, setuserData } from "../redux/UserSlice";

function Signin() {
  const [inputClicked, setinputClicked] = useState({
    username: false,
    password: false,
  });
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    setisloading(true);
    seterror("");
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signin`,
        formdata,
        { withCredentials: true }
      );
      dispatch(setuserData(response.data));
      dispatch(setfollowing(response.data.following));
      setisloading(false);
      window.location.href = "/";
    } catch (error) {
      seterror(error.response?.data?.message);
      console.error(" Signin failed:", error.message);
      setisloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-950 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-3xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-black flex-col gap-[10px] text-white text-[16px] font-semibold rounded-2xl shadow-2xl shadow-black">
          <img src={logo} className="w-[50%]" />
          <motion.p
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 50, y: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            Not Just A Platform, It's VYBE
          </motion.p>
        </div>

        {/* left */}
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign In To</span>
            <img src={logo} className="w-[70px]" />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setinputClicked({ ...inputClicked, username: true })}
          >
            <label
              htmlFor="username"
              className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.username ? "top-[-15px]" : ""
              }  `}
            >
              Enter Your Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={handlechange}
              value={formdata.username}
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setinputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.password ? "top-[-15px]" : ""
              }  `}
            >
              Enter Password
            </label>
            <input
              type={showpassword ? "text" : "password"}
              id="passsword"
              name="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={handlechange}
              value={formdata.password}
            />
            {!showpassword ? (
              <IoEye
                onClick={() => setshowpassword(true)}
                className="cursor-pointer absolute right-[20px] w-[25px] h-[25px]"
              />
            ) : (
              <IoEyeOff
                onClick={() => setshowpassword(false)}
                className="cursor-pointer right-[20px] w-[25px] h-[25px] absolute"
              />
            )}
          </div>
          <div
            className="w-[90%] px-[10px] cursor-pointer text-neutral-900"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password?
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            onClick={handleSignin}
            disabled={isloading}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] mt-[20px] cursor-pointer rounded-2xl"
          >
            {isloading ? <ClipLoader size={30} color="white" /> : "Log in"}
          </button>
          <p
            className="cursor-pointer text-gray-900"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?
            <span className="ml-[5px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
