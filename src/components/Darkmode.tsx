import React, { FunctionComponent } from 'react';
// component for the dark mode functionality
export const Darkmode: FunctionComponent = () => {
  return (
    <div className='dark_mode'>
      <div className='text'>Dark Mode</div>
      <label className='switch'>
        <input
          type='checkbox'
          id='togBtn'
          onChange={(ch) => {
            window.darkMode.toggle();
          }}
        />
        <div className='slider round'></div>
      </label>
    </div>
  );
};
