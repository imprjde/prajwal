import React from "react";
import "./Popup.css";

const Popup = ({ setIsPopupOpen, deleteAllData }) => {
  return (
    <div className="overlay">
      <div className="mainPop">
        <div className="popUp">
          <div>
            <span>
              Are You Sure
              <br /> You Want To Delete All Data?
            </span>
          </div>
          <div className="buttonDiv">
            <button className="dbtn" onClick={deleteAllData}>
              Delete
            </button>
            <button className="cbtn" onClick={() => setIsPopupOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
