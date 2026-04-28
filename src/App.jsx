import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ScrollUp from './components/buttons/ScrollUp';
import Home from './pages/Home';
import Team from './pages/Sub/Team';
import Footer from './components/Footer/Footer';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ScrollUp menuOpen={menuOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;