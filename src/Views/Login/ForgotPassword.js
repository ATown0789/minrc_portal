import { auth, sendPasswordReset } from "firebase.config";
import React, { useId, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const id = useId();

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <div className="form-group">
        <span className="login-element">
          <label className="nowrap" htmlFor={`username-${id}`}>
            Username:
          </label>
          <input
            type="text"
            id={`username-${id}`}
            placeholder="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </span>
      </div>
      <p className="input-error">{errorMessage}</p>
      <button
        className="login-btn"
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          sendPasswordReset(email);
        }}
      >
        Send Password Reset Email
      </button>
    </div>
  );
}

export default ForgotPassword;
