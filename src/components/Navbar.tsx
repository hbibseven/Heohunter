import React from 'react';
import { Rocket, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isEnglish = location.pathname === '/en';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={isEnglish ? "/en" : "/"} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neon-cyan rounded-lg flex items-center justify-center neon-glow">
              <Rocket className="text-space-black w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter text-white">
              HEOHUNTER<span className="text-neon-cyan">EA</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#proof" className="hover:text-neon-cyan transition-colors">Proof</a>
          <a href="#solution" className="hover:text-neon-cyan transition-colors">System</a>
          <a href="#pricing" className="hover:text-neon-cyan transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-neon-cyan transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <Link 
              to="/" 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${!isEnglish ? 'bg-neon-cyan text-space-black' : 'text-white/50 hover:text-white'}`}
            >
              ID
            </Link>
            <Link 
              to="/en" 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${isEnglish ? 'bg-neon-cyan text-space-black' : 'text-white/50 hover:text-white'}`}
            >
              EN
            </Link>
          </div>

          <a 
            href="#pricing" 
            className="hidden sm:block px-6 py-2 bg-neon-cyan text-space-black font-bold rounded-full text-sm hover:scale-105 transition-transform neon-glow"
          >
            {isEnglish ? 'Get Started' : 'Mulai Sekarang'}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
