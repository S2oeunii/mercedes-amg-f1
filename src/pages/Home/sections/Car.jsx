import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bgPattern from '../../../assets/img/car/Bg.png';
import mobileBg from '../../../assets/img/car/Bg_Mobile.png';
import w17 from '../../../assets/img/car/W17.png';
import hybridEra from '../../../assets/img/car/HybridEra.png';
import launch26 from '../../../assets/img/car/2026_Launch.png';
import powerUnit from '../../../assets/img/car/PowerUnit_26.png';
import w16 from '../../../assets/img/car/W16.png';
import onTrack from '../../../assets/img/car/W16_OnTrack.png';
import steeringWheel from '../../../assets/img/car/steeringWheel.png';
import italianGP from '../../../assets/img/car/ItalianGP_2025.png';
import exploreW17 from '../../../assets/icons/exploreW17.svg';
import w17_2 from '../../../assets/img/car/W17-2.png';
import Plus from '../../../components/buttons/Plus';

const Car = () => {
  const sectionRef   = useRef(null);
  const carWrapperRef = useRef(null);
  const carImgsRef   = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const toggle = (id) => setOpenItem(prev => prev === id ? null : id);

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
    <div className='bg-[linear-gradient(to_bottom,#000_80%,#000000db_100%)]
      sm:bg-[linear-gradient(to_bottom,#000_80%,#000000db_88%,#000000c7_100%)]
      relative py-25 lg:pt-[9.38vw] lg:pb-[10.42vw] w-full flex flex-col lg:gap-[15.63vw]'
    >
      <img src={bgPattern} className="absolute left-0 bottom-0 w-full h-auto hidden sm:block pointer-events-none" />
      <img src={mobileBg} className="absolute left-0 bottom-0 w-full h-auto sm:hidden pointer-events-none" />

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
              className='car-imgs flex flex-col max-sm:items-center relative max-sm:h-[1400px] sm:min-w-[227.55vw] sm:h-[45vw]'
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
                <img src={italianGP} alt="ItalianGP 25" className='w-30 sm:w-[17.97vw] h-auto' />
              </li>
            </ul>
          </div>
          <button className='sm:hidden w-full flex items-center justify-center cursor-pointer'>
            <img src={exploreW17} alt='Explore W17' className='w-[210px] h-auto' />
          </button>
        </div>
      </section>

      <section className='f1-w17 hidden sm:flex flex-col w-full px-[14.58vw] gap-[7.81vw]'>
        <div className='flex flex-col gap-[5.21vw]'>
          <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[clamp(14px,_1.35vw,_26px)] leading-none tracking-none">2026 New F1 W17</span>
          <p className='text-[#C0C7CE] font-pretendard font-light text-[1.35vw] leading-normal tracking-[-0.025em]'>
            메르세데스-AMG F1 W17은 새로운 규정에 맞춰 설계된 차세대 머신으로,<br />
            공기역학과 하이브리드 기술을 통해 퍼포먼스와 효율을 극대화합니다.
          </p>
        </div>
        
        <div className='carContainer relative flex items-center justify-center w-full h-[46.77vw]'>
          <img src={w17_2} alt="F1 W17" className='w-[70.89vw] h-auto block' />

          <div className='descContainer absolute top-0 left-0'>

            {/* desc1 — Plus: bottom-left, line: top-[1.51vw] left-[1.30vw], text: top-right */}
            <div className='desc1 w-[28.65vw] h-[19.90vw] absolute top-[6.88vw] left-[1.88vw]'>
              <p
                className='absolute top-0 right-0 text-left text-[#00F4D0]/60 font-archivo font-regular text-[1.15vw] leading-tight tracking-[-0.025em]'
                style={{ opacity: openItem === 0 ? 1 : 0, transition: `opacity 0.3s ease ${openItem === 0 ? '0.65s' : '0s'}` }}
              >
                <span className='text-[#00F4D0] font-semibold text-[1.46vw]'>Smaller & Lighter</span><br />
                최적화된 설계로 민첩성과 효율 향상
              </p>
              <svg viewBox="0 0 195 287" fill="none" className='absolute top-[1.51vw] left-[1.30vw]' style={{ width: '10.03vw', height: 'auto' }}>
                <defs>
                  <linearGradient id="lg1" x1="61.5" y1="-69.6504" x2="61.5" y2="286.35" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F4D0" /><stop offset="0.495192" stopColor="white" /><stop offset="1" stopColor="#00F4D0" />
                  </linearGradient>
                </defs>
                <path d="M1 286.35V120.35L193.5 0.849609" stroke="url(#lg1)" strokeWidth="2" pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: openItem === 0 ? 0 : 1, transition: `stroke-dashoffset 0.65s cubic-bezier(0.77,0,0.175,1)` }}
                />
              </svg>
              <Plus className='absolute left-0 bottom-0' isOpen={openItem === 0} onClick={() => toggle(0)} />
            </div>

            {/* desc2 — Plus: bottom-left, line: top-[3.85vw] left-[2.60vw], text: top-left */}
            <div className='desc2 w-[19.79vw] h-[14.27vw] absolute top-0 left-[44.06vw]'>
              <p
                className='absolute top-0 left-0 text-center text-[#00F4D0]/60 font-archivo font-regular text-[1.15vw] leading-tight tracking-[-0.025em]'
                style={{ opacity: openItem === 1 ? 1 : 0, transition: `opacity 0.3s ease ${openItem === 1 ? '0.65s' : '0s'}` }}
              >
                <span className='text-[#00F4D0] font-semibold text-[1.46vw]'>Hybrid Power Unit</span><br />
                전기 에너지 비중을 높인 차세대 동력 시스템
              </p>
              <svg viewBox="0 0 75 151" fill="none" className='absolute top-[3.85vw] left-[2.60vw]' style={{ width: '3.80vw', height: 'auto' }}>
                <defs>
                  <linearGradient id="lg2" x1="37.1377" y1="0" x2="37.1377" y2="150" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F4D0" /><stop offset="0.495192" stopColor="white" /><stop offset="1" stopColor="#00F4D0" />
                  </linearGradient>
                </defs>
                <path d="M0.637695 150L73.6377 89.5V0" stroke="url(#lg2)" strokeWidth="2" pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: openItem === 1 ? 0 : 1, transition: `stroke-dashoffset 0.65s cubic-bezier(0.77,0,0.175,1)` }}
                />
              </svg>
              <Plus className='absolute left-0 bottom-0' isOpen={openItem === 1} onClick={() => toggle(1)} />
            </div>

            {/* desc3 — Plus: top-right, line: top-[2.60vw] right-[3.02vw], text: bottom-left */}
            <div className='desc3 w-[18.23vw] h-[23.18vw] absolute top-[23.59vw] left-[28.44vw]'>
              <Plus className='absolute top-0 right-0' isOpen={openItem === 2} onClick={() => toggle(2)} />
              <svg viewBox="0 0 144 327" fill="none" className='absolute top-[2.60vw] right-[3.02vw]' style={{ width: '7.37vw', height: 'auto' }}>
                <defs>
                  <linearGradient id="lg3" x1="71.75" y1="0.711914" x2="71.75" y2="326.712" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F4D0" /><stop offset="0.495192" stopColor="white" /><stop offset="1" stopColor="#00F4D0" />
                  </linearGradient>
                </defs>
                <path d="M142.5 0.711914L1 140.212V326.712" stroke="url(#lg3)" strokeWidth="2" pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: openItem === 2 ? 0 : 1, transition: `stroke-dashoffset 0.65s cubic-bezier(0.77,0,0.175,1)` }}
                />
              </svg>
              <p
                className='absolute left-0 bottom-0 text-center text-[#00F4D0]/60 font-archivo font-regular text-[1.15vw] leading-tight tracking-[-0.025em]'
                style={{ opacity: openItem === 2 ? 1 : 0, transition: `opacity 0.3s ease ${openItem === 2 ? '0.65s' : '0s'}` }}
              >
                <span className='text-[#00F4D0] font-semibold text-[1.46vw]'>Active Aerodynamics</span><br />
                주행 상황에 맞춰 공기 흐름을 최적화
              </p>
            </div>

            {/* desc4 — Plus: top-right, line: top-[3.65vw] right-[1.30vw], text: bottom-right */}
            <div className='desc4 w-[18.80vw] h-[24.53vw] absolute top-[18.54vw] left-[48.2vw]'>
              <Plus className='absolute top-0 right-0' isOpen={openItem === 3} onClick={() => toggle(3)} />
              <svg viewBox="0 0 67 333" fill="none" className='absolute top-[3.65vw] right-[1.30vw]' style={{ width: '3.39vw', height: 'auto' }}>
                <defs>
                  <linearGradient id="lg4" x1="33.3047" y1="0" x2="33.3047" y2="331.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F4D0" /><stop offset="0.495192" stopColor="white" /><stop offset="1" stopColor="#00F4D0" />
                  </linearGradient>
                </defs>
                <path d="M65.8047 0V243.5L0.804688 331.5" stroke="url(#lg4)" strokeWidth="2" pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: openItem === 3 ? 0 : 1, transition: `stroke-dashoffset 0.65s cubic-bezier(0.77,0,0.175,1)` }}
                />
              </svg>
              <p
                className='absolute right-0 bottom-0 text-right text-[#00F4D0]/60 font-archivo font-regular text-[1.15vw] leading-tight tracking-[-0.025em]'
                style={{ opacity: openItem === 3 ? 1 : 0, transition: `opacity 0.3s ease ${openItem === 3 ? '0.65s' : '0s'}` }}
              >
                <span className='text-[#00F4D0] font-semibold text-[1.46vw]'>Sustainable Innovation</span><br />
                친환경 연료와 기술 기반의 미래 설계
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Car;