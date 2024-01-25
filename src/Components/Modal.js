import React from "react";
import "./modal.css";
import { deleteJob } from "firebase.config";
import { removeJob } from "Redux/Jobs/jobSlice";
import { useDispatch } from "react-redux";
import ForgotPassword from "Views/Login/ForgotPassword";
import Button from "./Button";

function Modal({ setModalToggle, deleteJobId, modalType }) {
  const dispatch = useDispatch();

  return (
    <div className="modal-background">
      {modalType === "delete" ? (
        <div className="modal-container">
          <button className="close-btn" onClick={() => setModalToggle(false)}>
            X
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
            <Button variant="tertiary" onClick={() => setModalToggle(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteJob(deleteJobId);
                dispatch(removeJob(deleteJobId));
                setModalToggle(false);
              }}
              variant="danger"
              id="delete-btn"
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="modal-container">
          <button className="close-btn" onClick={() => setModalToggle(false)}>
            &#x2715;
          </button>
          <div className="modal-title">
            <h2>Forgot Your Password?</h2>
          </div>
          <div className="modal-body">
            <p>Enter your email. </p>
            <p>
              If the email has an associated account, a link to reset your
              password will be sent to your inbox.
            </p>
          </div>

          <div className="modal-footer">
            <ForgotPassword />
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
