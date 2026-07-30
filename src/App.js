import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Streaks from './pages/Streaks';
import StreakDetail from './pages/StreakDetail';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/streaks" element={<Streaks />} />
                    <Route path="/streaks/:id" element={<StreakDetail />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </HelmetProvider>
    );
}
