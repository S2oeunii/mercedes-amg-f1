import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 원본 p태그 구조를 그대로 유지하면서 char span으로 분리
// [text, brClass] — brClass가 null이면 항상 br, false면 br 없음
const segments = [
  ['메르세데스-AMG 페트로나스 포뮬러 원 팀은', null],
  ['정밀한 엔지니어링과 지속적인 혁신을', 'sm:hidden'],
  [' 기반으로 경쟁하는 팀입니다.', null],
  ['강력한 팀워크와 기술력을 바탕으로', null],
  ['트랙 안팎에서 최고의 퍼포먼스를 만들어내고 있습니다.', null],
  ['끊임없이 한계를 넘어서는 것을 목표로 합니다.', false],
]

const Identity = () => {
  const sectionRef = useRef(null)
  const pRef = useRef(null)

  useLayoutEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (isMobile) return

    const ctx = gsap.context(() => {
      const chars = pRef.current.querySelectorAll('.char')

      gsap.set(chars, { opacity: 0.1 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: `+=${chars.length * 15}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      }).to(chars, {
        opacity: 1,
        stagger: { each: 0.05 },
        ease: 'none',
        duration: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='px-6 py-[290px] md:pt-[15.99vw] md:pb-[16.04vw] md:pl-[28.39vw] md:pr-[28.44vw]
        flex flex-col gap-[35px] sm:gap-[2.86vw] sm:gap-[0.52vw] items-center justify-center text-center'
    >
      <h1
        className='font-archivo font-black italic text-[clamp(46px,_5.21vw,_100px)] leading-none tracking-none
          bg-[linear-gradient(to_bottom_right,#89ECDD_0%,#80A6CC_50%,#5D91C4_100%)]
          bg-clip-text text-transparent animate-slide-in-left'
      >
        We Are<br />Silver Arrow
      </h1>
      <p
        ref={pRef}
        className='text-white font-pretendard font-semibold text-[clamp(16px,_1.46vw,_28px)] leading-[1.5] tracking-[-0.004em]'
      >
        {segments.map(([text, brClass], i) => (
          <React.Fragment key={i}>
            {text.split('').map((char, j) => (
              <span key={j} className='char'>{char}</span>
            ))}
            {brClass !== false && <br {...(brClass ? { className: brClass } : {})} />}
          </React.Fragment>
        ))}
      </p>
    </div>
  )
}

export default Identity
