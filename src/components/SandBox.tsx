import React, { FunctionComponent } from 'react';

interface Props {
  uri: string;
}

const SandBox: FunctionComponent<Props> = ({ uri }) => {
  const startSandBox = () => {
    console.log('button click', uri);
    fetch('http://localhost:3333/injection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ URI: uri }),
    })
      .then((res) => {
        console.log('response recieved', res);
        window.darkMode.switch();
      })
      .catch((err) => console.log('Error writing remote sever'));
  };
  return <button onClick={startSandBox}>SandBox</button>;
};

export default SandBox;
