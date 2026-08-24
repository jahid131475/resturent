import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Check, 
  Bike, 
  Store, 
  CreditCard,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(18);
  
  // Checkout modal simulation state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTrackingStep, setOrderTrackingStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableTotal = subtotal - discountAmount;
  const tax = taxableTotal * 0.085; // 8.5% SF tax
  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const tipAmount = (taxableTotal * tipPercent) / 100;
  const grandTotal = taxableTotal + tax + deliveryFee + tipAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'SAVORIA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP Discount applied!');
    } else if (code === 'CHEFVIP' || code === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoSuccess('15% Chef Welcome Discount applied!');
    } else {
      setPromoError('Invalid promo code. Try "SAVORIA10" or "CHEFVIP".');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setOrderPlaced(true);
    setOrderTrackingStep(1);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#c89d56', '#dfb772', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    // Simulate real-time kitchen progress
    setTimeout(() => setOrderTrackingStep(2), 3000);
    setTimeout(() => setOrderTrackingStep(3), 6500);
    setTimeout(() => setOrderTrackingStep(4), 10000);
  };

  const handleResetAndClose = () => {
    setOrderPlaced(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-lg bg-[#0c0c0e] border-l border-white/10 h-full flex flex-col shadow-2xl text-left overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Your Culinary Bag</h3>
              <span className="text-xs text-zinc-400">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {isCheckingOut ? (
          /* Checkout & Kitchen Status View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderPlaced ? (
              /* Live Kitchen Progress View */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block mb-1">
                    Order #SAV-{Math.floor(1000 + Math.random() * 9000)} Placed
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Thank You, {customerName}!
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    Estimated ready time: <span className="text-gold-300 font-semibold">25–35 minutes</span>
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="p-5 rounded-3xl bg-[#121214] border border-white/10 text-left space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    Live Kitchen Progress
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        orderTrackingStep >= 1 ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        ✓
                      </div>
                      <div className={orderTrackingStep >= 1 ? 'text-white font-medium' : 'text-zinc-500'}>
                        Order Received & Sent to Kitchen Station
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        orderTrackingStep >= 2 ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {orderTrackingStep >= 2 ? '✓' : '2'}
                      </div>
                      <div className={orderTrackingStep >= 2 ? 'text-white font-medium' : 'text-zinc-500'}>
                        Chef Vance Preparing Fresh Course
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        orderTrackingStep >= 3 ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {orderTrackingStep >= 3 ? '✓' : '3'}
                      </div>
                      <div className={orderTrackingStep >= 3 ? 'text-white font-medium' : 'text-zinc-500'}>
                        Artisanal Packaging & Temperature Seal
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        orderTrackingStep >= 4 ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {orderTrackingStep >= 4 ? '✓' : '4'}
                      </div>
                      <div className={orderTrackingStep >= 4 ? 'text-white font-medium' : 'text-zinc-500'}>
                        {orderType === 'pickup' ? 'Ready for Counter Pickup' : 'Courier En Route with Thermal Box'}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-lg shadow-gold-500/20 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h4 className="font-display text-lg font-bold text-white">Contact & Delivery</h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-gold-400 hover:underline cursor-pointer"
                  >
                    Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (415) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="120 Montgomery St, Apt 4B, San Francisco"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Order Amount:</span>
                    <span className="text-white font-semibold">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Method:</span>
                    <span className="text-gold-300 font-semibold capitalize">{orderType}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pay at counter / contactless mobile terminal</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-order-checkout-btn"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-xl shadow-gold-500/20 cursor-pointer"
                >
                  Place Order (${grandTotal.toFixed(2)})
                </button>
              </form>
            )}
          </div>
        ) : cart.length === 0 ? (
          /* Empty Bag State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#121214] border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="font-display text-lg font-bold text-white mb-1">Your Bag is Empty</h4>
            <p className="text-zinc-400 text-xs max-w-xs mb-6">
              Explore our artisanal dishes and signature pairings to craft your dining experience.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-semibold text-xs transition-colors cursor-pointer"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Cart Items Listing & Calculation */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Pickup / Delivery Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#121214] border border-white/10 rounded-2xl">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  orderType === 'pickup' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-md shadow-gold-500/20 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Curbside Pickup (Free)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  orderType === 'delivery' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-md shadow-gold-500/20 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>White-Glove Delivery ($5.99)</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#121214] border border-white/10 flex items-center gap-3.5"
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold text-white truncate">
                      {item.dish.name}
                    </h4>
                    <span className="text-xs text-gold-300 font-semibold block mb-1">
                      ${(item.dish.price * item.quantity).toFixed(2)}
                    </span>
                    {item.specialInstructions && (
                      <p className="text-[10px] text-zinc-400 italic truncate">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#18181c] border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-zinc-300 hover:bg-white/10 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-zinc-300 hover:bg-white/10 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Promo Code (SAVORIA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl pl-9 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl bg-[#18181c] border border-white/10 hover:bg-gold-500 hover:text-black text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <p className="text-[11px] text-emerald-400 font-medium">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-rose-400 font-medium">{promoError}</p>}
            </form>

            {/* Tip Selection */}
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                Culinary Service Gratuity
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipPercent(t)}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      tipPercent === t ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold shadow-md shadow-gold-500/20' : 'bg-[#18181c] border border-white/10 text-zinc-300'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Tax (8.5%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-zinc-400">
                  <span>White-Glove Delivery</span>
                  <span className="text-white">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Gratuity ({tipPercent}%)</span>
                <span className="text-white">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                <span>Total Due</span>
                <span className="text-gold-300 font-display text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}

        {/* Footer Checkout Trigger */}
        {!isCheckingOut && cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#121214]">
            <button
              id="proceed-to-checkout-btn"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-xl shadow-gold-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
