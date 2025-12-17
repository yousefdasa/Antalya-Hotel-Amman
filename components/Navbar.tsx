import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  const t = (key: string) => TRANSLATIONS[key][language];

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/rooms', label: t('rooms') },
    { path: '/facilities', label: t('facilities') },
    { path: '/gallery', label: t('gallery') },
    { path: '/contact', label: t('contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-navy-900/95 backdrop-blur-sm text-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
             <div className="w-8 h-8 bg-gold-500 rounded-sm transform rotate-45 flex items-center justify-center">
                <span className="text-navy-900 font-bold text-lg transform -rotate-45">A</span>
             </div>
             <div className="flex flex-col">
                <span className="font-serif text-xl tracking-wider uppercase font-bold text-gold-400">Antalya</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Hotel Amman</span>
             </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path) ? 'text-gold-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-gray-300 hover:text-gold-400 transition"
             >
                <Globe size={18} />
                <span className="uppercase text-sm font-bold">{language === Language.EN ? 'AR' : 'EN'}</span>
             </button>
             <Link to="/rooms" className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-wide transition-colors">
                {t('bookNow')}
             </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {link.label}
              </Link>
            ))}
             <button 
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
             >
                Switch to {language === Language.EN ? 'Arabic' : 'English'}
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;