import React from 'react';
import BgGroup from './sections/BgGroup';
import Identity from './sections/Identity';
import Precision from './sections/Precision';
import Legacy from './sections/Legacy';
import Performance from './sections/Performance';

const Team = () => {
  return (
    <div className='bg-black'>
      <BgGroup>
        <Identity />
        <Precision />
      </BgGroup>
      {/* <Identity />
      <Precision /> */}
      <Legacy />
      <Performance />
    </div>
  );
};

export default Team;
