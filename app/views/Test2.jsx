import React from 'react';
import NumberPickerBar from '../components/NumberPickerBar.jsx';

const Test2 = () => {
  return (
    <div>
      <NumberPickerBar
        primaryIcon={<span>Hello</span>}
        secondaryIcon={<span>Goodby</span>}

        id='some'
        title='Hello'

        value={10}
        options={[1, 2, 3]}
        dialogOptions={[4, 5, 6]}

        columns={4}

        vertical={true}
        first={true}/>
    </div>
  );
};
export default Test2;
