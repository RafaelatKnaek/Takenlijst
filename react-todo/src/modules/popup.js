import React, { useState, useEffect } from 'react';

function Popup({ message, handleClose }) {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div className={showPopup ? 'popup show' : 'popup'}>
      <div className="popup-content">
        <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Popup;
