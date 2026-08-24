import React, { useState } from 'react';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Award,
  ChevronDown,
  Flame,
  Wine
} from 'lucide-react';
import { SeatingArea } from '../types';

interface HeroProps {
  onQuickBook: (date: string, time: string, guests: number, area: SeatingArea) => void;
  onExploreMenu: () => void;
  onExploreTasting: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onQuickBook,
  onExploreMenu,
  onExploreTasting,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [quickDate, setQuickDate] = useState(todayStr);
  const [quickTime, setQuickTime] = useState('19:00');
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickArea, setQuickArea] = useState<SeatingArea>('main-hall');

  const handleQuickReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(quickDate, quickTime, quickGuests, quickArea);
  };

  return (
    <section id="hero-section" className="relative pt-6 pb-16 lg:py-16 overflow-hidden">
      {/* Subtle ambient light accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-gold-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Bento Grid Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#121214] border border-white/10 p-7 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl group">
            {/* Background luxury photo with dark overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
                alt="Savoria Bistro Luxury Dining"
                className="w-full h-full object-cover brightness-[0.25] contrast-110 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent" />
            </div>

            {/* Content Top */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-semibold tracking-wide shadow-md">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Michelin Selected 2025</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>4.9 / 5.0 Rating (1,400+ Diners)</span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5">
                Where Culinary <span className="italic font-normal text-gold-300">Artistry</span> Meets Distinction
              </h1>
              
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Savor seasonal biodynamic ingredients, binchotan-charred A5 Miyazaki Wagyu, and master sommelier pairings in an atmosphere of refined warmth.
              </p>
            </div>

            {/* Content Bottom CTA Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3.5 mt-8 sm:mt-10">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs sm:text-sm shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Artisanal Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-tasting-btn"
                onClick={onExploreTasting}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm border border-white/15 hover:border-gold-400/50 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Autumn Tasting (7-Course)</span>
              </button>
            </div>
          </div>

          {/* Side Feature Bento Box (4 cols): Sommelier & Chef Highlight */}
          <div className="lg:col-span-4 rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase font-bold tracking-widest text-gold-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-gold-500" />
                  Signature Feature
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 font-mono text-xs font-bold">
                  $210 Tasting
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-40 mb-4 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
                  alt="A5 Miyazaki Wagyu Course"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                  <span className="text-xs font-bold text-white">A5 Miyazaki Wagyu Course</span>
                  <span className="text-[10px] text-zinc-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">Course 5 of 7</span>
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-1.5">
                Executive Chef Julian Vance
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                "Each plate honors raw culinary terroir, transforming micro-seasonal harvests into unforgettable sensory moments."
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Wine className="w-4 h-4 text-gold-400" />
                <span>Cellar Reserve Pairing Available</span>
              </div>
              <button
                onClick={onExploreTasting}
                className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bento Box: Live Table Availability & Instant Booking Bar (12 cols) */}
        <div 
          id="hero-quick-book-card"
          className="w-full rounded-3xl bg-[#141417] border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-zinc-800/80 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gold-400">
                Instant Table Reservation System
              </span>
            </div>
            <span className="text-xs text-zinc-400">
              Guaranteed seating • Instant SMS & email confirmation
            </span>
          </div>

          <form onSubmit={handleQuickReservationSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end">
            
            {/* Date selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                Dining Date
              </label>
              <input
                type="date"
                id="quick-book-date"
                min={todayStr}
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="w-full bg-[#1c1c20] border border-zinc-700/70 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>

            {/* Time selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                Service Time Slot
              </label>
              <select
                id="quick-book-time"
                value={quickTime}
                onChange={(e) => setQuickTime(e.target.value)}
                className="w-full bg-[#1c1c20] border border-zinc-700/70 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              >
                <optgroup label="Lunch Service">
                  <option value="12:00">12:00 PM (Lunch Service)</option>
                  <option value="12:30">12:30 PM (Lunch Service)</option>
                  <option value="13:00">1:00 PM (Lunch Service)</option>
                  <option value="13:30">1:30 PM (Lunch Service)</option>
                </optgroup>
                <optgroup label="Prime Dinner Service">
                  <option value="17:30">5:30 PM (Early Dinner)</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM (Prime Hour)</option>
                  <option value="19:30">7:30 PM (Prime Hour)</option>
                  <option value="20:00">8:00 PM (Prime Hour)</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM (Late Dining)</option>
                </optgroup>
              </select>
            </div>

            {/* Guests selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                Party Size
              </label>
              <select
                id="quick-book-guests"
                value={quickGuests}
                onChange={(e) => setQuickGuests(Number(e.target.value))}
                className="w-full bg-[#1c1c20] border border-zinc-700/70 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              >
                <option value={1}>1 Guest (Chef's Counter Solo)</option>
                <option value={2}>2 Guests (Intimate Table for 2)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Standard Table)</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6 Guests (Spacious Booth)</option>
                <option value={8}>8 Guests (Private Dining)</option>
                <option value={10}>10+ Guests (Celebration Event)</option>
              </select>
            </div>

            {/* Find Table Submit Button */}
            <div>
              <button
                type="submit"
                id="quick-book-submit-btn"
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold py-2.5 px-4 rounded-2xl text-xs sm:text-sm shadow-md shadow-gold-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick atmosphere links */}
          <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
            <span className="text-zinc-500 font-medium">Atmosphere Area:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setQuickArea('main-hall')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  quickArea === 'main-hall' ? 'bg-gold-500 text-black font-bold shadow-sm' : 'bg-[#1e1e24] text-zinc-300 hover:text-white border border-white/5'
                }`}
              >
                Grand Hall
              </button>
              <button
                type="button"
                onClick={() => setQuickArea('garden-terrace')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  quickArea === 'garden-terrace' ? 'bg-gold-500 text-black font-bold shadow-sm' : 'bg-[#1e1e24] text-zinc-300 hover:text-white border border-white/5'
                }`}
              >
                Garden Terrace
              </button>
              <button
                type="button"
                onClick={() => setQuickArea('wine-vault')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  quickArea === 'wine-vault' ? 'bg-gold-500 text-black font-bold shadow-sm' : 'bg-[#1e1e24] text-zinc-300 hover:text-white border border-white/5'
                }`}
              >
                Wine Vault
              </button>
              <button
                type="button"
                onClick={() => setQuickArea('chef-counter')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  quickArea === 'chef-counter' ? 'bg-gold-500 text-black font-bold shadow-sm' : 'bg-[#1e1e24] text-zinc-300 hover:text-white border border-white/5'
                }`}
              >
                Chef's Counter
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

