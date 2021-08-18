import React, { FunctionComponent }  from "react";

type CardsProps = {
    table: string,
    fields: object
}

const Card: FunctionComponent <CardsProps> = ({ table, fields }) =>{
// const arr =[];
// for(let el in fields){
// arr.push(el, fields[el] )
// }

return(
    <div className="wrapper">
      <div className="table">
        <h2 className="table_header">{table}</h2>
        {/* <p className="table_fields">{fields}</p> */}
    </div>
    </div>	
);
}


  
export default Card;
