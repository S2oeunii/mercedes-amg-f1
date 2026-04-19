import React, { useEffect, useRef, useState } from 'react'
import w17 from '../../../assets/img/car/W17.png';

const Car = () => {
  const sectionRef = useRef(null);
  const carImgsRef = useRef(null);
  const carInViewRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { carInViewRef.current = entry.isIntersecting; },
      { threshold: 0, rootMargin: '-30% 0px -30% 0px' }
    );
    if (carImgsRef.current) observer.observe(carImgsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = carImgsRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (window.innerWidth < 640 || !carInViewRef.current) return;

      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const overlayStyle = (i) => ({
    transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
    transitionDelay: revealed ? `${i * 80}ms` : '0ms',
    transform: revealed ? 'translateX(101%)' : 'translateX(0%)',
  });

  const textCls = 'font-archivo font-bold text-white text-[clamp(35px,_4.17vw,_80px)] leading-none tracking-none';
  const mint = 'text-[#00F4D0] font-eb-garamond font-semibold italic';

  const mobileLines = [
    <>A New Era of</>,
    <span className={mint}>Performance</span>,
    <>Driven</>,
    <>by <span className={mint}>Innovation</span> and</>,
    <>Precision</>,
    <>Engineering,</>,
    <>Pushing the Limits</>,
    <>of <span className={mint}>Speed</span></>,
    <>and Control,</>,
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
    <div className='bg-black py-25 lg:pt-45 lg:pb-50 w-full flex flex-col items-center lg:gap-[15.63vw] overflow-hidden'>
      <section className='car-intro flex flex-col gap-[4.48vw] lg:gap-[9.11vw]'>
        <div className='car-text' ref={sectionRef}>
          <div className="sm:hidden flex flex-col">
            {mobileLines.map(renderLine)}
          </div>
          <div className="hidden sm:flex flex-col">
            {smLines.map(renderLine)}
          </div>
        </div>

        <ul
          ref={carImgsRef}
          className='car-imgs relative flex flex-col sm:flex-row sm:overflow-x-auto scrollbar-hide'
        >
          <li className='top-0 flex flex-col sm:gap-[0.73vw]'>
            <p className='font-archivo font-bold italic
              text-[#00F4D0] text-[clamp(14px,_1.04vw,_20px)] leading-[1.5] sm:leading-[2]'>F1 W17</p>
            <img src={w17} alt="W17" className='w-[16.15vw] sm:w-[46.84vw] h-auto' />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Car;
