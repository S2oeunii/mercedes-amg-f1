import React from 'react'
import Logo from '../../assets/logo/footer-logo.svg';
import MobileLogo from '../../assets/logo/footer-logo_mobile.svg';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='hidden sm:flex flex-col w-full items-center justify-center gap-[2.71vw]
          bg-black py-[7.81vw] px-[14.58vw]'
        >
          <img className="w-[70.83vw] h-auto" src={Logo} alt="logo" />
          <div className='bg-[#C0C7CE] w-full h-[0.10vw]'></div>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col gap-[1.15vw]'>
              <p className='text-white/70 text-[1.15vw] font-pretendard font-light leading-tight tracking-none'>
                <span className='font-medium text-white text-[1.35vw]'>Follow Us</span><br />
                Visit our official social media channels
              </p>

              <div className='flex'>
                <img src='./icons/facebook.svg' alt='facebook' />
                <img src='./icons/instagram.svg' alt='instagram' />
                <img src='./icons/x.svg' alt='x' />
                <img src='./icons/youtube.svg' alt='youtube' />
                <img src='./icons/tiktok.svg' alt='tiktok' />
              </div>
            </div>
          </div>
        </div>

        <div className='sm:hidden'></div>
      </footer>
    </>
  )
}

export default Footer