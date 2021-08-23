import React, { FunctionComponent, useState }  from "react";
import Visualizer from '../components/Visualizer';
import { Navbar } from "../components/Navbar";
import { GraphQLSidebar } from '../components/GraphQLSidebar';'../components/GraphQLSidebar';

type props = {
  tables: Array<string>,
  fields: Array<object>,
  uri: string
}

export const VisualContainer: FunctionComponent<props> = ({ fields, tables, uri}) => {
  const [isMenuOpen, setMenuToOpen] = useState(false);
  /*
  toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );


  */

  if(isMenuOpen){
    fetch("http://localhost:3333/qltest", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({URI: uri}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success', data);
    })
    .catch(error => console.log('Error', error));
  }

  return (
  <div>
    <Navbar isMenuOpen={isMenuOpen} onMenuToggle={() => setMenuToOpen(!isMenuOpen)} />
    <div className='container'>
    {!isMenuOpen ? null : <GraphQLSidebar uri={uri} tables={tables} fields={fields} isMenuOpen={isMenuOpen} onMenuToggle={() => setMenuToOpen(!isMenuOpen)}/>}
    <Visualizer fields={fields} tables={tables}/>
    </div>
    
  </div>
  )
} 