import { useRef, useState } from 'react';
import Hero from './sections/Hero/Hero';
import TeamOverview from './sections/TeamOverview/TeamOverview';

function Home() {
  const teamRef = useRef(null);
  const [heroStep, setHeroStep] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const handleScrollToTeam = () => {
    setActiveSection('team');
    teamRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHero = () => {
    setHeroStep(2);
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        onScrollDown={handleScrollToTeam}
        step={heroStep}
        setStep={setHeroStep}
        isActive={activeSection === 'hero'}
      />
      <TeamOverview
        ref={teamRef}
        onScrollUp={handleScrollToHero}
        isActive={activeSection === 'team'}
      />
    </>
  );
}

export default Home;
