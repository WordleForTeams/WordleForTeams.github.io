import React, { useState } from 'react';

const buttonStyle = {
  backgroundColor: '#6264A7',
  color: 'white',
  fontSize: '16px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#6264A7',
  },
};

const handleRefresh = () => {
  setTimeout(() => {
    window.location.reload(true);
  }, 1);
};

const OverlayDialog = ({ isOpen, onClose, children }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'block' : 'none',
  };

  const dialogStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    display: isOpen ? 'block' : 'none',
    textAlign: "center"
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        {children}       
      </div>
    </div>
  );
};

export const Dailog = ({message, word=[]}) => {
  return (
    <div>
      <OverlayDialog isOpen={true} >
        <h2>{message}</h2>
        <p> {word.map((x, index) => (
            <span key={index}>{x}</span>
            ))}
        </p>
        <button style={buttonStyle} onClick={handleRefresh}>
            Play Again
        </button>
      </OverlayDialog>
    </div>
  );
};

export const Help = ({close}) => {
  return <div>
      <OverlayDialog isOpen={true} >
      <img style={{maxWidth:"70vw"}} src="/help.png" alt="Help Image" />
        <div>
        <button style={buttonStyle} onClick={close}>
            Close
        </button>
        </div>
      </OverlayDialog>
    </div>
}