import React, { FunctionComponent }  from "react";

type CardsProps = {
    table: string,
    fields: object
}

const Card: FunctionComponent <CardsProps> = ({ table, fields }) =>{
const arr =[];
for(let el in fields){
 if(el === null) {arr.push("no documents registered yet")}
     arr.push(el !== '__v' ? <div key={el} className='list'><li> {  el+ " - " + fields[el]}</li></div> : null);
}

return(
    <div className="wrapper">
      <div className="table">
        <h2 className="table_header">{table}</h2>
        <div className="table_fields">{arr}</div>
    </div>
    </div>	
);
}


  
export default Card;
