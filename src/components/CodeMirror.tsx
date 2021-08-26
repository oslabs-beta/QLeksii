import React, { FunctionComponent } from 'react';
import { UnControlled } from 'react-codemirror2';

type props = {
  value: string
}

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
  )
} 