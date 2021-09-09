import React, { FunctionComponent, useState } from 'react';
import { Navbar } from './Navbar';
type props = {
  handleClick: (data: igraphQLData, fields: [], tables: []) => void;
  handleURI: (uri: string) => void;
};
interface igraphQLData {
  Resolvers: string;
  Types: string[];
  Mutations: string;
  Query: string;
  Mutation: string;
}
// component for the URI input
export const UriMenu: FunctionComponent<props> = ({
  handleClick,
  handleURI,
}) => {
  const [change, setChange] = useState('');
  // sends a post request with URI as JSON request body to the server
  const handleSubmit = () => {
    fetch('http://localhost:3333/qltest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ URI: change }),
    })
      .then((response) => response.json())
      .then((body) => {
        handleURI(change);
        console.log(body);
        handleClick(body.data, body.fields, body.tables);
      })
      .catch((error) => console.log('Error', error));
  };
  return (
    // renders the URI component to the app
    <div className='wrapper__Uri'>
      <div className='URI_Bar'>
        <input
          className='Input__uri'
          type='text'
          onChange={(e) => {
            setChange(e.target.value);
          }}
          value={change}
          placeholder='Write Uri Here'
        />
        <button className='sendURI' onClick={handleSubmit}>
          Send URI
        </button>
      </div>
    </div>
  );
};
