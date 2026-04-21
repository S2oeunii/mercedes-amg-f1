import React from 'react'
import arrowIcon from '../../assets/icons/arrowLeft.svg'

const arrowLeft = () => {
  return (
    <button className='flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#00F4D0] cursor-pointer'>
        <img
        src={arrowIcon}
        alt='ARROW LEFT'
        className='w-[12px] h-auto'
        />
    </button>
  )
}

export default arrowLeft