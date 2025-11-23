import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setpostData } from "../redux/PostSlice";

function Getallpost() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return; // don't fetch if user is logged out

    const getallpost = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/post/getall`, {
          withCredentials: true,
        });
        dispatch(setpostData(response.data));
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getallpost();
  }, [dispatch, userData]);

  return <div></div>;
}

export default Getallpost;
