

// function App() {

//   return (
//     <section className='text-center'>
//       <Router >
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </section>
//   )
// }

// export default App


// --- client/src/App.js (UPDATED for React Router and Dashboard) ---
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
            <Link to="/" className="text-2xl font-bold text-orange-500 text-orange-500 hover:text-orange-400"><span className='text-red-600'>e</span>Signature Document</Link>
            <div>
              <Link to="/dashboard" className="text-slate-600 hover:text-orange-500 px-3 py-2 rounded-md transition-colors">Dashboard</Link>
              <Link to="/login" className="text-slate-600 hover:text-orange-500 px-3 py-2 rounded-md transition-colors">Login</Link>
              <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors ml-2">Register</Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
