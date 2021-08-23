import React, { FunctionComponent }  from "react";

type props = {
  onMenuToggle: () => void;
  isMenuOpen: boolean,
  tables: Array<string>,
  fields: Array<object>,
  uri: string
}

interface igraphQLData {
  Resolvers: string[],
  Types: string[]
}

export const GraphQLSidebar: FunctionComponent<props> = ({ tables, fields, isMenuOpen, onMenuToggle, uri}) => {
  
  console.log(tables);
  console.log(fields);

  const graphQLData: igraphQLData[] = [];

  return (
    <div onClick={onMenuToggle} className={`sidebar-menu ${isMenuOpen === true ? 'open' : ''}` }>
      <h1>Sidebar goes here</h1>
      <ul className='sidebar-list'>

      </ul>
    </div>
  )
}