import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className='error'>
      <span>⛔️</span> {message}
    </div>
  );
};

export default ErrorComponent;
