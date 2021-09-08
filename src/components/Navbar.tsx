import React, { FunctionComponent } from 'react';
import { Darkmode } from './Darkmode';
type props = {
  onMenuToggle: () => void;
};
// create a navbar that has Dark Mode and menu button components
export const Navbar: FunctionComponent<props> = ({ onMenuToggle }) => {
  return (
    <div className='Navbar'>
      <ul>
        {/* <li>
          <img className='logo' />
        </li> */}
        <li>
          <Darkmode />
        </li>
        <li>
          <img
            className='menu-button'
            src='./menu_bar.png'
            onClick={onMenuToggle}
          />
        </li>
      </ul>
    </div>
  );
};
