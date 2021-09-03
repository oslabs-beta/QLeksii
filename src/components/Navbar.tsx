import React, { FunctionComponent }  from "react";

type props = {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar: FunctionComponent<props> = ({ isMenuOpen, onMenuToggle}) => {
  return (
  <div className='Navbar'>
    <ul>
      <li><img className='logo'/></li>
      <li><img className='menu-button'  src='./menu_bar.png' onClick={onMenuToggle}/></li>
    </ul>
  </div>
  )
} 