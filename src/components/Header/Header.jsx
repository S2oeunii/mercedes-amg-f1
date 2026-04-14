import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/header-logo.svg';

const navItems = [
  { label: 'TEAM',     to: '/' },
  { label: 'CAR',      to: '/' },
  { label: 'RACE',     to: '/' },
  { label: 'PARTNERS', to: '/' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[999] px-[5.21vw] py-[1.04vw] flex justify-between items-center">
      <a href="/">
        <img className="w-[101px] lg:w-[160px] h-auto" src={Logo} alt="Mercedes-Benz Logo" />
      </a>

      <ul className="flex gap-[2.6vw] font-archivo font-semibold text-[24px] leading-none tracking-[-0.01em]">
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
    </header>
  );
};

export default Header;
