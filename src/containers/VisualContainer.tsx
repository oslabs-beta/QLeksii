import React, { FunctionComponent }  from "react";
import Visualizer from '../components/Visualizer';
import { Navbar } from "../components/Navbar";
import { GraphQLSidebar } from '../components/GraphQLSidebar';'../components/GraphQLSidebar';

type props = {
  tables: Array<string>,
  fields: Array<object>,
}

export const VisualContainer: FunctionComponent<props> = ({ fields, tables}) => {
  return (
  <div>
    <Navbar />
    <GraphQLSidebar />
    <Visualizer fields={fields} tables={tables}/>
  </div>
  )
} 