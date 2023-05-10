import React from 'react';
import './App.css';
import {GolfPage} from './components/GolfPage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    { path: '/', element: <GolfPage /> }
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
