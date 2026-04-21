import React from 'react'
import bgPattern from '../../../assets/img/race/Bg.png';
import mobileBg from '../../../assets/img/race/Bg_Mobile.png';

const Race = () => {
  return (
    <div className='bg-[linear-gradient(to_bottom,#000000db_0%,#00000033_100%)]
      sm:bg-[linear-gradient(to_bottom,#000000c7_0%,#00000033_100%)]
      relative py-25 lg:pt-[9.38vw] lg:pb-[10.42vw] w-full h-[583px] sm:h-[52.97vw] flex flex-col overflow-hidden'
    >
        <img src={bgPattern} className="absolute left-0 top-0 w-full h-auto hidden sm:block" />
        <img src={mobileBg} className="absolute left-0 top-0 w-full h-auto sm:hidden" />
    </div>
  )
}

export default Race