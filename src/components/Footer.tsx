import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Send, 
  Check, 
  Award,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp
} from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Bento Card */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-8 sm:p-10 mb-14 shadow-2xl text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Savoria Cellar Club
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Receive Exclusive Harvest & Tasting Previews
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Join our private gastronomy circle. Enjoy invitation-only seasonal menu launches, rare vintage releases, and a complimentary welcome toast.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  <span>{subscribed ? 'Welcome to the Club!' : 'Subscribe'}</span>
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                  ✓ Welcome voucher sent to your inbox. Present on your next dinner reservation!
                </p>
              )}
            </div>

          </div>
        </div>

        {/* 4 Columns Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-left">
          
          {/* Brand & Awards */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold shadow-md shadow-gold-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-wide">
                SAVORIA
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Artisanal French-California fine dining featuring binchotan flame, farm-to-table harvests, and rare sommelier reserves.
            </p>
            <div className="space-y-1.5 text-[11px] text-gold-300">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Michelin Guide Selected 2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Wine Spectator Grand Award</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#menu" className="hover:text-gold-400 transition-colors">Artisanal Dinner Menu</a></li>
              <li><a href="#chef-specials" className="hover:text-gold-400 transition-colors">Chef's Autumn Tasting (7-Course)</a></li>
              <li><a href="#reservations" className="hover:text-gold-400 transition-colors">Reserve a Table</a></li>
              <li><a href="#about" className="hover:text-gold-400 transition-colors">Our Story & Sourcing</a></li>
              <li><a href="#gallery" className="hover:text-gold-400 transition-colors">Photo Gallery & Ambiance</a></li>
              <li><a href="#location" className="hover:text-gold-400 transition-colors">Private Events & Inquiries</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact & Address
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>742 Grand Avenue, Waterfront Promenade, San Francisco, CA 94111</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+14158903400" className="hover:text-gold-400 transition-colors">+1 (415) 890-3400</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:reservations@savoriabistro.com" className="hover:text-gold-400 transition-colors">reservations@savoriabistro.com</a>
              </div>
            </div>
          </div>

          {/* Service Hours Summary */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Dinner Service
            </h4>
            <div className="space-y-2 text-zinc-400">
              <p><strong className="text-white">Mon – Thu:</strong> 5:00 PM – 10:30 PM</p>
              <p><strong className="text-white">Fri – Sat:</strong> 5:00 PM – 11:30 PM</p>
              <p><strong className="text-white">Sun Brunch:</strong> 10:30 AM – 3:00 PM</p>
              <p><strong className="text-white">Cocktail Lounge:</strong> Open till late</p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Savoria Bistro & Lounge. All rights reserved. Crafted with passion.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#121214] border border-white/10 hover:text-gold-400 hover:border-gold-500/40 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
