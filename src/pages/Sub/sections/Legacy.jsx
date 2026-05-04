import React from 'react'
import MoreView from '../../../components/buttons/MoreView';

const Legacy = () => {
  return (
    <div className='flex flex-col px-6 py-25 sm:px-[14.58vw] sm:pt-[9.38vw] sm:pb-[10.42vw] overflow-hidden'>
        <div className='flex flex-col gap-[28px] sm:gap-[5.21vw] w-full text-left items-start justify-center'>
            <span className='text-[#00F4D0] text-[14px] sm:text-[1.35vw] font-pretendard font-semibold leading-none tracking-none'>
                Built to Win
            </span>
            <p className='text-[#C0C7CE] text-[12px] sm:text-[1.35vw] font-pretendard font-light leading-[1.5] tracking-tight'>
                메르세데스는 Formula 1 역사에서 <br className='sm:hidden' />가장 뛰어난 성과를 기록한 팀 중 하나입니다.<br />
                다수의 챔피언십과 우승 기록은 팀의 기술력과 운영 역량을 보여줍니다.<br />
                지속적으로 축적된 성과는 현재의 경쟁력을 유지하는 중요한 기반입니다.
            </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-28px sm:gap-[5.47vw]
            mt-20 sm:mt-[8.75vw] sm:mb-[6.56vw]'
        >
            <div></div>

            <div className='w-full sm:w-auto flex sm:flex-col sm:gap-[1.56vw] justify-between sm:justify-center items-start
                text-white hover:text-[#00F4D0] font-archivo font-light tracking-none
                transition-text duration-300 cursor-default'
            >
                <div className='flex flex-col gap-[10px] sm:gap-[1.04vw]'>
                    <p className='text-4 sm:text-[1.04vw] leading-[1.25]'>
                        Constructors’<br />
                        Championships
                    </p>
                    <div className='bg-white/30 w-[74px] sm:w-[4.95vw] h-[1px]'></div>
                </div>
                <p className='text-[100px] sm:text-[7.60vw] leading-none'>8</p>
            </div>
        </div>
        
        <div className='w-full hidden sm:flex items-center justify-center'>
            <MoreView />
        </div>
    </div>
  )
}

export default Legacy