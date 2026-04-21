import React from 'react'

const Partners = () => {
  const logoCls = 'w-[103px] sm:w-[16.15vw] h-auto opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer';

  return (
    <div className='bg-black py-25 lg:pt-[9.38vw] lg:pb-[10.42vw] px-6 sm:px-[14.58vw]
      flex flex-col w-full gap-15 sm:gap-[5.21vw]'
    >
      <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[clamp(14px,_1.35vw,_26px)] leading-none tracking-none">
        Team Partners
      </span>

      <div className='logoGrid w-full grid grid-cols-3 sm:grid-cols-4 gap-[18px] sm:gap-[2.08vw]'>
        <img className={logoCls} src="/img/main/partners/partners-1.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-2.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-3.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-4.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-5.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-6.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-7.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-8.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-9.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-10.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-11.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-12.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-13.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-14.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-15.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-16.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-17.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-18.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-19.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-20.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-21.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-22.png" alt="" />
        <img className={logoCls} src="/img/main/partners/partners-23.png" alt="" />
      </div>
    </div>
  )
}

export default Partners