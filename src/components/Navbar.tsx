import React, { FunctionComponent } from 'react';
import { Darkmode } from './Darkmode';
type props = {
  onMenuToggle: () => void;
};

export const Navbar: FunctionComponent<props> = ({ onMenuToggle }) => {
  return (
    <div className='Navbar'>
      <ul>
        <li>
          <img className='logo' />
        </li>
        <li>
          <img
            className='menu-button'
            src='./menu_bar.png'
            onClick={onMenuToggle}
          />
        </li>
        <li>
          <Darkmode />
        </li>
      </ul>
    </div>
  );
};
