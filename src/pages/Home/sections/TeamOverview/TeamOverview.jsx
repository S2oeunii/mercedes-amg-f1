import { forwardRef, useEffect, useRef } from 'react';
import precision from '../../../../assets/img/team/precision.png';
import performance from '../../../../assets/img/team/performance.png';
import legacy from '../../../../assets/img/team/legacy.png';
import arrow from '../../../../assets/img/team/arrow.svg';
import MoreView from '../../../../components/buttons/MoreView';

const TeamOverview = forwardRef(({ onScrollUp, isActive }, ref) => {
  const isScrolling = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        onScrollUp?.();
        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, onScrollUp]);

  return (
    <div className="bg-[#000] pt-45 pb-50 w-full flex flex-col items-center gap-25 lg:gap-75"
      ref={ref}
    >
      <section className='overview w-full lg:w-[1360px] px-12 lg:px-0'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[14px] lg:text-[26px] leading-none tracking-none">Team Overview</span>

        <div className='container w-full flex flex-col gap-10 lg:gap-[123px] justify-center items-center'>
          <div className='contents w-full flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between mx-auto mt-25'>
            <div className='desc'>
              <h1 className="w-[255px] lg:w-[636px] h-auto mb-10
                text-[#fff] font-archivo font-bold italic text-[35px] lg:text-[80px] leading-none tracking-none"
              >
                Precison.<br />
                <p className='text-right'>Performance.</p>
                Legacy.
              </h1>

              <p className='text-[#C0C7CE] font-pretendard font-light text-[14px] lg:text-[20px] leading-normal tracking-tight'>
                독일을 대표하는 메르세데스-AMG 페트로나스 포뮬러 원 팀은<br />
                수십 년의 레이싱 헤리티지를 바탕으로<br className="lg:hidden" /> 최첨단 기술력과  정밀한 엔지니어링을 결합해,<br />
                퍼포먼스의 한계를 끊임없이 확장해 나갑니다.
              </p>
            </div>

            <div className='imgWrapper relative
              w-[345px] lg:w-[670px] h-[300px] lg:h-[700px]
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

              <ul className='imgContainer relative z-10 flex gap-5'>
                <li><img className='w-[210px] h-auto'
                  src={precision} alt="Precision"
                /></li>
                <li><img className='w-[210px] h-auto'
                  src={performance} alt="Performance"
                /></li>
                <li><img className='w-[210px] h-auto'
                  src={legacy} alt="Legacy"
                /></li>
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
              <p className='font-archivo font-bold text-[20px] lg:text-[40px] leading-none tracking-none'>George Russell</p>
              <p>Main Driver<br />No.63</p>
              <img className='w-[97px] lg:w-[158px] h-auto' src={arrow} alt="Arrow" />
            </div>
          </div>

          <div className='driver2'></div>
        </div>
      </section>
    </div>
  );
});

export default TeamOverview;
