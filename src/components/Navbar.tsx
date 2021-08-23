import React, { FunctionComponent }  from "react";

type props = {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar: FunctionComponent<props> = ({ isMenuOpen, onMenuToggle}) => {
  return (
  <div className='Navbar'>
    <ul>
      <li>Logo</li>
      <li><button onClick={onMenuToggle} >Menu</button></li>
    </ul>
  </div>
  )
} 