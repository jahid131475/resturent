import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Wine, 
  Flame, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { Dish, CartItem } from '../types';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, instructions?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity, specialInstructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      id="dish-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="dish-detail-modal-card"
        className="relative w-full max-w-2xl bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-colors border border-white/20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/40" />

          {/* Top Badges */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            {dish.isChefSpecial && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Chef’s Signature
              </span>
            )}
            {dish.dietary.map((d) => (
              <span 
                key={d}
                className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-zinc-200 text-xs capitalize font-medium"
              >
                {d.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Price Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                {dish.name}
              </h3>
              <p className="text-xs text-gold-400 font-medium tracking-wide uppercase">
                {dish.servingSize || 'Signature Course'}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gold-300 font-display">
              ${dish.price}
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {dish.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#18181c] rounded-2xl border border-white/5 text-xs">
            {dish.calories && (
              <div className="flex items-center gap-2 text-zinc-300">
                <Flame className="w-4 h-4 text-orange-400" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Calories</span>
                  <span className="font-semibold">{dish.calories} kcal</span>
                </div>
              </div>
            )}
            {dish.prepTime && (
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Est. Prep</span>
                  <span className="font-semibold">{dish.prepTime}</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Rating</span>
                <span className="font-semibold">{dish.rating} ★ ({dish.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-gold-400" />
              Selected Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-xl bg-[#18181c] border border-white/5 text-zinc-300 text-xs"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Sommelier Wine Pairing Recommendation */}
          {dish.winePairing && (
            <div className="p-4 rounded-2xl bg-[#18181c] border border-gold-500/20 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gold-500/10 text-gold-400 mt-0.5">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-gold-400 block">
                  Sommelier’s Recommended Pairing
                </span>
                <p className="text-sm font-medium text-white mt-0.5">
                  {dish.winePairing}
                </p>
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  Complements flavor profiles, balancing richness and aromatic bouquet.
                </span>
              </div>
            </div>
          )}

          {/* Allergens warning if any */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-2xl">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Contains: {dish.allergens.join(', ')}. Please notify server of severe allergies.</span>
            </div>
          )}

          {/* Kitchen Special Instructions */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
              Special Kitchen Requests (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., dressing on the side, extra crispy, sauce modification..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Bottom Quantity & Add to Bag CTA */}
          <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center bg-[#18181c] border border-white/10 rounded-2xl p-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-base font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Add Button */}
            <button
              type="button"
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              disabled={isAdded}
              className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAdded 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black shadow-gold-500/20 hover:scale-[1.01]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Order • ${(dish.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
