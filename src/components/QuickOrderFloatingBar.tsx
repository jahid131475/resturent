import React from 'react';
import { ShoppingBag, CalendarDays, Sparkles, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface QuickOrderFloatingBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAI: () => void;
}

export const QuickOrderFloatingBar: React.FC<QuickOrderFloatingBarProps> = ({
  cart,
  onOpenCart,
  onOpenReservation,
  onOpenAI,
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <div 
      id="floating-quick-bar"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-30 flex items-center justify-between sm:justify-end gap-2.5 bg-[#121214]/95 backdrop-blur-xl border border-white/10 p-2 sm:p-2.5 rounded-full shadow-2xl shadow-black/90 max-w-lg mx-auto sm:mx-0 animate-in slide-in-from-bottom-4 duration-300"
    >
      {/* AI Sommelier trigger */}
      <button
        onClick={onOpenAI}
        className="p-2.5 rounded-full bg-[#18181c] text-gold-300 hover:text-white hover:bg-gold-500/20 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        title="AI Sommelier & Pairings"
      >
        <Sparkles className="w-4 h-4 text-gold-400" />
        <span className="hidden sm:inline">Sommelier</span>
      </button>

      {/* Table Reservation Button */}
      <button
        onClick={onOpenReservation}
        className="px-4 py-2.5 rounded-full bg-[#18181c] hover:bg-[#222226] text-zinc-200 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
        <span>Book Table</span>
      </button>

      {/* Order Bag Button */}
      <button
        onClick={onOpenCart}
        className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
          totalCartCount > 0
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black shadow-lg shadow-gold-500/20 scale-105'
            : 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black shadow-md shadow-gold-500/10'
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        {totalCartCount > 0 ? (
          <span>Bag ({totalCartCount}) • ${cartSubtotal.toFixed(0)}</span>
        ) : (
          <span>Order Online</span>
        )}
      </button>
    </div>
  );
};
