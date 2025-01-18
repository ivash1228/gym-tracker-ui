import React from 'react';

function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
  );
}

export default Modal;