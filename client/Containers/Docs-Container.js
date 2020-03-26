import React from 'react';
import DocsDisplay from '../Components/Docs-Display';
import Doc from '../Components/Doc';

function DocsContainer() {
  return (
    <div>
      <DocsDisplay />
      <Doc />
      <Doc />
      <Doc />
    </div>
  );
}

export default DocsContainer;
