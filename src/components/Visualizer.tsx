import React, { FunctionComponent }  from "react";
import Card from './Card';

interface Props {
  tables: Array<string>,
  fields: Array<object>,
}
const Visualizer: FunctionComponent <Props> = ({ tables, fields }) => {
const output = tables.map((el, i) => <Card key={i} table={el} fields={fields[i]}/>);
return(
    <div className="wrapper__visualizer">
     {output}
    </div>
);
}


  
export default Visualizer;
