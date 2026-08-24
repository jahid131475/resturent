import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  CalendarDays, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAIConcierge: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenReservation,
  onOpenAIConcierge,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: "Chef's Tasting", href: '#chef-specials' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Our Story', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact & Hours', href: '#location' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div id="top-bar" className="bg-[#09090b] border-b border-zinc-800/80 text-xs text-zinc-400 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-gold-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              Michelin Selected 2025 • Autumn Symphony Tasting Menu
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              Dinner: 5:00 PM – 11:00 PM Daily
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+14158903400" className="flex items-center gap-1 hover:text-gold-400 transition-colors">
              <Phone className="w-3 h-3 text-gold-500" />
              +1 (415) 890-3400
            </a>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3 h-3 text-gold-400" />
              742 Grand Ave, San Francisco
            </span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <nav 
        id="main-navbar" 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' 
            : 'bg-gradient-to-b from-[#0a0a0b]/95 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a 
            id="nav-brand-logo" 
            href="#" 
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300 border border-gold-300/30">
              <UtensilsCrossed className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-white block leading-none">
                SAVORIA
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold block mt-0.5">
                Bistro & Lounge
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Bento pill dock) */}
          <div className="hidden lg:flex items-center space-x-1 p-1 bg-[#141414]/90 rounded-2xl border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-black bg-gradient-to-r from-gold-400 to-gold-500 font-bold shadow-md shadow-gold-500/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Sommelier Button */}
            <button
              id="ai-concierge-btn"
              onClick={onOpenAIConcierge}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#18181b] border border-white/10 hover:border-gold-500/50 text-gold-300 hover:text-white text-xs font-semibold transition-all shadow-sm group"
              title="Get dish & wine recommendations tailored to your taste"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-12 transition-transform" />
              <span>AI Sommelier</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-2xl bg-[#18181b] border border-white/10 text-zinc-200 hover:text-gold-400 hover:border-gold-500/50 transition-all cursor-pointer"
              aria-label="View online ordering bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span 
                  id="cart-badge-count" 
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-xs rounded-full flex items-center justify-center shadow-md animate-pulse"
                >
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Reserve a Table CTA */}
            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Table</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#18181b] border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0c0c0c]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 z-40 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIConcierge();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-gold-300 bg-gold-500/10 border border-gold-500/30 text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Ask AI Sommelier & Pairings</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
