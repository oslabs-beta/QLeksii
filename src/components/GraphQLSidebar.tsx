import React, { FunctionComponent }  from "react";

type props = {
  onMenuToggle: () => void;
  isMenuOpen: boolean,
  tables: Array<string>,
  fields: Array<object>,
  data: igraphQLData
}

interface igraphQLData {
  Resolvers: string,
  Types: string[],
  Mutations: string 
}

export const GraphQLSidebar: FunctionComponent<props> = ({ tables, fields, isMenuOpen, onMenuToggle, data }) => {
  
  // console.log(tables);
  // console.log(fields);
  // console.log(data);
  const { Resolvers, Types, Mutations} = data;
  const typeArr = [];
  const resArr = [];
  for (let i = 0; i < Types.length; i++) {
    typeArr.push(<li key={i}>{Types[i]}</li>)
  }

  return (
    <div className={`sidebar-menu ${isMenuOpen === true ? 'open' : ''}` }>
      <h1>Sidebar goes here</h1>
      <ul className='sidebar-list'>
        <li>Resolvers</li>
        <ul className='sidebar-list'>
        {Resolvers}
        </ul>
      </ul>
      <ul className='sidebar-list'>
        <li>Types</li>
        <ul className='sidebar-list'>
        {typeArr}
        </ul>
      </ul>
      <ul className='sidebar-list'>
        <li>Mutations</li>
        <ul className='sidebar-list'>
        {Mutations}
        </ul>
      </ul>
    </div>
  )
}