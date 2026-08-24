import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Wine, 
  Send, 
  ArrowRight, 
  ShoppingBag, 
  Flame, 
  Heart, 
  Compass, 
  Check, 
  Utensils
} from 'lucide-react';
import { Dish } from '../types';
import { DISHES } from '../data/restaurantData';

interface AICulinaryConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
}

export const AICulinaryConciergeModal: React.FC<AICulinaryConciergeModalProps> = ({
  isOpen,
  onClose,
  onSelectDish,
  onAddToCart,
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [recommendations, setRecommendations] = useState<{
    summary: string;
    suggestedDishes: Dish[];
    wineNote: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const moodPresets = [
    {
      id: 'wagyu-luxury',
      label: 'Decadent & Prime Wagyu',
      query: 'I am looking for the most rich and luxurious beef experience with full-bodied red wine',
      icon: Flame
    },
    {
      id: 'seafood-coastal',
      label: 'Light & Coastal Seafood',
      query: 'I want delicate fresh seafood like scallops or sea bass with crisp mineral white wine',
      icon: Compass
    },
    {
      id: 'pasta-truffle',
      label: 'Truffle & Handcrafted Pasta',
      query: 'I crave authentic homemade pasta with rich black truffle and aged parmigiano',
      icon: Utensils
    },
    {
      id: 'cocktails-dessert',
      label: 'Late Night Mixology & Sweets',
      query: 'I want a handcrafted cocktail and an exquisite grand chocolate dessert to finish the evening',
      icon: Wine
    }
  ];

  const handleGenerateRecommendation = (queryText: string) => {
    setLoading(true);
    setRecommendations(null);

    setTimeout(() => {
      const q = queryText.toLowerCase();
      let matched: Dish[] = [];
      let summaryText = '';
      let wineNoteText = '';

      if (q.includes('wagyu') || q.includes('beef') || q.includes('decadent') || q.includes('steak')) {
        matched = DISHES.filter(d => d.id === 'steak-1' || d.id === 'starter-3' || d.id === 'dessert-1');
        summaryText = "For an opulent culinary experience, Chef Vance recommends commencing with the hand-cut Prime Tartare, followed by our charcoal-charred A5 Miyazaki Wagyu.";
        wineNoteText = "Master Sommelier Pairing: 2018 Opus One Napa Valley Red Blend. The structured tannins slice gracefully through the buttery marbling.";
      } else if (q.includes('seafood') || q.includes('scallop') || q.includes('bass') || q.includes('light') || q.includes('fish')) {
        matched = DISHES.filter(d => d.id === 'starter-1' || d.id === 'seafood-1' || d.id === 'dessert-3');
        summaryText = "A pristine marine journey highlighting sweet Hokkaido king scallops with caviar, transitioning into the miso-glazed Glacier Sea Bass.";
        wineNoteText = "Master Sommelier Pairing: 2021 Chablis Premier Cru or Pouilly-Fumé Baron de L for luminous citrus minerality.";
      } else if (q.includes('pasta') || q.includes('truffle') || q.includes('burrata') || q.includes('comfort')) {
        matched = DISHES.filter(d => d.id === 'starter-2' || d.id === 'pasta-1' || d.id === 'pasta-2');
        summaryText = "Our pasta program utilizes 36 pasture egg yolks rolled daily by hand. The Tagliolini with shaved Norcia black truffles is iconic.";
        wineNoteText = "Master Sommelier Pairing: 2020 Barbaresco Gaja. The earthiness of Nebbiolo harmonizes with the black truffle aromatics.";
      } else {
        matched = DISHES.filter(d => d.isChefSpecial).slice(0, 3);
        summaryText = "Based on your taste profile, we have curated a multi-course progression showcasing our highest-rated signatures.";
        wineNoteText = "Master Sommelier Pairing: 2015 Dom Pérignon Brut Champagne as an exquisite aperitif.";
      }

      setRecommendations({
        summary: summaryText,
        suggestedDishes: matched,
        wineNote: wineNoteText
      });
      setLoading(false);
    }, 700);
  };

  const handleQuickAdd = (dish: Dish) => {
    onAddToCart(dish);
    setAddedIds(prev => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black shadow-lg shadow-gold-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">AI Sommelier & Culinary Concierge</h3>
            <p className="text-xs text-gold-400">Personalized tasting trajectories & wine harmony</p>
          </div>
        </div>

        {/* Mood selection quick pills */}
        <div>
          <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2">
            Choose What You Are Craving Tonight:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {moodPresets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedMood(preset.id);
                    handleGenerateRecommendation(preset.query);
                  }}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMood === preset.id
                      ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-md shadow-gold-500/10'
                      : 'bg-[#18181c] border-white/5 text-zinc-300 hover:text-white hover:border-gold-500/30'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-black/40 text-gold-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom text query */}
        <div>
          <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1.5">
            Or Ask Anything Specific:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 'I am celebrating an anniversary and prefer gluten-free seafood with white wine'..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customPrompt.trim()) {
                  handleGenerateRecommendation(customPrompt);
                }
              }}
              className="flex-1 bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500"
            />
            <button
              onClick={() => {
                if (customPrompt.trim()) handleGenerateRecommendation(customPrompt);
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-gold-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </div>
        </div>

        {/* Recommendations Output */}
        {loading && (
          <div className="py-8 text-center text-zinc-400 space-y-2">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Consulting cellar vintages and kitchen stations...</p>
          </div>
        )}

        {recommendations && (
          <div className="space-y-4 pt-2 border-t border-zinc-800 animate-in fade-in duration-300">
            {/* Narrative summary */}
            <div className="p-4 rounded-2xl bg-[#18181c] border border-white/5">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-2">
                {recommendations.summary}
              </p>
              <div className="flex items-start gap-2 text-xs text-gold-300 bg-gold-500/10 p-2.5 rounded-xl border border-gold-500/20">
                <Wine className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{recommendations.wineNote}</span>
              </div>
            </div>

            {/* Dishes list */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block">
                Recommended Menu Selections:
              </span>
              {recommendations.suggestedDishes.map((dish) => {
                const isAdded = !!addedIds[dish.id];
                return (
                  <div
                    key={dish.id}
                    className="p-3 rounded-2xl bg-[#18181c] border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div 
                      onClick={() => {
                        onSelectDish(dish);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-display text-sm font-bold text-white truncate hover:text-gold-300">
                          {dish.name}
                        </h4>
                        <span className="text-xs text-gold-400 font-semibold">${dish.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(dish)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isAdded 
                          ? 'bg-emerald-500 text-black' 
                          : 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black shadow-sm shadow-gold-500/20'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      <span>{isAdded ? 'Added' : 'Add to Order'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
