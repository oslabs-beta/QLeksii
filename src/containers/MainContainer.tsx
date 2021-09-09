import React, { FunctionComponent, useState } from 'react';
import { VisualContainer } from './VisualContainer';
import { UriMenu } from '../components/UriMenu';
import { Navbar } from '../components/Navbar';
import Visualizer from '../components/Visualizer';

interface igraphQLData {
  Resolvers: string;
  Types: string[];
  Mutations: string;
  Query: string;
  Mutation: string;
}

// create a main container component
export const MainContainer: FunctionComponent = () => {
  const [hasURI, setHasURI] = useState(false);
  const [data, setData] = useState<igraphQLData>({
    Resolvers: '',
    Types: [],
    Mutations: '',
    Query: '',
    Mutation: '',
  });
  const [uri, setURI] = useState('');
  const [fields, setFields] = useState([]);
  const [tables, setTables] = useState([]);
  const [isMenuOpen, setMenuToOpen] = useState(false);
  const handleClick = (data: igraphQLData, fields: [], tables: []) => {
    setData(data);
    setFields(fields);
    setTables(tables);
    setHasURI(!hasURI);
  };

  function handleURI(uri: string) {
    setURI(uri);
  }
  console.log(tables);
  return (
    // renders the div class that includes uri, fields, and tables
    <div className='MainContainer'>
      <Navbar
        onMenuToggle={hasURI ? () => setMenuToOpen(!isMenuOpen) : () => null}
      />
      {hasURI ? (
        <VisualContainer
          uri={uri}
          fields={fields}
          tables={tables}
          data={data}
          isMenuOpen={isMenuOpen}
        />
      ) : (
        <UriMenu handleURI={handleURI} handleClick={handleClick} />
      )}
    </div>
  );
};
