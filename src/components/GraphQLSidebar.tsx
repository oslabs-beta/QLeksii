import React, { FunctionComponent }  from "react";

type props = {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  tables: Array<string>;
  fields: Array<object>
}

export const GraphQLSidebar: FunctionComponent<props> = ({ tables, fields, isMenuOpen, onMenuToggle}) => {
  
  console.log(tables);
  console.log(fields);

  

  return (
    <div onClick={onMenuToggle} className={`sidebar-menu ${isMenuOpen === true ? 'open' : ''}` }>
      <h1>Sidebar goes here</h1>
    </div>
  )
}