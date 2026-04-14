import React from 'react'
import Plus from '../../assets/icons/plus.svg'
import MoreViewIcon from '../../assets/icons/moreView.svg'

const MoreView = () => {
    return (
        <>
            {/* 모바일 (~639px): SVG 이미지 버튼 */}
            <button className='sm:hidden w-[34.1vw] h-[10.69vw] cursor-pointer'>
                <img src={MoreViewIcon} alt='MORE VIEW' className='w-full h-full' />
            </button>

            {/* sm(640px)~ : 텍스트 버튼 */}
            <button className='hidden sm:flex w-[clamp(160px,_11.04vw,_212px)] h-[clamp(52px,_3.44vw,_66px)] justify-center items-center cursor-pointer
                relative overflow-hidden
                border-2 border-solid border-white rounded-[50px]
                hover:border-transparent transition-colors duration-[300ms] ease-out
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#00F4D0] before:to-[#008E79]
                before:scale-x-0 before:origin-left
                hover:before:scale-x-100
                before:transition-transform before:duration-[300ms] before:ease-out'
            >
                <p className='relative z-10 mr-[clamp(8px,_0.52vw,_10px)]
                    text-white font-pretendard font-medium text-[clamp(16px,_1.2vw,_23px)] leading-none tracking-[-0.01em]'
                >
                    MORE VIEW
                </p>
                <img className='relative z-10 w-[clamp(13px,_0.83vw,_16px)] h-[clamp(13px,_0.83vw,_16px)]' src={Plus} alt='' />
            </button>
        </>
    )
}

export default MoreView
