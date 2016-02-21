import React from 'react';

const Shared = ({ context, children }) => {
  var clonedChildren = React.Children.map(children, (child) => React.cloneElement(child, { context }));

  return (
    <div>
      {
        clonedChildren
      }
    </div>
  );
};
export default Shared;
