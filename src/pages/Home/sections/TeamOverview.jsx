import { forwardRef, useEffect, useRef } from 'react';
import precision from '../../../assets/img/team/precision.png';
import performance from '../../../assets/img/team/performance.png';
import legacy from '../../../assets/img/team/legacy.png';
import arrow from '../../../assets/img/team/arrow.svg';
import driver1 from '../../../assets/img/team/driver1.png';
import driverHover1 from '../../../assets/img/team/driverHover-1.png';
import driver2 from '../../../assets/img/team/driver2.png';
import driverHover2 from '../../../assets/img/team/driverHover-2.png';
import MoreView from '../../../components/buttons/MoreView';

const START_OFFSETS = [1.0, 1.15, 1.30];

const IMGS = [
  { src: precision,   alt: 'Precision'   },
  { src: performance, alt: 'Performance'  },
  { src: legacy,      alt: 'Legacy'       },
];

const TeamOverview = forwardRef((_, ref) => {
  const imgWrapperRef = useRef(null);
  const imgNodesRef = useRef([]);
  const lineNodesRef = useRef([]);
  const targetOffsetsRef = useRef([]);
  const scrollHandlerRef = useRef(null);

  // 각 선을 대응하는 이미지의 수평 중앙에 맞게 재배치
  const recalcLines = () => {
    if (!imgWrapperRef.current) return;
    const wrapperRect = imgWrapperRef.current.getBoundingClientRect();
    imgNodesRef.current.forEach((imgNode, i) => {
      const lineNode = lineNodesRef.current[i];
      if (!imgNode || !lineNode) return;
      const imgRect = imgNode.getBoundingClientRect();
      const centerPct = (imgRect.left + imgRect.width / 2 - wrapperRect.left) / wrapperRect.width * 100;
      lineNode.style.left = `${centerPct}%`;
    });
  };

  // 뷰포트 크기에 맞게 target 재계산
  const recalcTargets = () => {
    if (!imgWrapperRef.current) return;

    const saved = imgNodesRef.current.map(n => n?.style.transform ?? '');
    imgNodesRef.current.forEach(n => { if (n) n.style.transform = 'translateY(0)'; });

    const wrapperRect = imgWrapperRef.current.getBoundingClientRect();
    targetOffsetsRef.current = imgNodesRef.current.map(node => {
      if (!node) return 0;
      return wrapperRect.top - node.getBoundingClientRect().top;
    });

    imgNodesRef.current.forEach((n, i) => { if (n) n.style.transform = saved[i]; });

    recalcLines();
    scrollHandlerRef.current?.();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!imgWrapperRef.current) return;

      const wrapperTop    = imgWrapperRef.current.offsetTop;
      const wrapperHeight = imgWrapperRef.current.offsetHeight;
      const scrollY       = window.scrollY;
      const vh            = window.innerHeight;

      const animStart = wrapperTop - vh;
      const animEnd   = wrapperTop + wrapperHeight * 0.4 - vh * 0.5;
      const progress  = Math.max(0, Math.min(1, (scrollY - animStart) / (animEnd - animStart)));

      imgNodesRef.current.forEach((node, i) => {
        if (!node) return;
        const target = targetOffsetsRef.current[i] ?? 0;
        const start  = wrapperHeight * START_OFFSETS[i];
        const px     = target + (start - target) * (1 - progress);
        node.style.transform = `translateY(${px}px)`;
      });
    };

    scrollHandlerRef.current = handleScroll;

    recalcTargets();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', recalcTargets);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', recalcTargets);
    };
  }, []);

  return (
    <div className="bg-[#000] py-25 lg:pt-45 lg:pb-50 w-full flex flex-col items-center gap-25 lg:gap-[15.63vw]"
      ref={ref}
    >
      <section className='overview w-full lg:w-[70.83vw] px-6 sm:px-[14.58vw] lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[clamp(14px,_1.35vw,_26px)] leading-none tracking-none">Team Overview</span>

        <div className='container w-full flex flex-col gap-[clamp(40px,_6.41vw,_123px)] justify-center items-center'>
          <div className='w-full flex flex-col sm:flex-row gap-10 lg:gap-0 justify-between mx-auto mt-25'>
            <div className='desc'>
              <h1 className="w-[clamp(255px,_33.13vw,_636px)] h-auto mb-10
                text-[#fff] font-archivo font-bold italic text-[clamp(35px,_4.17vw,_80px)] leading-none tracking-none"
              >
                Precison.<br />
                <p className='text-right'>Performance.</p>
                Legacy.
              </h1>

              <p className='text-[#C0C7CE] font-pretendard font-light text-[clamp(14px,_1.04vw,_20px)] leading-normal tracking-tight'>
                독일을 대표하는 메르세데스-AMG 페트로나스 포뮬러 원 팀은<br />
                수십 년의 레이싱 헤리티지를 바탕으로 최첨단 기술력과<br className="lg:hidden" /> 정밀한 엔지니어링을 결합해,<br />
                퍼포먼스의 한계를 끊임없이 확장해 나갑니다.
              </p>
            </div>

            <div ref={imgWrapperRef} className='imgWrapper relative
              w-full h-[clamp(177px,_36.46vw,_700px)] lg:w-[34.9vw]
              flex justify-center items-center overflow-hidden'
            >
              {['0s', '0.3s', '0.6s'].map((delay, i) => (
                <div
                  key={i}
                  ref={(el) => { lineNodesRef.current[i] = el; }}
                  className="absolute top-0 h-full w-px bg-[#00F4D0]/15 pointer-events-none"
                >
                  <div
                    className="absolute w-0.5 h-[70px] -translate-x-px animate-scan-light"
                    style={{ animationDelay: delay }}
                  >
                    <div className="w-full h-full rounded-full
                      bg-gradient-to-b from-transparent via-[#00F4D0] to-transparent
                      shadow-[0_0_10px_4px_rgba(0,244,208,0.35)]"
                    />
                  </div>
                </div>
              ))}

              <ul className='imgContainer bottom-0 z-10 flex w-full gap-[clamp(10px,_1.04vw,_20px)]'>
                {IMGS.map(({ src, alt }, i) => (
                  <li key={alt} className='flex-1 min-w-0 flex justify-center'>
                    <img
                      ref={(el) => { imgNodesRef.current[i] = el; }}
                      className='w-[clamp(108px,_10.94vw,_210px)] h-auto block'
                      src={src}
                      alt={alt}
                      onLoad={recalcLines}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <MoreView />
        </div>
      </section>

      <section className='drivers w-full lg:w-[70.83vw] px-6 sm:px-[14.58vw] lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[clamp(14px,_1.35vw,_26px)] leading-none tracking-none">Team Drivers</span>

        <div className='profiles w-full flex flex-col md:flex-row gap-25 md:gap-[5.21vw] mx-auto mt-25'>
          <div className='driver1 flex flex-col justify-between gap-[5vw]'>
            <div className='flex flex-col gap-[0.57vw]'>
              <p className='text-white font-archivo font-bold text-[clamp(20px,_2.08vw,_40px)] leading-none tracking-none'>George Russell</p>
              <p className='text-[#C0C7CE] font-pretendard font-light text-[clamp(14px,_1.3vw,_25px)] leading-normal tracking-none'>Main Driver<br />No.63</p>
              <a className='cursor-pointer'>
                <img className='w-[clamp(97px,_8.23vw,_158px)] h-auto' src={arrow} alt="Arrow" />
              </a>
            </div>
            <div className='relative w-full cursor-pointer group mt-[-50px] md:mt-0'>
              <img
                className='w-full h-auto block'
                src={driver1}
                alt="George Russell"
              />
              <img
                className='absolute inset-0 w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block'
                src={driverHover1}
                alt="George Russell Hover"
              />
            </div>
          </div>

          <div className='driver2 flex flex-col-reverse md:flex-col justify-between gap-[1.61vw]'>
            <div className='relative w-full cursor-pointer group mt-[-25px] md:mt-0'>
              <img
                className='w-full h-auto block'
                src={driver2}
                alt="Kimi Antonelli"
              />
              <img
                className='absolute inset-0 w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block'
                src={driverHover2}
                alt="Kimi Antonelli Hover"
              />
            </div>
            <div className='flex flex-col gap-[0.57vw]'>
              <p className='text-white font-archivo font-bold text-[clamp(20px,_2.08vw,_40px)] leading-none tracking-none'>Kimi Antonelli</p>
              <p className='text-[#C0C7CE] font-pretendard font-light text-[clamp(14px,_1.3vw,_25px)] leading-normal tracking-none'>Main Driver<br />No.12</p>
              <a className='cursor-pointer'>
                <img className='w-[clamp(97px,_8.23vw,_158px)] h-auto' src={arrow} alt="Arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TeamOverview;