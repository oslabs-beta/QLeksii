import React, { FunctionComponent, useState } from 'react';
import { CodeMirror } from '../components/CodeMirror';
import SandBox from './SandBox';

type props = {
  data: igraphQLData;
  uri: string;
};

// stores the string generated from the function component
interface igraphQLData {
  Resolvers: string;
  Types: string[];
  Mutations: string;
  Query: string;
  Mutation: string;
}

// exports the table, fields, etc
export const GraphQLSidebar: FunctionComponent<props> = ({ data, uri }) => {
  const [display, setDisplay] = useState('');
  const [code, setCode] = useState('');
  const [codeIsOpen, setCodeIsOpen] = useState(false);

  // constructs the string to be provided to the interface
  const { Resolvers, Types, Mutations, Query, Mutation } = data;
  let type = '';
  for (let i = 0; i < Types.length; i++) {
    type += `${Types[i]}
    
`;
  }
  function handleClick(event: any) {
    setDisplay(event.target.value);
  }
  // renders the populated entries from interface once button is clicked
  return (
    <div className={`sidebar-menu`}>
      <button onClick={handleClick} value={'Resolvers'}>
        Resolvers
      </button>
      <button onClick={handleClick} value={'Types'}>
        Types
      </button>
      <button onClick={handleClick} value={'Mutations'}>
        Mutations
      </button>
      <button onClick={handleClick} value={'Query'}>
        Query
      </button>
      <button onClick={handleClick} value={'Query Mutation'}>
        Query Mutation
      </button>
      {/*Once clicked, renders a GraphiQL interface that includes all the queries, resolvers, etc*/}
      <SandBox uri={uri} />

      {display === 'Resolvers' ? (
        <ul className='sidebar-list-title'>
          <li>Resolvers</li>
          <ul className='sidebar-list-info'>
            <CodeMirror value={Resolvers} />{' '}
          </ul>{' '}
        </ul>
      ) : null}
      {display === 'Types' ? (
        <ul className='sidebar-list-title'>
          <li>Types</li>
          <ul className='sidebar-list-info'>
            <CodeMirror value={type} />
          </ul>{' '}
        </ul>
      ) : null}
      {display === 'Mutations' ? (
        <ul className='sidebar-list-title'>
          <li>Mutations</li>
          <ul className='sidebar-list-info'>
            <CodeMirror value={Mutations} />
          </ul>{' '}
        </ul>
      ) : null}
      {display === 'Query' ? (
        <ul className='sidebar-list-title'>
          <li>Query</li>
          <ul className='sidebar-list-info'>
            <CodeMirror value={Query} />
          </ul>{' '}
        </ul>
      ) : null}
      {display === 'Query Mutation' ? (
        <ul className='sidebar-list-title'>
          <li>Query Mutation</li>
          <ul className='sidebar-list-info'>
            <CodeMirror value={Mutation} />
          </ul>{' '}
        </ul>
      ) : null}

      {/* {display !== '' ? <CodeMirror value={display} /> :null} */}

      {/* <ul className='sidebar-list'>
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
      </ul> */}
    </div>
  );
};
