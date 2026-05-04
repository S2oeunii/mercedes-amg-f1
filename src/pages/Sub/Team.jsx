import React from 'react';
import Identity from './sections/Identity';
import Precision from './sections/Precision';
import Legacy from './sections/Legacy';

const Team = () => {
  return (
    <div className='bg-black'>
      <Identity />
      <Precision />
      <Legacy />
    </div>
  );
};

export default Team;
