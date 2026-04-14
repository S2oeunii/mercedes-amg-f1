import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/header-logo.svg';
import NavIcon from '../../assets/icons/nav.svg';

const navItems = [
  { label: 'TEAM',     to: '/' },
  { label: 'CAR',      to: '/' },
  { label: 'RACE',     to: '/' },
  { label: 'PARTNERS', to: '/' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[999] px-[5.21vw] py-[1.04vw] flex justify-between items-center">
        <a href="/">
          <img className="w-[101px] lg:w-[160px] h-auto" src={Logo} alt="Mercedes-Benz Logo" />
        </a>

        {/* 데스크탑 nav */}
        <ul className="hidden lg:flex gap-[2.6vw] font-archivo font-semibold text-[24px] leading-none tracking-[-0.01em]">
          {navItems.map(({ label, to }) => (
            <li
              key={label}
              className="list-none py-[0.1vw] relative
                after:content-[''] after:absolute after:left-0 after:bottom-[-0.1vw]
                after:w-0 after:h-[3px]
                after:bg-gradient-to-r after:from-[#00F4D0] after:to-[#C0C7CE]
                after:transition-[width] after:duration-300 after:ease-out
                hover:after:w-full"
            >
              <Link to={to} className="text-white">{label}</Link>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
          aria-label="메뉴 열기"
        >
          <img src={NavIcon} style={{ width: '24px', height: '15px' }} alt="nav" />
        </button>
      </header>

      {/* 풀스크린 팝업 */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center">
          <button
            className="absolute top-[1.5rem] right-[5.21vw] text-white text-[32px] leading-none cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>

          <ul className="flex flex-col items-start gap-10 px-[5.21vw] w-full">
            {navItems.map(({ label, to }) => (
              <li key={label} className="list-none">
                <Link
                  to={to}
                  className="popup-nav-link text-white font-archivo font-semibold text-[40px] leading-none tracking-[-0.01em]
                    relative transition-colors duration-300
                    after:content-[''] after:absolute after:left-0 after:bottom-[-0.3rem]
                    after:w-0 after:h-[3px]
                    after:bg-gradient-to-r after:from-[#00F4D0] after:to-[#C0C7CE]
                    after:transition-[width] after:duration-300 after:ease-out
                    hover:after:w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
