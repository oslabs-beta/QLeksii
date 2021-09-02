import React, { FunctionComponent, useState, useEffect }  from "react";
import Visualizer from '../components/Visualizer';
import { Navbar } from "../components/Navbar";
import { GraphQLSidebar } from '../components/GraphQLSidebar';'../components/GraphQLSidebar';

type props = {
  tables: Array<string>,
  fields: Array<object>,
  uri: string
}

interface igraphQLData {
  Resolvers: string[],
  Types: string[]
}

export const VisualContainer: FunctionComponent<props> = ({ fields, tables, uri }) => {
  const [isMenuOpen, setMenuToOpen] = useState(false);
  const [sideBarData, setSideBarData] = useState<any>({});
  /*
  toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );


  */

  useEffect(() => {

    fetch("http://localhost:3333/qltest", {
    method: 'POST',
     headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({URI: uri}),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success', data);
      setSideBarData(data);
    })
    .catch(error => console.log('Error', error));

  }, []);

  const { data } = sideBarData;

  return (
  //changed to visualcontainer class
  <div className='VisualContainer'>
    <Navbar onMenuToggle={() => setMenuToOpen(!isMenuOpen)} />
    <div className='container'>
    {!isMenuOpen ? null : <GraphQLSidebar data={data} tables={tables} fields={fields} isMenuOpen={isMenuOpen} onMenuToggle={() => setMenuToOpen(!isMenuOpen)}/>}
    <Visualizer fields={fields} tables={tables}/>
    </div>
    
  </div>
  )
} 