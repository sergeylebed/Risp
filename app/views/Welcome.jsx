import React from 'react';

export default function Welcome({ context }) {
  return (
    <div>
      <h1>Hello from main page</h1>
      <button onClick={() => context.redirect('#/Edit/100')}>Link</button>
    </div>
  );
}
