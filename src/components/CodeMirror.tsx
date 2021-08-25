import React, { FunctionComponent } from 'react';
import { UnControlled } from 'react-codemirror2';

export const CodeMirror: FunctionComponent = () => {
  return (
    <UnControlled
      className='codeMirror'
      value='state goes here'
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      }}  
    />
  )
} 