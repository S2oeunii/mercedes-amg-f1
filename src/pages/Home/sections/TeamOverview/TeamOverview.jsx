import { forwardRef, useEffect, useRef } from 'react';
import precision from '../../../../assets/img/team/precision.png';
import performance from '../../../../assets/img/team/performance.png';
import legacy from '../../../../assets/img/team/legacy.png';
import arrow from '../../../../assets/img/team/arrow.svg';
import MoreView from '../../../../components/buttons/MoreView';

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
    <div className="bg-[#000] pt-45 pb-50 w-full flex flex-col items-center gap-25 lg:gap-[15.63vw]"
      ref={ref}
    >
      <section className='overview w-full lg:w-[70.83vw] px-6 lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[14px] lg:text-[1.35vw] leading-none tracking-none">Team Overview</span>

        <div className='container w-full flex flex-col gap-10 lg:gap-[6.41vw] justify-center items-center'>
          <div className='w-full flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between mx-auto mt-25'>
            <div className='desc'>
              <h1 className="w-[255px] lg:w-[33.13vw] h-auto mb-10
                text-[#fff] font-archivo font-bold italic text-[35px] lg:text-[4.17vw] leading-none tracking-none"
              >
                Precison.<br />
                <p className='text-right'>Performance.</p>
                Legacy.
              </h1>

              <p className='text-[#C0C7CE] font-pretendard font-light text-[14px] lg:text-[1.04vw] leading-normal tracking-tight'>
                독일을 대표하는 메르세데스-AMG 페트로나스<br className="lg:hidden" />포뮬러 원 팀은<br />
                수십 년의 레이싱 헤리티지를 바탕으로 최첨단 기술력과<br className="lg:hidden" />정밀한 엔지니어링을 결합해,<br />
                퍼포먼스의 한계를 끊임없이 확장해 나갑니다.
              </p>
            </div>

            <div ref={imgWrapperRef} className='imgWrapper relative
              w-full h-[45vw] lg:w-[34.9vw] lg:h-[36.46vw]
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

              <ul className='imgContainer bottom-0 z-10 flex gap-2.5 lg:gap-[1.04vw]'>
                {IMGS.map(({ src, alt }, i) => (
                  <li key={alt}>
                    <img
                      ref={(el) => { imgNodesRef.current[i] = el; }}
                      className='w-27 lg:w-[10.94vw] h-auto block'
                      src={src}
                      alt={alt}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <MoreView />
        </div>
      </section>

      <section className='drivers w-full lg:w-[70.83vw] px-12 lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[14px] lg:text-[1.35vw] leading-none tracking-none">Team Drivers</span>

        <div className='profiles w-full flex flex-col lg:flex-row gap-62.5 mx-auto mt-25'>
          <div className='driver1'>
            <div className='flex flex-col gap-[11px]'>
              <p className='text-white font-archivo font-bold text-[20px] lg:text-[2.08vw] leading-none tracking-none'>George Russell</p>
              <p className='text-[#C0C7CE] font-pretendard font-light text-[14px] lg:text-[1.3vw] leading-normal tracking-none'>Main Driver<br />No.63</p>
              <a className='cursor-pointer'>
                <img className='w-[97px] lg:w-[8.23vw] h-auto' src={arrow} alt="Arrow" />
              </a>
            </div>

          </div>

          <div className='driver2'></div>
        </div>
      </section>
    </div>
  );
});

export default TeamOverview;
