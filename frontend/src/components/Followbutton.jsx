import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { togglefollow } from "../redux/UserSlice";
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";

function Followbutton({ targertuserId, tailwind, onfollowchange }) {
  const { following = [] } = useSelector((state) => state.user);
  const isfollowing = following.includes(targertuserId);
  const dispatch = useDispatch();

  const handlefollow = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/follow/${targertuserId}`,
        { withCredentials: true }
      );
      if (onfollowchange) {
        onfollowchange();
      }
      console.log(response);
      dispatch(togglefollow(targertuserId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handlefollow} className={tailwind}>
      {isfollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default Followbutton;
