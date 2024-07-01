import React, { useState, useEffect } from 'react';
import '../../styles/popup.css';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  const hidePopup = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      hidePopup();
    };
  }, []);

  return (
    isVisible && (
      <div className="popup">
        <div className="popup-item">
          <img src="/images/logo/tick-mark-removebg-preview.png" alt="error" className="image" />
          <h2>Thank You</h2>
          <p>Your details have been successfully submitted. Thanks</p>
          <button onClick={hidePopup}>OK</button>
        </div>
      </div>
    )
  );
};