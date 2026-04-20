import React from 'react'
import PlusIcon from '../../assets/icons/plus.svg'

const Plus = ({ isOpen = false, onClick, className = '' }) => {
  return (
    <button
      className={`flex items-center justify-center w-[2.60vw] h-[2.60vw] rounded-full
        bg-[#00F4D0] cursor-pointer transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-50 hover:opacity-100'} ${className}`}
      onClick={onClick}
    >
      <img
        src={PlusIcon}
        alt='PLUS'
        className='w-[1.04vw] h-auto'
        style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
      />
    </button>
  )
}

export default Plus
