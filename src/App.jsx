import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ScrollUp from './components/buttons/ScrollUp';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollUp />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;