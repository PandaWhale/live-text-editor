import React from 'react';

// CodeMirror imports
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

import Console from './Console';

const Editor = props => {
  const options = {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true
  };

  return (
    <div>
      <CodeMirror
        className="codemirror"
        value={props.code}
        options={options}
        onBeforeChange={(editor, data, value) => {
          props.updateCodeinState(value);
        }}
      />
      <button onClick={() => props.runCode(props.code)}>Run Code</button>
      <Console output={props.consoleOutput} />
    </div>
  );
};
export default Editor;
