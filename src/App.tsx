import React from 'react';
import './App.css';
import {GolfPage} from './components/GolfPage';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/" element={<GolfPage />}/>
            </Routes>
        </HashRouter>
    )
}

export default App;
