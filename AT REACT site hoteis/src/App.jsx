// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeHotels } from './services/LocalStorage';

// Pages
import Home from './Pages/Home';
import HotelPage from './Pages/HotelPage';
import Admin from "./Pages/Admin";

//components
import HotelDetails from './components/hotelDetails';
import CadastrarHotel from "./components/CadastrarHotel";
import EditList from "./components/EditList";
import EditarHotel from "./components/EditarHotel";

// Layout
import Navbar from './layout/Navbar';
import Container from "./layout/Container";
import Footer from './layout/Footer';

function App() {
    useEffect(() => {
        initializeHotels();
    }, []);

    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hotelPage" element={<HotelPage />} />
                    <Route path="/hotel/:id" element={<HotelDetails />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/cadastrar" element={<CadastrarHotel />} />
                    <Route path="/editList" element={<EditList/>} />
                    <Route path="/editHotel/:id" element={<EditarHotel/>} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
