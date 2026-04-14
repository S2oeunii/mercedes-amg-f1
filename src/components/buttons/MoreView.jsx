import React from 'react'
import Plus from '../../assets/icons/plus.svg'

const MoreView = () => {
    return (
        <>
            <button className='w-53 h-16.5 flex justify-center items-center cursor-pointer
                relative overflow-hidden
                border-2 border-solid border-white rounded-[50px]
                hover:border-transparent transition-colors duration-[300ms] ease-out
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#00F4D0] before:to-[#008E79]
                before:scale-x-0 before:origin-left
                hover:before:scale-x-100
                before:transition-transform before:duration-[300ms] before:ease-out'
            >
                <p className='relative z-10 mr-2.5
                    text-white font-pretendard font-medium text-[23px] leading-none tracking-[-0.01em]'
                >
                    MORE VIEW
                </p>
                <img className='relative z-10 w-4 h-4' src={Plus} alt='' />
            </button>
        </>
    )
}

export default MoreView
