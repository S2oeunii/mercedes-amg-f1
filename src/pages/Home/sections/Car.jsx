import React, { useEffect, useRef, useState } from 'react'

const Car = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const overlayStyle = (i) => ({
    transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
    transitionDelay: revealed ? `${i * 80}ms` : '0ms',
    transform: revealed ? 'translateX(101%)' : 'translateX(0%)',
  });

  const textCls = 'font-archivo font-bold text-white text-[clamp(35px,_4.17vw,_80px)] text-center leading-none tracking-none';
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
    <div key={i} className="relative overflow-hidden pb-[0.2em]">
      <div className={textCls}>{content}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F4D0] to-[#008E79]" style={overlayStyle(i)} />
    </div>
  );

  return (
    <div className='bg-black py-25 lg:pt-45 lg:pb-50 w-full flex flex-col items-center gap-4.48 lg:gap-[15.63vw]'>
      <section ref={sectionRef} className='car flex flex-col md:flex-row'>
        <div className="sm:hidden flex flex-col">
          {mobileLines.map(renderLine)}
        </div>
        <div className="hidden sm:flex flex-col">
          {smLines.map(renderLine)}
        </div>
      </section>
    </div>
  );
}

export default Car;
