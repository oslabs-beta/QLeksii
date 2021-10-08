import React, { FunctionComponent } from 'react';
import Card from './Card';
import { useEffect } from 'react';

interface Props {
  tables: Array<string>;
  fields: Array<object>;
  uri: string;
}
// generates the table and fields for the visualizer component
const Visualizer: FunctionComponent<Props> = ({ tables, fields, uri }) => {
  const output = tables.map((el, i) => (
    <Card key={i} table={el} fields={fields[i]} />
  ));

  return (
    // renders the output array from the generated tables and fields
    <div>
      <div className='wrapper__visualizer'>{output}</div>
    </div>
  );
};

export default Visualizer;
