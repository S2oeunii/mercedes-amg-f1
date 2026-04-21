import React from 'react'
import arrowIcon from '../../assets/icons/arrowRight.svg'

const arrowRight = () => {
  return (
    <button className='flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#00F4D0] cursor-pointer'>
        <img
        src={arrowIcon}
        alt='ARROW RIGHT'
        className='w-[12px] h-auto'
        />
    </button>
  )
}

export default arrowRight