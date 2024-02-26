import React, { useEffect } from "react";
import "./contact.css";
import { useDispatch } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";

function Contact() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  return (
    <div className="tab-content">
      <h1>Support</h1>
      <div className="inner-tab-content">
        <div className="contact-info-container">
          <h3>MINRC Support</h3>
          <p>
            If you have any questions, comments, or concerns about the content
            of the MINRC Job Portal please reach out to use via:
          </p>
          <a href="mailto:admin@minrcportal.com">admin@minrcportal.com</a>

          <h3>Technical Support</h3>
          <p>
            For any help with the functionality of the MINRC Job Portal, to
            report any bugs/issues you have encountered, or if you have any
            suggestions for the app please contact us at:
          </p>
          <a href="mailto:support@minrcportal.com">support@minrcportal.com</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
