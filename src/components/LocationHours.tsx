import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Car, 
  Sparkles, 
  Send, 
  CheckCircle2,
  CalendarDays,
  ShieldAlert
} from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data/restaurantData';

export const LocationHours: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('financial');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const transitData: Record<string, { label: string; driveTime: string; transitTime: string; distance: string; directions: string }> = {
    financial: {
      label: 'Financial District & Embarcadero',
      driveTime: '6 mins',
      transitTime: '12 mins (Muni F-Line)',
      distance: '1.2 miles',
      directions: 'Head North along Embarcadero towards Pier 14. Turn left on Grand Ave; complimentary valet station is situated on the left entrance.'
    },
    unionsquare: {
      label: 'Union Square / Downtown SF',
      driveTime: '9 mins',
      transitTime: '15 mins',
      distance: '1.8 miles',
      directions: 'Take Post St east to Montgomery, turn right onto California St, then connect directly to Grand Ave Promenade.'
    },
    sfo: {
      label: 'San Francisco Int’l Airport (SFO)',
      driveTime: '22 mins',
      transitTime: '38 mins (BART to Embarcadero)',
      distance: '14.5 miles',
      directions: 'Take US-101 North to SF Downtown. Exit at 4th St/Embarcadero and proceed directly along the Waterfront Promenade.'
    },
    wharf: {
      label: 'Fisherman’s Wharf / Marina',
      driveTime: '8 mins',
      transitTime: '14 mins',
      distance: '2.1 miles',
      directions: 'Take Embarcadero South along the scenic bay towards the Bay Bridge. Savoria is at 742 Grand Avenue.'
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 2500);
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            Visit & Contact
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Hours, Location & Private Events
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Located along the Embarcadero waterfront with panoramic bay views and private subterranean cellar dining.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Operating Hours Bento Card */}
          <div className="lg:col-span-6 bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
                <Clock className="w-4 h-4" />
                <span>Service Schedule</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Dining Hours & Lounge
              </h3>

              <div className="space-y-3 mb-6">
                {RESTAURANT_DETAILS.hours.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#18181c] border border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-sm font-bold text-white">
                      <span>{h.day}</span>
                      <span className="text-xs text-gold-400 font-semibold">{h.lounge}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 pt-1">
                      <span>Lunch: <span className="text-zinc-200 font-medium">{h.lunch}</span></span>
                      <span>Dinner: <span className="text-zinc-200 font-medium">{h.dinner}</span></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest Guidelines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-800 text-xs text-zinc-300">
                <div className="p-3 rounded-2xl bg-[#18181c] border border-white/5 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Dress Code</span>
                    <span className="text-zinc-400">Smart elegant / business casual</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#18181c] border border-white/5 flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Valet Parking</span>
                    <span className="text-zinc-400">Complimentary at front entrance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-6 border-t border-zinc-800 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
              <a href="tel:+14158903400" className="flex items-center gap-2 text-zinc-300 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+1 (415) 890-3400</span>
              </a>
              <a href="mailto:reservations@savoriabistro.com" className="flex items-center gap-2 text-zinc-300 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>reservations@savoriabistro.com</span>
              </a>
            </div>
          </div>

          {/* Interactive Directions & Bento Map Card */}
          <div className="lg:col-span-6 bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
                <Navigation className="w-4 h-4" />
                <span>Interactive Route Planner</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Getting to Savoria
              </h3>
              <p className="text-xs text-zinc-400 mb-5">
                {RESTAURANT_DETAILS.address}
              </p>

              {/* Origin selector */}
              <div className="space-y-2.5 mb-5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Select Your Departure Point:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(transitData).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedOrigin(key)}
                      className={`p-2.5 rounded-2xl text-xs font-medium text-left transition-all cursor-pointer ${
                        selectedOrigin === key
                          ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold shadow-md shadow-gold-500/20'
                          : 'bg-[#18181c] text-zinc-300 hover:text-white border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {data.label.split('/')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Route Output Box */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/5 space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gold-300 font-semibold">
                    <Car className="w-4 h-4 text-gold-400" />
                    <span>Drive: {transitData[selectedOrigin].driveTime}</span>
                  </div>
                  <span className="text-zinc-400 text-[11px]">Distance: {transitData[selectedOrigin].distance}</span>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  <span className="text-zinc-500 font-medium block text-[11px] mb-0.5">Recommended Route:</span>
                  {transitData[selectedOrigin].directions}
                </div>
              </div>
            </div>

            {/* Map Visual Frame */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                alt="Map San Francisco Waterfront"
                className="w-full h-full object-cover filter brightness-[0.5] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full bg-gold-500 text-black flex items-center justify-center shadow-2xl animate-bounce">
                  <MapPin className="w-5 h-5 fill-black" />
                </div>
                <span className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-[11px] font-bold text-white border border-gold-500/40 shadow-lg">
                  SAVORIA Bistro
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Private Dining & Inquiries Contact Card */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 text-left shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block">
                Private Events & Buyouts
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Host Your Celebration With Us
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Whether an intimate boardroom dinner in the Sommelier Wine Vault or a 120-guest full restaurant buyout with custom multi-course menus and dedicated sommelier service.
              </p>
              <div className="pt-2 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Personalized tasting menu printing & sommelier pairings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>State-of-the-art audiovisual for corporate presentations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email *"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your event (expected guests, date, preferred room)..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500"
                />

                <button
                  type="submit"
                  disabled={inquirySent}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {inquirySent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Inquiry Received! Our event director will contact you shortly.</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Private Event Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
