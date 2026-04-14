import { forwardRef, useEffect, useRef } from 'react';
import precision from '../../../../assets/img/team/precision.png';
import performance from '../../../../assets/img/team/performance.png';
import legacy from '../../../../assets/img/team/legacy.png';
import arrow from '../../../../assets/img/team/arrow.svg';
import MoreView from '../../../../components/buttons/MoreView';

// 각 이미지의 시작 오프셋 배율 (1.0 = 자기 높이의 100% 아래, 즉 ul 바깥)
// 세 이미지의 시작 지점을 조금씩 다르게
const START_OFFSETS = [1.0, 1.15, 1.30];

const IMGS = [
  { src: precision,   alt: 'Precision'   },
  { src: performance, alt: 'Performance'  },
  { src: legacy,      alt: 'Legacy'       },
];

const TeamOverview = forwardRef((_, ref) => {
  const imgWrapperRef = useRef(null);
  const imgNodesRef = useRef([]);
  const targetOffsetsRef = useRef([]); // 각 이미지의 최종 translateY (wrapper 최상단 정렬)

  // 마운트 후 자연 위치에서 wrapper top까지의 거리 계산
  useEffect(() => {
    if (!imgWrapperRef.current) return;
    const wrapperRect = imgWrapperRef.current.getBoundingClientRect();
    targetOffsetsRef.current = imgNodesRef.current.map((node) => {
      if (!node) return 0;
      const imgRect = node.getBoundingClientRect();
      // wrapper top - img top → 음수값 = 이미지를 위로 올려 wrapper 최상단에 맞춤
      return wrapperRect.top - imgRect.top;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgWrapperRef.current) return;

      const wrapperTop = imgWrapperRef.current.offsetTop;
      const wrapperHeight = imgWrapperRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const animStart = wrapperTop - vh;
      const animEnd   = wrapperTop + wrapperHeight * 0.4 - vh * 0.5;
      const progress  = Math.max(0, Math.min(1, (scrollY - animStart) / (animEnd - animStart)));

      imgNodesRef.current.forEach((node, i) => {
        if (!node) return;
        const target = targetOffsetsRef.current[i] ?? 0;
        const start  = wrapperHeight * START_OFFSETS[i]; // wrapper 밖 아래
        // progress=0 → start (wrapper 아래 밖), progress=1 → target (wrapper 최상단)
        const px = target + (start - target) * (1 - progress);
        node.style.transform = `translateY(${px}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="bg-[#000] pt-45 pb-50 w-full flex flex-col items-center gap-25 lg:gap-75"
      ref={ref}
    >
      <section className='overview w-full lg:w-[1360px] px-12 lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[14px] lg:text-[26px] leading-none tracking-none">Team Overview</span>

        <div className='container w-full flex flex-col gap-10 lg:gap-[123px] justify-center items-center'>
          <div className='w-full flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between mx-auto mt-25'>
            <div className='desc'>
              <h1 className="w-[255px] lg:w-[636px] h-auto mb-10
                text-[#fff] font-archivo font-bold italic text-[35px] lg:text-[80px] leading-none tracking-none"
              >
                Precison.<br />
                <p className='text-right'>Performance.</p>
                Legacy.
              </h1>

              <p className='text-[#C0C7CE] font-pretendard font-light text-[14px] lg:text-[20px] leading-normal tracking-tight'>
                독일을 대표하는 메르세데스-AMG 페트로나스<br className="lg:hidden" />포뮬러 원 팀은<br />
                수십 년의 레이싱 헤리티지를 바탕으로 최첨단 기술력과<br className="lg:hidden" />정밀한 엔지니어링을 결합해,<br />
                퍼포먼스의 한계를 끊임없이 확장해 나갑니다.
              </p>
            </div>

            <div ref={imgWrapperRef} className='imgWrapper relative
              lg:w-[670px] lg:h-[700px]
              flex justify-center items-center overflow-hidden'
            >
              {/* 장식용 세로 선 3개 + 빛 애니메이션 */}
              {[
                { left: '15.67%', delay: '0s' },
                { left: '50%',    delay: '0.3s' },
                { left: '84.33%', delay: '0.6s' },
              ].map(({ left, delay }, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full w-px bg-[#00F4D0]/15 pointer-events-none"
                  style={{ left }}
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

              <ul className='imgContainer bottom-0 z-10 flex gap-[10px] lg:gap-[20px]'>
                {IMGS.map(({ src, alt }, i) => (
                  <li key={alt}>
                    <img
                      ref={(el) => { imgNodesRef.current[i] = el; }}
                      className='w-[108px] lg:w-[210px] h-auto block'
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

      <section className='drivers w-full lg:w-[1360px] px-12 lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[14px] lg:text-[26px] leading-none tracking-none">Team Drivers</span>

        <div className='profiles w-full flex flex-col lg:flex-row gap-62.5 mx-auto mt-25'>
          <div className='driver1'>
            <div className='flex flex-col gap-[11px]'>
              <p className='text-white font-archivo font-bold text-[20px] lg:text-[40px] leading-none tracking-none'>George Russell</p>
              <p className='text-[#C0C7CE] font-pretendard font-light text-[14px] lg:text-[25px] leading-normal tracking-none'>Main Driver<br />No.63</p>
              <a className='cursor-pointer'>
                <img className='w-[97px] lg:w-[158px] h-auto' src={arrow} alt="Arrow" />
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
