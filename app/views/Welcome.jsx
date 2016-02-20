import React from 'react';

export function Welcome({ redirect }) {
  return (
    <div>
      <h1>Hello from main page</h1>
      <button onClick={() => redirect('#/Edit/100')}>Link</button>
    </div>
  );
}
