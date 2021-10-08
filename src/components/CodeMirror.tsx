import React, { FunctionComponent } from 'react';
import { UnControlled } from 'react-codemirror2';

type props = {
  value: string;
};
// renders the queries, etc. in a code editor on the electron app
export const CodeMirror: FunctionComponent<props> = ({ value }) => {
  return (
    <UnControlled
      className='codeMirror'
      value={value}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      }}
    />
  );
};
