import { useRef, useState, useEffect } from 'react';
import Hero from './sections/Hero';
import TeamOverview from './sections/TeamOverview';
import Car from './sections/Car';
import Race from './sections/Race';
import Partners from './sections/Partners';

function Home() {
  const teamRef = useRef(null);
  const [heroStep, setHeroStep] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // 스크롤 위치로 activeSection 자동 감지
  // → Hero 휠 핸들러가 TeamOverview에서 돌아왔을 때도 정상 작동
  useEffect(() => {
    const onScroll = () => {
      if (!teamRef.current) return;
      const inTeam = window.scrollY >= teamRef.current.offsetTop - window.innerHeight * 0.5;
      setActiveSection(inTeam ? 'team' : 'hero');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollToTeam = () => {
    setActiveSection('team');
    teamRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        onScrollDown={handleScrollToTeam}
        step={heroStep}
        setStep={setHeroStep}
        isActive={activeSection === 'hero'}
      />
      <TeamOverview ref={teamRef} />
      <Car />
      <Race />
      <Partners />
    </>
  );
}

export default Home;
