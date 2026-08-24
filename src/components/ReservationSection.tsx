import React, { useState } from 'react';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Wine, 
  Heart, 
  Briefcase, 
  PartyPopper,
  Calendar,
  Download,
  Share2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SeatingArea, Reservation } from '../types';
import { SEATING_AREAS } from '../data/restaurantData';

interface ReservationSectionProps {
  initialDate?: string;
  initialTime?: string;
  initialGuests?: number;
  initialArea?: SeatingArea;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  initialDate,
  initialTime,
  initialGuests = 2,
  initialArea = 'main-hall',
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>(initialDate || todayStr);
  const [time, setTime] = useState<string>(initialTime || '19:00');
  const [guests, setGuests] = useState<number>(initialGuests);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>(initialArea);
  const [occasion, setOccasion] = useState<'none' | 'birthday' | 'anniversary' | 'business' | 'date-night' | 'celebration'>('none');
  
  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const lunchSlots = [
    { time: '12:00', label: '12:00 PM', available: true },
    { time: '12:30', label: '12:30 PM', available: true },
    { time: '13:00', label: '1:00 PM', available: true },
    { time: '13:30', label: '1:30 PM', available: true },
  ];

  const dinnerSlots = [
    { time: '17:30', label: '5:30 PM', tag: 'Early' },
    { time: '18:00', label: '6:00 PM' },
    { time: '18:30', label: '6:30 PM', tag: 'Few Seats' },
    { time: '19:00', label: '7:00 PM', tag: 'Prime' },
    { time: '19:30', label: '7:30 PM', tag: 'Prime' },
    { time: '20:00', label: '8:00 PM', tag: 'Prime' },
    { time: '20:30', label: '8:30 PM' },
    { time: '21:00', label: '9:00 PM', tag: 'Late Night' },
  ];

  const occasionOptions = [
    { id: 'none', label: 'Casual / Standard Dining', icon: Sparkles },
    { id: 'date-night', label: 'Romantic Date Night', icon: Heart },
    { id: 'birthday', label: 'Birthday Celebration', icon: PartyPopper },
    { id: 'anniversary', label: 'Anniversary Special', icon: Wine },
    { id: 'business', label: 'Business Dinner', icon: Briefcase },
  ];

