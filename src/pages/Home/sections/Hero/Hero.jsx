import { useEffect, useRef } from 'react';
import arrowDown from '../../../../assets/icons/arrowDown.svg';
import bg1 from '../../../../assets/img/Hero_KeyVisual-1.jpg';
import bg2 from '../../../../assets/img/Hero_KeyVisual-2.jpg';
import bg3 from '../../../../assets/img/Hero_KeyVisual-3.jpg';

const bgImages = [bg1, bg2, bg3];

const getBgClass = (step, bgIndex) => {
  if (step === bgIndex) return 'opacity-100 translate-y-0 z-[2]';
  if (step > bgIndex)  return 'opacity-100 -translate-y-[5%] z-[1]';
  return 'opacity-80 translate-y-[5%] -z-[1]';
};

function Hero({ onScrollDown, step, setStep, isActive }) {
  const isScrolling = useRef(false);
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (stepRef.current === 2) {
          onScrollDown?.();
          return;
        }
        isScrolling.current = true;
        setStep((prev) => Math.min(prev + 1, 2));
        setTimeout(() => { isScrolling.current = false; }, 800);
      } else {
        if (stepRef.current === 0) return;
        isScrolling.current = true;
        setStep((prev) => Math.max(prev - 1, 0));
        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, onScrollDown, setStep]);

  return (
    <section className="flex justify-between items-end pt-[25.5vw] px-[5.2vw] pb-[5.2vw] relative overflow-hidden">

      {/* 배경 슬라이드 */}
      {bgImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center [will-change:transform,opacity] [transition:opacity_0.5s_ease-out,transform_0.5s_ease-out] ${getBgClass(step, i)}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* 타이틀 */}
      <h1 className="font-archivo font-black text-[clamp(40px,5.2vw,100px)] leading-none relative z-[100]">
        <span className={`title-transition ${step >= 1 ? 'text-stroke-white' : 'text-fill-white'}`}>
          Mercedes-AMG
        </span><br />

        <span className={`title-transition ${step === 1 ? 'text-fill-mint' : 'text-stroke-mint'}`}>
          PETRONAS
        </span><br />

        <span className={`title-transition ${step === 2 ? 'text-fill-white' : 'text-stroke-white'}`}>
          Formula 1<br />Team
        </span>
      </h1>

      {/* 스크롤 다운 버튼 */}
      <div
        className="group flex flex-col items-center gap-[0.31vw] cursor-pointer relative z-[100]"
        onClick={onScrollDown}
      >
        <span className="font-pretendard font-medium text-[0.83vw] text-white leading-none tracking-[-0.01em] text-center transition-colors duration-300 group-hover:text-[#00F4D0]">
          SCROLL<br />DOWN
        </span>

        <div className="w-[2.6vw] h-[6.51vw] border border-white rounded-[2.6vw] relative overflow-hidden transition-all duration-300 ease-out group-hover:bg-gradient-to-b group-hover:from-[#00F4D0] group-hover:to-[#008E79] group-hover:border-0">
          <div className="absolute w-full h-1/2 bg-white/50 rounded-[1.3vw] top-0 animate-pill transition-opacity duration-300 group-hover:opacity-0" />
          <img src={arrowDown} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.35vw] h-auto" alt="scroll down" />
        </div>
      </div>

    </section>
  );
}

export default Hero;
