import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import arrowDown from './assets/icons/arrowDown.svg';

function App() {
  // topScroll Btn
  const teamRef = useRef(null);
  const handleScroll = () => {
    teamRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // HERO Slide
  const [step, setStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0) {
        setStep((prev) => Math.min(prev + 1, 2));
      } else {
        setStep((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800); // 0.8초 잠금
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolling]);

  return (
    <>
      <BrowserRouter>
        <Header />
      </BrowserRouter>

      <section className={`hero step-${step}`}>
        <div className={`bg bg-1 ${step === 0 ? 'active' : step > 0 ? 'prev' : ''}`}></div>
        <div className={`bg bg-2 ${step === 1 ? 'active' : step > 1 ? 'prev' : ''}`}></div>
        <div className={`bg bg-3 ${step === 2 ? 'active' : ''}`}></div>

        <h1 className='hero-title'>
          <span className={`title-1 ${step >= 1 ? 'stroke-white' : 'fill-white'}`}>
            Mercedes-AMG
          </span><br />

          <span className={`title-2 ${step === 1 ? 'fill-mint' : 'stroke-mint'}`}>
            PETRONAS
          </span><br />

          <span className={`title-3 ${step === 2 ? 'fill-white' : 'stroke-white'}`}>
            Formula 1<br />Team
          </span>
        </h1>

        <div className="scrollDown" onClick={handleScroll}>
          <span className="text">SCROLL<br />DOWN</span>
          
          <div className="pill">
            <div className="bg-circle"></div>
            <img src={arrowDown} className="arrow" />
          </div>
        </div>
      </section>

      <section className='team' ref={teamRef}>
      </section>
    </>
  )
}

export default App
