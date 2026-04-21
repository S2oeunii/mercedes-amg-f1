import React from 'react'
import Plus from '../../assets/icons/plus.svg'
import MoreViewIcon from '../../assets/icons/moreView.svg'

const MoreView = () => {
    return (
        <>
            {/* 모바일 (~639px): SVG 이미지 버튼 */}
            <button className='sm:hidden cursor-pointer'>
                <img src={MoreViewIcon} alt='MORE VIEW' className='w-[134px] h-auto' />
            </button>

            {/* sm(640px)~ : 텍스트 버튼 */}
            <button className='hidden sm:flex sm:w-[11.04vw] sm:h-[3.44vw] justify-center items-center cursor-pointer
                relative overflow-hidden
                border border-solid border-white rounded-[50px]
                hover:border-transparent transition-colors duration-[300ms] ease-out
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#00F4D0] before:to-[#008E79]
                before:scale-x-0 before:origin-left
                hover:before:scale-x-100
                before:transition-transform before:duration-[300ms] before:ease-out'
            >
                <p className='relative z-10 mr-[clamp(8px,_0.52vw,_10px)]
                    text-white font-pretendard font-medium text-[1.2vw] leading-none tracking-[-0.01em]'
                >
                    MORE VIEW
                </p>
                <img className='relative z-10 w-[0.83vw] h-[0.83vw]' src={Plus} alt='' />
            </button>
        </>
    )
}

export default MoreView
