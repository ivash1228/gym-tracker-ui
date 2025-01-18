import React from 'react';

function SaveButton({ onClick, text = 'Save' }) {
  return <button onClick={onClick} className="save-button">{text}</button>;
}

export default SaveButton;