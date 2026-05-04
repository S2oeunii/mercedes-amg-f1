import React, { useRef, useState, useCallback, useEffect } from 'react'
import MoreView from '../../../components/buttons/MoreView'

const data = [
  { title: ["Constructors'", 'Championships'], count: '8',   img: './img/sub/constructors.png' },
  { title: ["Drivers'",      'Championships'], count: '9',   img: './img/sub/drivers.png'      },
  { title: ['Wins',          null            ], count: '133', img: './img/sub/wins.png'         },
]

const Legacy = () => {
  const ulRef    = useRef(null)
  const thumbRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateThumb = useCallback(() => {
    const ul    = ulRef.current
    const thumb = thumbRef.current
    if (!ul || !thumb) return
    const track      = thumb.parentElement
    const trackWidth = track.clientWidth
    const ratio      = ul.clientWidth / ul.scrollWidth
    const thumbWidth = Math.max(trackWidth * ratio, 20)
    const scrollable = ul.scrollWidth - ul.clientWidth
    const scrollRatio = scrollable > 0 ? ul.scrollLeft / scrollable : 0
    thumb.style.width = `${thumbWidth}px`
    thumb.style.left  = `${scrollRatio * (trackWidth - thumbWidth)}px`
  }, [])

  const handleScroll = useCallback(() => {
    const ul = ulRef.current
    if (!ul) return
    const lis = ul.querySelectorAll('li')
    if (lis.length < 2) return
    const step = Math.abs(
      lis[1].getBoundingClientRect().left - lis[0].getBoundingClientRect().left
    )
    if (!step) return
    setActiveIndex(
      Math.min(Math.max(Math.round(ul.scrollLeft / step), 0), data.length - 1)
    )
    updateThumb()
  }, [updateThumb])

  // 썸 드래그로 ul 스크롤
  const handleThumbMouseDown = useCallback((e) => {
    e.preventDefault()
    const ul    = ulRef.current
    const thumb = thumbRef.current
    if (!ul || !thumb) return

    const startX          = e.clientX
    const startScrollLeft = ul.scrollLeft

    const onMove = (moveEvent) => {
      const track       = thumb.parentElement
      const trackWidth  = track.clientWidth
      const thumbWidth  = parseFloat(thumb.style.width) || 0
      const scrollable  = ul.scrollWidth - ul.clientWidth
      const dx          = moveEvent.clientX - startX
      ul.scrollLeft = startScrollLeft + (dx / (trackWidth - thumbWidth)) * scrollable
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])

  useEffect(() => {
    const ul = ulRef.current
    if (!ul) return
    ul.addEventListener('scroll', handleScroll, { passive: true })
    updateThumb()
    return () => ul.removeEventListener('scroll', handleScroll)
  }, [handleScroll, updateThumb])

  const { title, count } = data[activeIndex]

  return (
    <div className='flex flex-col px-6 py-25 sm:px-[14.58vw] sm:pt-[9.38vw] sm:pb-[10.42vw] overflow-hidden'>

      {/* 상단 텍스트 */}
      <div className='flex flex-col gap-[28px] sm:gap-[5.21vw] w-full text-left items-start'>
        <span className='text-[#00F4D0] text-[14px] sm:text-[1.35vw] font-pretendard font-semibold leading-none tracking-none'>
          Built to Win
        </span>
        <p className='text-[#C0C7CE] text-[12px] sm:text-[1.35vw] font-pretendard font-light leading-[1.5] tracking-tight'>
          메르세데스는 Formula 1 역사에서 <br className='sm:hidden' />가장 뛰어난 성과를 기록한 팀 중 하나입니다.<br />
          다수의 챔피언십과 우승 기록은 팀의 기술력과 운영 역량을 보여줍니다.<br />
          지속적으로 축적된 성과는 현재의 경쟁력을 유지하는 중요한 기반입니다.
        </p>
      </div>

      {/* 중단: ulDesc + ul */}
      <div className='flex flex-col-reverse sm:flex-row gap-[28px] sm:gap-[5.47vw] sm:items-end
          mt-20 sm:mt-[8.75vw] sm:mb-[6.56vw] sm:ml-[9.38vw]'>

        {/* ulDesc */}
        <div className='w-full sm:w-auto shrink-0 flex sm:flex-col sm:gap-[1.56vw]
            justify-between sm:justify-center items-start
            text-white hover:text-[#00F4D0] font-archivo font-light tracking-none
            transition-colors duration-300 cursor-default'>
          <div className='sm:w-[12.50vw] flex flex-col gap-[10px] sm:gap-[1.04vw]'>
            <p key={activeIndex} className='text-[14px] sm:text-[1.04vw] leading-[1.25] animate-fade-in'>
              {title[0]}{title[1] && <><br />{title[1]}</>}
            </p>
            <div className='bg-white/30 w-[74px] sm:w-[4.95vw] h-[1px]'></div>
          </div>
          <p key={`count-${activeIndex}`} className='text-[100px] sm:text-[7.60vw] leading-none animate-fade-in'>
            {count}
          </p>
        </div>

        {/* ul + 모바일 커스텀 스크롤바 — flex-1 min-w-0으로 데스크탑에서 남은 공간을 가져 스크롤 가능 */}
        <div className='flex flex-col flex-1 min-w-0'>
          <ul
            ref={ulRef}
            className='flex gap-5 sm:gap-[2.08vw] sm:pr-[8.59vw] overflow-x-auto scrollbar-hide snap-x snap-mandatory'
          >
            {data.map(({ img }, i) => (
              <li key={i} className='w-[345px] sm:w-[34.90vw] shrink-0 snap-start'>
                <img className='w-full h-auto' src={img} alt='' />
              </li>
            ))}
          </ul>

          {/* 모바일 전용 커스텀 스크롤바 */}
          <div className='sm:hidden mt-[50px] relative h-[5px] rounded-full bg-white/30'>
            <div
              ref={thumbRef}
              onMouseDown={handleThumbMouseDown}
              className='absolute top-0 h-full rounded-full cursor-pointer'
              style={{
                background: 'linear-gradient(to right, #008E79 0%, #00F4D0 50%, #008E79 100%)',
                width: '0px',
                left: '0px',
              }}
            />
          </div>
        </div>
      </div>

      {/* MORE VIEW */}
      <div className='w-full hidden sm:flex items-center justify-center'>
        <MoreView />
      </div>
    </div>
  )
}

export default Legacy
