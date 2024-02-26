import React from "react";
import "./modal.css";
import { deleteJob } from "firebase.config";
import { removeJob } from "Redux/Jobs/jobSlice";
import { useDispatch } from "react-redux";
import ForgotPassword from "Views/Login/ForgotPassword";
import Button from "./Button";

function Modal({ setModalToggle, deleteJobId, modalType, email }) {
  const dispatch = useDispatch();

  return (
    <div className="modal-background">
      {modalType === "delete" ? (
        <div className="modal-container">
          <button className="close-btn" onClick={() => setModalToggle(false)}>
            &#x2715;
          </button>
          <div className="modal-title">
            <h1>WAIT! Are You Sure?</h1>
          </div>
          <div className="modal-body">
            <p>
              By deleting this job, it will be permenantly removed from the
              database and cannot be resotred.
            </p>
          </div>

          <div className="modal-footer">
            <Button
              variant="primary tertiary"
              onClick={() => setModalToggle(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteJob(deleteJobId);
                dispatch(removeJob(deleteJobId));
                setModalToggle(false);
              }}
              variant="primary delete"
              id="delete-btn"
            >
              Delete
            </Button>
          </div>
        </div>
      ) : modalType === "forgotPassword" ? (
        <div className="modal-container">
          <button className="close-btn" onClick={() => setModalToggle(false)}>
            &#x2715;
          </button>
          <div className="modal-title">
            <h2>Password Reset</h2>
          </div>
          <div className="modal-body">
            <p>Enter your email. </p>
            <p style={{ width: "60%" }}>
              If the email has an associated account, a link to reset your
              password will be sent to your inbox.
            </p>
          </div>

          <div style={{ flexWrap: "wrap" }} className="modal-footer">
            <ForgotPassword type={modalType} setModalToggle={setModalToggle} />
            <Button
              variant="primary tertiary"
              onClick={() => setModalToggle(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="modal-container">
          <button className="close-btn" onClick={() => setModalToggle(false)}>
            &#x2715;
          </button>
          <div className="modal-title">
            <h2>Password Reset</h2>
          </div>
          <div className="modal-body">
            <p>Are you sure you would like to reset your password?</p>
          </div>

          <div className="modal-footer">
            <Button
              variant="primary tertiary"
              onClick={() => setModalToggle(false)}
            >
              Cancel
            </Button>
            <ForgotPassword
              setModalToggle={setModalToggle}
              type={modalType}
              userEmail={email}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
