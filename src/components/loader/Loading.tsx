import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loader-container show z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
