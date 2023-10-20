import { setLoader } from "Redux/Loader/loaderSlice";
import { auth, resetPassword, sendPasswordReset } from "firebase.config";
import React, { useId, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const id = useId();

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };

  const query = useQuery();

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <div className="form-group">
        <span className="login-element">
          <label className="nowrap" htmlFor={`password-${id}`}>
            New Password:
          </label>
          <input
            type="password"
            id={`password-${id}`}
            placeholder="New Password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </span>
      </div>
      <p className="input-error">{errorMessage}</p>
      <button
        className="login-btn"
        type="button"
        onClick={async (e) => {
          dispatch(setLoader(true));
          e.preventDefault();
          try {
            await resetPassword(query.get("oobCode"), newPassword);
            navigate("/success-reset");
          } catch (err) {
            console.error(err);
            alert("An error occured while trying to reset password");
          }
        }}
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
