import React from "react";
import "./modal.css";
import { deleteJob } from "firebase.config";
import { removeJob } from "Redux/Jobs/jobSlice";
import { useDispatch } from "react-redux";

function Modal({ setModalToggle, deleteJobId }) {
  const dispatch = useDispatch();

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalToggle(false)}>X</button>
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
          <button onClick={() => setModalToggle(false)} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={() => {
              deleteJob(deleteJobId);
              dispatch(removeJob(deleteJobId));
              setModalToggle(false);
            }}
            id="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
