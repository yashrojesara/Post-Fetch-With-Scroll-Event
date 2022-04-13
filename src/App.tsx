import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostLists from './Component/PostLists';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayPosts from './Component/DisplayPosts';

function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<PostLists />} />
                        <Route path="/display" element={<DisplayPosts />} />
                    </Routes>
                </div>

            </BrowserRouter>
        </>
    );
}

export default App;
