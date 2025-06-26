import React from "react";
import { Link } from "react-router-dom"
function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 bg-slate-50">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Welcome to <span className='text-red-600'>e</span>Signature Document</h1>
            <p className="text-xl text-slate-600 mb-8 text-center max-w-2xl">
                Your tool to eSign documents. Sign a document yourself or send a signature request to others.
            </p>
            <div className="space-x-4">
                <Link to="/dashboard" className="bg-orange-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-orange-400 transition-colors shadow-lg">Go to Dashboard</Link>
                <Link to="/register" className="bg-white border border-orange-600 text-orange-400 py-3 px-6 rounded-lg text-lg hover:bg-orange-50 hover:text-orange-700 transition-colors shadow-lg">Sign Up</Link>
            </div>
        </div>
    );
}

export default Home;

