import React, { FunctionComponent, useState, useEffect } from 'react';
import Visualizer from '../components/Visualizer';
import { Navbar } from '../components/Navbar';
import { GraphQLSidebar } from '../components/GraphQLSidebar';
('../components/GraphQLSidebar');

type props = {
  tables: Array<string>;
  fields: Array<object>;
  uri: string;
  data: igraphQLData;
  isMenuOpen: Boolean;
};
// stores generated string from post request to server
interface igraphQLData {
  Resolvers: string;
  Types: string[];
  Mutations: string;
  Query: string;
  Mutation: string;
}
// create a VisualContainer component that contains fields, tables, and uri
export const VisualContainer: FunctionComponent<props> = ({
  fields,
  tables,
  uri,
  data,
  isMenuOpen,
}) => {
  // const [sideBarData, setSideBarData] = useState<any>({});
  // sends a post request to qltest path with URI as JSON request body
  // useEffect(() => {
  //   fetch('http://localhost:3333/qltest', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ URI: uri }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSideBarData(data);
  //     })
  //     .catch((error) => console.log('Error', error));
  // }, []);
  //
  // const { data } = sideBarData;

  return (
    // renders the fields, tables, and uri on the visual container div
    <div className='VisualContainer'>
      <div className='container'>
        <Visualizer fields={fields} tables={tables} uri={uri} />
        {!isMenuOpen ? null : <GraphQLSidebar data={data} uri={uri} />}
      </div>
    </div>
  );
};
