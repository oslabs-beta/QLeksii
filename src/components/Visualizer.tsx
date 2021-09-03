import React,  { FunctionComponent}  from "react";
import Card from './Card';
import { useEffect } from 'react';

interface Props {
  tables: Array<string>,
  fields: Array<object>,
  uri:string
}
const Visualizer: FunctionComponent <Props> = ({ tables, fields, uri}) => {
const output = tables.map((el, i) => <Card key={i} table={el} fields={fields[i]}/>);

useEffect(() => {
    fetch("http://localhost:3333/injection", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({URI:uri}),
    })
    .catch(error => console.log('Error', error));
   
  }, []);
return(
  <div>
    <div className="wrapper__visualizer">
     {output}
    </div>
    {/* <button id="darkSide" onClick={handleSubmit}>Join Dark Side</button> */}
    </div>
);
}


  
export default Visualizer;
