import { useState, useEffect } from 'react';
import ArrowUp from '../../assets/icons/arrowUp.svg';
import MobileBtn from '../../assets/icons/Mobile_TopScroll.svg';

const ScrollUp = ({ menuOpen = false }) => {
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowDesktop(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`hidden sm:flex items-center justify-center w-[5.21vw] h-[5.21vw] rounded-full
          border-2 border-solid border-white cursor-pointer
          fixed bottom-[5.21vw] right-[5.21vw] overflow-hidden z-[9998]
          hover:border-transparent transition-[opacity,border-color] duration-[300ms] ease-out
          before:absolute before:inset-0
          before:bg-gradient-to-t before:from-[#00F4D0] before:to-[#008E79]
          before:scale-y-0 before:origin-bottom
          hover:before:scale-y-100
          before:transition-transform before:duration-[300ms] before:ease-out
          ${showDesktop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <img
          src={ArrowUp}
          alt=''
          className='relative w-[1.77vw] h-auto z-[9999]'
        />
      </button>

      <button
        onClick={scrollToTop}
        className={`sm:hidden w-[45px] h-[45px] cursor-pointer
          fixed bottom-[50px] right-6 z-[9999]
          transition-opacity duration-300
          ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <img
          src={MobileBtn}
          alt=''
          className='w-full h-full'
        />
      </button>
    </>
  )
}

export default ScrollUp
