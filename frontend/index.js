import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ClassComponents from './components/ClassComponents'
import './styles/reset.css'
import './styles/styles.css'


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <h1>3.1 - Advanced React</h1>
    <nav>
      <NavLink to="/">Class Components</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<ClassComponents />} />
    </Routes>
  </BrowserRouter>
)
