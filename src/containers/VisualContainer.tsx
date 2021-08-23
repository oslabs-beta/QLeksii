import React, { FunctionComponent, useState }  from "react";
import Visualizer from '../components/Visualizer';
import { Navbar } from "../components/Navbar";
import { GraphQLSidebar } from '../components/GraphQLSidebar';'../components/GraphQLSidebar';

type props = {
  tables: Array<string>,
  fields: Array<object>,
}

export const VisualContainer: FunctionComponent<props> = ({ fields, tables }) => {
  const [isMenuOpen, setMenuToOpen] = useState(false);
  /*
  toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );


  */

  return (
  <div>
    <Navbar isMenuOpen={isMenuOpen} onMenuToggle={() => setMenuToOpen(!isMenuOpen)} />
    <div className='container'>
    {!isMenuOpen ? null : <GraphQLSidebar tables={tables} fields={fields} isMenuOpen={isMenuOpen} onMenuToggle={() => setMenuToOpen(!isMenuOpen)}/>}
    <Visualizer fields={fields} tables={tables}/>
    </div>
    
  </div>
  )
} 