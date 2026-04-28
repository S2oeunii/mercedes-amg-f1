import React from 'react'

const Identity = () => {

  return (
    <div className='px-6 py-[290px] md:pt-[15.99vw] md:pb-[16.04vw] md:pl-[28.39vw] md:pr-[28.44vw]
        flex flex-col gap-[35px] sm:gap-[2.86vw] sm:gap-[0.52vw] items-center justify-center text-center'
    >
        <h1
          className='font-archivo font-black italic text-[clamp(46px,_5.21vw,_100px)] leading-none tracking-none
            bg-[linear-gradient(to_bottom_right,#89ECDD_0%,#80A6CC_50%,#5D91C4_100%)]
            bg-clip-text text-transparent'
        >
            We Are<br />Silver Arrow
        </h1>
        <p className='text-white font-pretendard font-semibold text-[clamp(16px,_1.46vw,_28px)] leading-[1.5] tracking-[-0.004em]'>
            메르세데스-AMG 페트로나스 포뮬러 원 팀은<br />
            정밀한 엔지니어링과 지속적인 혁신을<br className='sm:hidden' /> 기반으로 경쟁하는 팀입니다.<br />
            강력한 팀워크와 기술력을 바탕으로<br />
            트랙 안팎에서 최고의 퍼포먼스를 만들어내고 있습니다.<br />
            끊임없이 한계를 넘어서는 것을 목표로 합니다.
        </p>
    </div>
  )
}

export default Identity