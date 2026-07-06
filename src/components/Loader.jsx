import React from 'react';
import '../styles/Loader.css';

const Loader = ({ fullScreen = false }) => {
  const loaderMarkup = (
    <div className="domino-spinner">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary transition-opacity duration-700">
        {loaderMarkup}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-12">
      {loaderMarkup}
    </div>
  );
};

export default Loader;
