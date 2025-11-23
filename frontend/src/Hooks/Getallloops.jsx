import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setloopData } from "../redux/LoopSlice";

function Getallloops() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.loop);
  useEffect(() => {
    const fetchLoops = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/loop/getall`, {
          withCredentials: true,
        });
        dispatch(setloopData(response.data));
        //console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoops();
  }, [dispatch, userData]);

  return null;
}

export default Getallloops;
