import React from "react";
import logo from "../assets/logo2.png";
import { FaRegHeart } from "react-icons/fa6";
import Storycard from "./Storycard";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";
function Feed() {
  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      {/* mobile logo */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo} className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] mr-[-10px] w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex w-full overflow-auto gap-[10px] lg:gap-[18px] items-center mt-[-20px] lg:mt-[0px] lg:p-[20px] p-[10px]  ">
        <Storycard
          username={"Your Story"}
          profileImage={userData.profileImage}
          story={userData.story}
        />
      </div>
      <div className="w-[calc(100%-20px)] min-h-[100vh] flex flex-col items-center gap-[15px]  pt-[20px] bg-white rounded-t-[30px] lg:rounded-t-[40px] relative pb-[120px] mx-[10px]">
        <Nav />

        {postData?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
