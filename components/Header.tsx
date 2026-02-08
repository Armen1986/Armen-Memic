import React, { useState, useRef, useEffect } from 'react';
import { Instagram, Twitter, ShoppingBag, Store, User, LogOut, Calendar, Settings, Menu } from 'lucide-react';

// STYLES
const NAV_ITEM_CLASS = `
  relative px-4 py-2 text-sm uppercase tracking-widest text-secondary/70 font-body
  transition-all duration-300 ease-out
  hover:text-secondary hover:font-medium
  focus-visible:text-accent focus-visible:-translate-y-1
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300
  hover:after:w-full
`;

const ACTIVE_NAV_ITEM_CLASS = `
  text-accent font-medium
  after:w-full
`;

const ICON_BTN_CLASS = `
  p-2 text-secondary/80 transition-all duration-300 rounded-full
  hover:text-accent hover:bg-accent/5 hover:-translate-y-1 hover:shadow-lg
  focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:bg-accent/5
`;

const NAV_LINKS = [
  'home', 'philosophy', 'experiences', 'visuals', 'contact'
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isScrolled ? 'py-2 glass-panel shadow-sm' : 'py-6 bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Left: Mobile Menu Trigger / Secondary Nav */}
        <div className="flex-1 flex items-center">
          <button 
            className="lg:hidden p-2 -ml-2 text-secondary hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
          
          <nav className="hidden lg:flex gap-1">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a 
                key={link}
                href={`#${link}`}
                className={`${NAV_ITEM_CLASS} ${activeLink === link ? ACTIVE_NAV_ITEM_CLASS : ''}`}
                onClick={() => setActiveLink(link)}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-initial text-center px-4 group cursor-pointer">
          <a href="#" className="block" onClick={() => setActiveLink('home')}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-secondary group-hover:text-secondary/90 transition-colors">
              Rooted & <span className="text-accent italic font-accent font-normal">Radiant</span> Eros
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 mt-1 font-body group-hover:text-accent transition-colors duration-500">
              Somatic & Tantric Intimacy
            </p>
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          <nav className="hidden lg:flex gap-1 mr-4">
            {NAV_LINKS.slice(2).map((link) => (
              <a 
                key={link}
                href={`#${link}`}
                className={`${NAV_ITEM_CLASS} ${activeLink === link ? ACTIVE_NAV_ITEM_CLASS : ''}`}
                onClick={() => setActiveLink(link)}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pl-4 border-l border-secondary/10">
            <a href="#" className={ICON_BTN_CLASS} aria-label="Bookings">
              <Calendar size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className={ICON_BTN_CLASS} aria-label="Profile">
              <User size={18} strokeWidth={1.5} />
            </a>
            <button className="hidden md:block ml-2 px-6 py-2 bg-secondary text-dominant text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 btn-luxury">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8
          transition-all duration-500 ease-in-out lg:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <button 
          className="absolute top-6 right-6 p-2 text-secondary hover:text-accent"
          onClick={() => setIsMenuOpen(false)}
        >
          <LogOut size={24} />
        </button>
        
        {NAV_LINKS.map((link) => (
          <a 
            key={link}
            href={`#${link}`}
            className="font-heading text-4xl text-secondary hover:text-accent hover:italic transition-all duration-300"
            onClick={() => {
              setActiveLink(link);
              setIsMenuOpen(false);
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </header>
  );
}