import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import w17 from '../../../assets/img/car/W17.png';
import hybridEra from '../../../assets/img/car/HybridEra.png';
import launch26 from '../../../assets/img/car/2026_Launch.png';
import powerUnit from '../../../assets/img/car/PowerUnit_26.png';
import w16 from '../../../assets/img/car/W16.png';
import onTrack from '../../../assets/img/car/W16_OnTrack.png';
import steeringWheel from '../../../assets/img/car/steeringWheel.png';
import italianGP from '../../../assets/img/car/ItalianGP_2025.png';

const Car = () => {
  const sectionRef   = useRef(null);
  const carWrapperRef = useRef(null);
  const carImgsRef   = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // 텍스트 커버 reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // wrapper 높이 = 100vh + ul 가로 스크롤 거리
  useLayoutEffect(() => {
    const ul      = carImgsRef.current;
    const wrapper = carWrapperRef.current;
    if (!ul || !wrapper) return;

    const updateHeight = () => {
      if (window.innerWidth < 640) {
        wrapper.style.height = 'auto';
        ul.style.transform   = '';
        return;
      }
      const dist = ul.scrollWidth - window.innerWidth;
      wrapper.style.height = `${window.innerHeight + Math.max(0, dist)}px`;
    };

    const ro = new ResizeObserver(updateHeight);
    ro.observe(ul);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => { ro.disconnect(); window.removeEventListener('resize', updateHeight); };
  }, []);

  // 세로 스크롤 → ul translateX
  useEffect(() => {
    const onScroll = () => {
      const wrapper = carWrapperRef.current;
      const ul      = carImgsRef.current;
      if (!wrapper || !ul || window.innerWidth < 640) return;

      const totalDist = wrapper.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const scrolled = Math.max(0, Math.min(totalDist, -wrapper.getBoundingClientRect().top));
      const movable  = ul.scrollWidth - window.innerWidth;
      ul.style.transform = `translateX(${-(scrolled / totalDist) * Math.max(0, movable)}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overlayStyle = (i) => ({
    transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
    transitionDelay: revealed ? `${i * 80}ms` : '0ms',
    transform: revealed ? 'translateX(101%)' : 'translateX(0%)',
  });

  const textCls     = 'font-archivo font-bold text-white text-[clamp(35px,_4.17vw,_80px)] leading-none tracking-none';
  const mint        = 'text-[#00F4D0] font-eb-garamond font-semibold italic';
  const liTitle     = 'font-archivo font-regular text-white text-[clamp(14px,_1.04vw,_20px)] leading-[1.5] sm:leading-[2]';
  const liTitleMint = 'font-archivo font-bold italic text-[#00F4D0] text-[clamp(14px,_1.04vw,_20px)] leading-[1.5] sm:leading-[2]';

  const mobileLines = [
    <>A New Era of</>,
    <><span className={mint}>Performance</span> Driven</>,
    <>by <span className={mint}>Innovation</span> and</>,
    <>Precision</>,
    <>Engineering,</>,
    <>Pushing the Limits</>,
    <>of <span className={mint}>Speed</span> and Control,</>,
    <>Built for Formula 1</>,
  ];

  const smLines = [
    <>A New Era of <span className={mint}>Performance</span></>,
    <>Driven by <span className={mint}>Innovation</span> and</>,
    <>Precision Engineering,</>,
    <>Pushing the Limits of <span className={mint}>Speed</span></>,
    <>and Control,</>,
    <>Built for Formula 1</>,
  ];

  const renderLine = (content, i) => (
    <div key={i} className="flex justify-center">
      <div className="relative overflow-hidden pb-[0.2em] w-fit">
        <div className={textCls}>{content}</div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00F4D0] to-[#008E79]" style={overlayStyle(i)} />
      </div>
    </div>
  );

  return (
    <div className='bg-black py-25 lg:pt-45 lg:pb-50 w-full flex flex-col lg:gap-[15.63vw]'>
      <section className='car-intro w-full flex flex-col gap-[86px] lg:gap-[175px] max-sm:items-center'>

        {/* 텍스트 */}
        <div className='car-text flex flex-col items-center' ref={sectionRef}>
          <div className="sm:hidden flex flex-col">
            {mobileLines.map(renderLine)}
          </div>
          <div className="hidden sm:flex flex-col">
            {smLines.map(renderLine)}
          </div>
        </div>

        {/* 가로 스크롤 영역 */}
        <div ref={carWrapperRef} className='w-full'>
          {/* sticky 클리핑 컨테이너 */}
          <div className='sm:sticky sm:top-0 sm:h-screen sm:overflow-hidden sm:flex sm:items-center'>
            <ul
              ref={carImgsRef}
              className='car-imgs bg-black flex flex-col max-sm:items-center relative max-sm:h-[1400px] sm:min-w-[167.06vw] sm:h-[45vw]'
            >
              <li className='absolute max-sm:top-0 max-sm:left-[24px] sm:left-[14.64vw] sm:top-[14.74vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitleMint}>F1 W17</p>
                <img src={w17} alt="W17" className='w-77.5 sm:w-[46.84vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[246px] max-sm:right-[33px] sm:left-[68.49vw] sm:top-0 flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>Hybrid Era 2026</p>
                <img src={hybridEra} alt="Hybrid Era" className='w-28 sm:w-[10.68vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[520px] max-sm:right-[64px] sm:left-[76.82vw] sm:top-[22.97vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>2026 Season Launch</p>
                <img src={launch26} alt="2026 Season Launch" className='w-36.5 sm:w-[16.04vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[377px] max-sm:left-[42px] sm:left-[97.76vw] sm:top-[6.88vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>Power Unit</p>
                <img src={powerUnit} alt="Power Unit" className='w-25 sm:w-[9.95vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[719px] max-sm:right-6 sm:left-[120.21vw] sm:top-[2.08vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitleMint}>F1 W16</p>
                <img src={w16} alt="W16" className='w-77.5 sm:w-[46.88vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[1018px] max-sm:right-16 sm:left-[171.04vw] sm:top-[29.84vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>On Track with W16</p>
                <img src={onTrack} alt="onTrack" className='w-[115px] sm:w-[8.39vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[938px] max-sm:left-[35px] sm:left-[183.02vw] sm:top-0 flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>Steering Wheel</p>
                <img src={steeringWheel} alt="Steering Wheel" className='w-[97px] sm:w-[10.26vw] h-auto' />
              </li>
              <li className='absolute max-sm:top-[1243px] max-sm:left-[72px] sm:left-[193.96vw] sm:top-[21.46vw] flex flex-col sm:gap-[0.73vw]'>
                <p className={liTitle}>Italian GP 2025</p>
                <img src={italianGP} alt="ItalianGP 25" className='w-30 sm:w-[8.39vw] h-auto' />
              </li>
            </ul>
          </div>
        </div>

      </section>

      <section className='f1-w17 w-full'></section>
    </div>
  );
}

export default Car;