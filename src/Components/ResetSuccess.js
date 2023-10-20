import { setLoader } from "Redux/Loader/loaderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ResetSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoader(false));
  }, []);
  return (
    <>
      <div className="success-container">
        <h2>Your Password Has Been Successfully Been Reset</h2>

        <Link className="return-btn" to={"/"}>
          Return to Login
        </Link>
      </div>
    </>
  );
}

export default ResetSuccess;
