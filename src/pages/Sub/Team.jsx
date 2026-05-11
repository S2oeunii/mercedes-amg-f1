import React from 'react';
import Identity from './sections/Identity';
import Precision from './sections/Precision';
import Legacy from './sections/Legacy';
import Performance from './sections/Performance';

const Team = () => {
  return (
    <div className='bg-black'>
      <Identity />
      <Precision />
      <Legacy />
      <Performance />
    </div>
  );
};

export default Team;
