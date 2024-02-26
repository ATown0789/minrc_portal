import Button from "Components/Button";
import { auth, sendPasswordReset } from "firebase.config";
import React, { useId, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ type, userEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const id = useId();

  return (
    <>
      <div
        style={
          type === "forgotPassword"
            ? { display: "flex", justifyContent: "center", width: "100%" }
            : {}
        }
      >
        {type === "forgotPassword" && (
          <span className="login-element">
            <label
              className="nowrap"
              style={{ width: "auto" }}
              htmlFor={`username-${id}`}
            >
              Email:
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
        )}
      </div>
      <p className="input-error">{errorMessage}</p>
      <Button
        style={{ minWidth: "180px" }}
        variant="primary"
        onClick={async (e) => {
          e.preventDefault();
          type === "forgotPass"
            ? sendPasswordReset(email)
            : sendPasswordReset(userEmail);
          navigate("/");
        }}
      >
        Reset Password
      </Button>
    </>
  );
}

export default ForgotPassword;
