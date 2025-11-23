import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setfollowing, setsuggesteduser } from "../redux/UserSlice";

function Getsuggesteduser() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return; // Only fetch if logged in

    const fetchuser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/user/suggesteduser`,
          { withCredentials: true }
        );
        dispatch(setsuggesteduser(response.data));
      } catch (error) {
        console.log(
          "Axios error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchuser();
  }, [dispatch, userData]);

  return null; // 👈 important! React components must return something (even null)
}

export default Getsuggesteduser;