  const handleCompleteReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      guestName,
      email: guestEmail,
      phone: guestPhone,
      date,
      time,
      guests,
      seatingArea,
      occasion,
      specialRequests,
      status: 'confirmed',
      reservationCode: `SAV-${randomNum}`,
      createdAt: new Date().toISOString()
    };

    setConfirmedReservation(newReservation);
    setStep(4);

    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c89d56', '#dfb772', '#ffffff', '#ffd700']
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setStep(1);
  };

  const selectedAreaObj = SEATING_AREAS.find(a => a.id === seatingArea) || SEATING_AREAS[0];

  return (
    <section id="reservations" className="py-20 sm:py-28 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            Table Reservations
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Reserve Your Culinary Journey
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your preferred dining room atmosphere, party size, and schedule. Instant reservation confirmation with no deposit required.
          </p>
        </div>

        {/* Bento Reservation Card Container */}
        <div className="max-w-4xl mx-auto bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Confirmed Screen */}
          {confirmedReservation ? (
            <div id="reservation-confirmation-view" className="text-center py-6 animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                We Look Forward to Hosting You, {confirmedReservation.guestName}!
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-8">
                A confirmation SMS & calendar invite has been sent to <span className="text-gold-300 font-medium">{confirmedReservation.email}</span>.
              </p>

              {/* Digital Voucher Pass Bento Card */}
              <div className="max-w-md mx-auto bg-[#18181c] border border-white/10 rounded-2xl p-6 text-left shadow-2xl mb-8 relative">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Reservation Code</span>
                    <span className="font-display text-2xl font-bold text-gold-400">{confirmedReservation.reservationCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Status</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <Check className="w-3 h-3" /> Guaranteed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Date</span>
                    <span className="text-white font-semibold">{confirmedReservation.date}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Time</span>
                    <span className="text-white font-semibold">{confirmedReservation.time}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Party Size</span>
                    <span className="text-white font-semibold">{confirmedReservation.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Seating Room</span>
                    <span className="text-gold-300 font-semibold">{selectedAreaObj.name}</span>
                  </div>
                </div>

                {confirmedReservation.occasion !== 'none' && (
                  <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-300 mb-3">
                    <span className="text-gold-400 font-medium">Occasion:</span> {confirmedReservation.occasion.replace('-', ' ')}
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Smart Elegant Dress Code</span>
                  <span>Complimentary Valet</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const text = `Savoria Reservation: ${confirmedReservation.date} at ${confirmedReservation.time} (${confirmedReservation.guests} guests). Ref: ${confirmedReservation.reservationCode}`;
                    navigator.clipboard?.writeText(text);
                    alert('Reservation summary copied to clipboard!');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1a1e] border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-gold-400" />
                  Copy Pass Details
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold transition-all cursor-pointer shadow-lg shadow-gold-500/20"
                >
                  Book Another Table
                </button>
              </div>

            </div>
          ) : (
            /* Multi-step Booking wizard */
            <div>
              
              {/* Step indicator breadcrumbs */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-8">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${step >= 1 ? 'text-gold-400' : 'text-zinc-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-gold-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      1
                    </span>
                    <span className="hidden sm:inline">Date & Party</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${step >= 2 ? 'text-gold-400' : 'text-zinc-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-gold-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      2
                    </span>
                    <span className="hidden sm:inline">Time & Atmosphere</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${step >= 3 ? 'text-gold-400' : 'text-zinc-500'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-gold-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                      3
                    </span>
                    <span className="hidden sm:inline">Guest Details</span>
                  </div>
                </div>

                <span className="text-xs text-zinc-400 hidden md:inline-block font-medium">
                  Step {step} of 3
                </span>
              </div>

              {/* STEP 1: Date & Party Size */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Select Number of Guests
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          id={`guests-btn-${num}`}
                          onClick={() => setGuests(num)}
                          className={`py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                            guests === num
                              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-lg shadow-gold-500/20 scale-105'
                              : 'bg-[#18181c] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-[#222228]'
                          }`}
                        >
                          {num} {num === 10 ? '+' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Choose Reservation Date
                    </label>
                    <input
                      type="date"
                      id="reservation-date-input"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-gold-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-lg shadow-gold-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Continue to Time & Room</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Time Slot & Atmosphere */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Time Slots */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Select Dining Time Slot ({date})
                    </label>
                    
                    <div className="mb-5">
                      <span className="text-xs text-zinc-400 block mb-2.5 font-medium">Prime Dinner Service</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {dinnerSlots.map((s) => (
                          <button
                            key={s.time}
                            type="button"
                            onClick={() => setTime(s.time)}
                            className={`p-3 rounded-2xl text-left transition-all relative cursor-pointer ${
                              time === s.time
                                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/20'
                                : 'bg-[#18181c] border border-zinc-800 text-zinc-200 hover:border-gold-400/50'
                            }`}
                          >
                            <span className="text-sm font-semibold block">{s.label}</span>
                            {s.tag && (
                              <span className={`text-[9px] uppercase tracking-wider block mt-0.5 font-bold ${
                                time === s.time ? 'text-black/80' : 'text-gold-400'
                              }`}>
                                {s.tag}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-400 block mb-2.5 font-medium">Lunch Service</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {lunchSlots.map((s) => (
                          <button
                            key={s.time}
                            type="button"
                            onClick={() => setTime(s.time)}
                            className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                              time === s.time
                                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/20'
                                : 'bg-[#18181c] border border-zinc-800 text-zinc-200 hover:border-gold-400/50'
                            }`}
                          >
                            <span className="text-sm font-semibold block">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seating Area Selection */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Select Seating Atmosphere
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SEATING_AREAS.map((area) => (
                        <div
                          key={area.id}
                          onClick={() => setSeatingArea(area.id)}
                          className={`rounded-2xl overflow-hidden border p-4 cursor-pointer transition-all ${
                            seatingArea === area.id
                              ? 'bg-[#202026] border-gold-400 shadow-lg shadow-gold-500/10 scale-[1.01]'
                              : 'bg-[#18181c] border-zinc-800 hover:border-zinc-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-display text-base font-bold text-white">{area.name}</h4>
                            <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/30">
                              {area.vibe}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-2 mb-2">{area.description}</p>
                          <span className="text-[11px] text-zinc-500 font-medium">{area.capacityBadge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Back & Next Navigation */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-2xl bg-[#18181c] border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-lg shadow-gold-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Continue to Guest Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Guest Details & Occasion */}
              {step === 3 && (
                <form onSubmit={handleCompleteReservation} className="space-y-6 animate-in fade-in duration-200">
                  
                  {/* Reservation Summary Strip */}
                  <div className="p-4 rounded-2xl bg-[#18181c] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 block">Booking For</span>
                      <span className="text-white font-semibold">{guests} Guests • {date} at {time}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Seating Area</span>
                      <span className="text-gold-300 font-semibold">{selectedAreaObj.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-gold-400 underline hover:text-gold-300 cursor-pointer"
                    >
                      Modify
                    </button>
                  </div>

                  {/* Occasion picker */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gold-400 mb-2">
                      Dining Occasion (Optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {occasionOptions.map((occ) => {
                        const Icon = occ.icon;
                        return (
                          <button
                            key={occ.id}
                            type="button"
                            onClick={() => setOccasion(occ.id as any)}
                            className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                              occasion === occ.id
                                ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50 font-semibold'
                                : 'bg-[#18181c] border border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-gold-400" />
                            <span className="truncate">{occ.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Eleanor Vance"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-400" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (415) 000-0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gold-400" />
                      Email Address (for confirmation pass) *
                    </label>
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                      required
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Special Dietary Restrictions or Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., severe shellfish allergy, anniversary dessert candle, quiet corner preferred..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-2xl bg-[#18181c] border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      id="confirm-reservation-btn"
                      className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm Table Reservation</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
