import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bgPattern from '../../../assets/img/race/Bg.png';
import mobileBg from '../../../assets/img/race/Bg_Mobile.png';
import MoreView from '../../../components/buttons/MoreView';
import ArrowLeft from '../../../components/buttons/arrowLeft';
import ArrowRight from '../../../components/buttons/arrowRight';
import miami from '../../../assets/img/race/Miami.png';
import canada from '../../../assets/img/race/Canada.png';
import monaco from '../../../assets/img/race/Monaco.png';
import spain from '../../../assets/img/race/Spain.png';
import austria from '../../../assets/img/race/Austria.png';
import miamiHover from '../../../assets/img/race/Miami_Hover.png';
import canadaHover from '../../../assets/img/race/Canada_Hover.png';
import monacoHover from '../../../assets/img/race/Monaco_Hover.png';
import spainHover from '../../../assets/img/race/Spain_Hover.png';
import austriaHover from '../../../assets/img/race/Austria_Hover.png';

const CARDS = [
  { id: 0, image: miami,   hoverImage: miamiHover },
  { id: 1, image: canada,  hoverImage: canadaHover },
  { id: 2, image: monaco,  hoverImage: monacoHover },
  { id: 3, image: spain,   hoverImage: spainHover },
  { id: 4, image: austria, hoverImage: austriaHover },
];

const Race = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset]           = useState(0);
  const [dragOffset, setDragOffset]   = useState(0);
  const [isGrabbing, setIsGrabbing]   = useState(false);
  const listRef        = useRef(null);
  const startX         = useRef(0);
  const isDragging     = useRef(false);
  const dragOffsetRef  = useRef(0);
  const wheelBlock     = useRef(false);

  // 활성 카드를 컨테이너 중앙에 맞추는 오프셋 계산
  useLayoutEffect(() => {
    const compute = () => {
      if (!listRef.current) return;
      const containerW = listRef.current.offsetWidth;
      const isMobile   = window.innerWidth < 640;
      const cardW = isMobile ? 197 : 15.63 * window.innerWidth / 100;
      const gap   = isMobile ? 16  : 1.04  * window.innerWidth / 100;
      setOffset(containerW / 2 - (activeIndex * (cardW + gap) + cardW / 2));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [activeIndex]);

  // 데스크탑: cardList 위 휠 → 좌우 이동
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (window.innerWidth < 640) return;
      e.preventDefault();
      if (wheelBlock.current) return;
      setActiveIndex(i =>
        e.deltaY > 0 ? Math.min(CARDS.length - 1, i + 1) : Math.max(0, i - 1)
      );
      wheelBlock.current = true;
      setTimeout(() => { wheelBlock.current = false; }, 650);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // 데스크탑: 드래그 (연속 이동)
  const onMouseDown = (e) => {
    if (window.innerWidth < 640) return;
    isDragging.current    = true;
    startX.current        = e.clientX;
    dragOffsetRef.current = 0;
    setIsGrabbing(true);
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const cardW = 15.63 * window.innerWidth / 100;
    const gapW  = 1.04  * window.innerWidth / 100;
    const step  = cardW + gapW;
    const raw   = e.clientX - startX.current;
    // 경계 클램프: 첫/마지막 카드 밖으로 드래그 방지
    const maxRight =  activeIndex * step;
    const maxLeft  = -(CARDS.length - 1 - activeIndex) * step;
    const clamped  = Math.max(maxLeft, Math.min(maxRight, raw));
    dragOffsetRef.current = clamped;
    setDragOffset(clamped);
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const cardW = 15.63 * window.innerWidth / 100;
    const gapW  = 1.04  * window.innerWidth / 100;
    const shift = -dragOffsetRef.current / (cardW + gapW);
    const next  = Math.max(0, Math.min(CARDS.length - 1, Math.round(activeIndex + shift)));
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsGrabbing(false);
    setActiveIndex(next);
  };

  return (
    <div className='bg-[linear-gradient(to_bottom,#000000db_0%,#00000033_100%)]
      sm:bg-[linear-gradient(to_bottom,#000000c7_0%,#00000033_100%)]
      relative py-25 lg:pt-[9.38vw] lg:pb-[10.42vw] px-6 sm:px-[14.58vw]
      w-full h-[583px] sm:h-[52.97vw] flex flex-col overflow-hidden'
    >
      <img src={bgPattern} className="absolute left-0 top-0 w-full h-auto hidden sm:block pointer-events-none" />
      <img src={mobileBg}  className="absolute left-0 top-0 w-full h-auto sm:hidden pointer-events-none" />

      <section className='relative z-10 flex flex-col h-full'>

        <span className="text-[#00F4D0]/70 font-pretendard font-semibold text-[clamp(14px,_1.35vw,_26px)] leading-none tracking-none">
          Upcoming Races
        </span>

        {/* 카드 영역 + 모바일 화살표 오버레이 */}
        <div className='relative w-screen sm:h-[23.65vw] mt-15 mb-[45px] sm:mt-[6.41vw] sm:mb-[1.61vw] -ml-6 sm:-ml-[14.58vw]'>

          {/* 카드 트랙 */}
          <div
            ref={listRef}
            className='w-full overflow-hidden sm:overflow-visible sm:cursor-grab sm:active:cursor-grabbing'
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className='flex items-center gap-4 sm:gap-[1.04vw]'
              style={{
                transform:  `translateX(${offset + dragOffset}px)`,
                transition: isGrabbing ? 'none' : 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
                userSelect: 'none',
                willChange: 'transform',
              }}
            >
              {CARDS.map((card, i) => {
                const dist  = Math.abs(i - activeIndex);
                const scale = dist === 0 ? 1 : dist === 1 ? 0.87 : 0.77;
                return (
                  <div
                    key={card.id}
                    className={`flex-shrink-0 relative overflow-hidden group select-none
                      w-[197px] h-[219px] sm:w-[15.63vw] sm:h-auto
                      ${dist !== 0 ? 'opacity-40 sm:opacity-100' : ''}`}
                    style={{
                      transform:       `scale(${scale})`,
                      transition:      'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s',
                      transformOrigin: 'center center',
                    }}
                  >
                    {/* 기본 이미지 */}
                    <img
                      src={card.image} alt={card.title}
                      className='w-full h-auto block pointer-events-none'
                      draggable={false}
                    />

                    {/* 호버 이미지 — 아래에서 위로 슬라이드 (데스크탑만) */}
                    <img
                      src={card.hoverImage} alt=""
                      className='hidden sm:block absolute inset-0 w-full h-full object-cover pointer-events-none
                        translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out'
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 모바일 화살표 버튼 — 카드 영역에 오버레이 */}
          <div
            className='sm:hidden absolute left-6 top-1/2 -translate-y-1/2 z-20 transition-opacity'
            style={{ opacity: activeIndex === 0 ? 0.4 : 1, pointerEvents: activeIndex === 0 ? 'none' : 'auto' }}
            onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
          >
            <ArrowLeft />
          </div>
          <div
            className='sm:hidden absolute right-10 top-1/2 -translate-y-1/2 z-20 transition-opacity'
            style={{ opacity: activeIndex === CARDS.length - 1 ? 0.4 : 1, pointerEvents: activeIndex === CARDS.length - 1 ? 'none' : 'auto' }}
            onClick={() => setActiveIndex(i => Math.min(CARDS.length - 1, i + 1))}
          >
            <ArrowRight />
          </div>

        </div>

        {/* MORE VIEW 버튼 */}
        <div className='flex justify-center'>
          <MoreView />
        </div>

      </section>
    </div>
  );
};

export default Race;