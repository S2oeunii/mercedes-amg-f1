import { forwardRef, useEffect, useRef } from 'react';
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
    <section className="bg-[#000] pt-45 pb-50 w-full"
      ref={ref}
    >
      <section className='overview'>
        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[26px] leading-none tracking-none">Team Overview</span>

        <div className='container'>
          <div className='contents flex flex-col lg:flex-row justify-between lg:max-w-[1360px] w-full mx-auto mt-25 px-12 lg:px-0'>
            <div className='desc'>
              <h1 className="w-[636px] h-auto mb-10
                text-[#fff] font-archivo font-bold italic text-[80px] leading-none tracking-none"
              >
                Precison.<br />
                <p className='text-right'>Performance.</p>
                Legacy.
              </h1>

              <p className='text-white font-pretendard font-light text-[20px] leading-normal tracking-tight'>
                독일을 대표하는 메르세데스-AMG 페트로나스 포뮬러 원 팀은<br />
                수십 년의 레이싱 헤리티지를 바탕으로 최점단 기술력과  정밀한 엔지니어링을 결합해,<br />
                퍼포먼스의 한계를 끊임없이 확장해 나갑니다.
              </p>
            </div>

            <div className='w-40 h-80 bg-red-500'></div>
          </div>

          <MoreView />
        </div>
      </section>
    </section>
  );
});

export default TeamOverview;
