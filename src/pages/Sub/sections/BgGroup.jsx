import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BgGroup = ({ children }) => {
  const groupRef      = useRef(null);
  const bgDivRef      = useRef(null);
  const desktopImgRef = useRef(null);
  const mobileImgRef  = useRef(null);

  useEffect(() => {
    const group = groupRef.current;

    // Precision의 sm:absolute 아이템들이 sectionRef DOM 높이를 벗어나므로,
    // 실제 시각적 하단을 측정해 groupRef를 paddingBottom으로 확장
    const sy              = window.scrollY;
    const groupDocTop     = group.getBoundingClientRect().top + sy;
    const groupOrigBottom = groupDocTop + group.offsetHeight;
    let   maxDocBottom    = groupOrigBottom;

    Array.from(group.children).forEach(child => {
      if (child === bgDivRef.current) return;
      [child, ...child.querySelectorAll('*')].forEach(el => {
        const b = el.getBoundingClientRect().bottom + sy;
        if (b > maxDocBottom) maxDocBottom = b;
      });
    });

    const overflow = Math.max(0, Math.ceil(maxDocBottom - groupOrigBottom));
    if (overflow > 0) {
      group.style.paddingBottom = `${overflow}px`;
      // 기존 ScrollTrigger(Identity pin 등) 위치 재계산
      ScrollTrigger.refresh();
    }

    // 패럴렉스 + 미세 확대 애니메이션
    const mm = gsap.matchMedia();

    mm.add('(min-width: 640px)', () => {
      gsap.fromTo(
        desktopImgRef.current,
        { y: 0, scale: 1 },
        {
          y: -500,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: group,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    });

    mm.add('(max-width: 639px)', () => {
      gsap.fromTo(
        mobileImgRef.current,
        { y: 0, scale: 1 },
        {
          y: -300,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: group,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={groupRef} className="relative isolate overflow-x-hidden">

      {/* 배경: bgDivRef는 inset-0으로 paddingBottom 확장 후 groupRef 전체를 커버 */}
      <div ref={bgDivRef} className="absolute inset-0 -z-10 overflow-hidden">

        {/* Desktop — 100%는 확장된 bgDivRef 높이 기준, +600px으로 y + scale 여분 확보 */}
        <img
          ref={desktopImgRef}
          src="./img/sub/bg-5000.png"
          alt=""
          className="hidden sm:block absolute top-0 left-0 w-full"
          style={{ height: 'calc(100% + 600px)', objectFit: 'cover', objectPosition: 'top center' }}
        />

        {/* Mobile */}
        <img
          ref={mobileImgRef}
          src="./img/sub/bg-3000.png"
          alt=""
          className="block sm:hidden absolute top-0 left-0 w-full"
          style={{ height: 'calc(100% + 300px)', objectFit: 'cover', objectPosition: 'top center' }}
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      {children}

    </section>
  );
};

export default BgGroup;
