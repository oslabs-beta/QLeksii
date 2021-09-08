import React, { FunctionComponent, useState } from 'react';
import { VisualContainer } from './VisualContainer';
import { UriMenu } from '../components/UriMenu';
import Visualizer from '../components/Visualizer';

// create a main container component
export const MainContainer: FunctionComponent = () => {
  const [hasURI, setHasURI] = useState(false);
  const [data, setData] = useState({ fields: [], tables: [] });
  const [uri, setURI] = useState('');

  const clicky = (arg: { fields: []; tables: [] }) => {
    setData(arg);
    setHasURI(!hasURI);
  };

  function handleURI(uri: string) {
    setURI(uri);
  }

  return (
    // renders the div class that includes uri, fields, and tables
    <div>
      {hasURI ? (
        <VisualContainer uri={uri} fields={data.fields} tables={data.tables} />
      ) : (
        <UriMenu handleURI={handleURI} handleClick={clicky} />
      )}
    </div>
  );
};
