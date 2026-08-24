import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Plus, 
  Check, 
  Wine, 
  Star, 
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  List,
  Utensils,
  Leaf
} from 'lucide-react';
import { Dish, DishCategory, DietaryPreference } from '../types';
import { DISHES } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectDish: (dish: Dish) => void;
  onQuickAddToCart: (dish: Dish) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onQuickAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedDishIds, setAddedDishIds] = useState<Record<string, boolean>>({});

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Courses' },
    { id: 'starters', label: 'Artisanal Starters' },
    { id: 'steaks', label: 'Prime Steaks & Grills' },
    { id: 'pasta', label: 'Handcrafted Pasta' },
    { id: 'seafood', label: 'Coastal Seafood' },
    { id: 'mains', label: 'Signature Mains' },
    { id: 'desserts', label: 'Dolci & Desserts' },
    { id: 'cocktails', label: 'Craft Cocktails' },
    { id: 'wines', label: 'Sommelier Cellar' },
  ];

  const dietaryOptions: { id: string; label: string }[] = [
    { id: 'all', label: 'All Dietaries' },
    { id: 'chef-special', label: "Chef's Signature" },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'halal', label: 'Halal Sourced' },
  ];

  const handleQuickAdd = (e: React.MouseEvent, dish: Dish) => {
    e.stopPropagation();
    onQuickAddToCart(dish);
    setAddedDishIds(prev => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedDishIds(prev => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const filteredDishes = useMemo(() => {
    return DISHES.filter(dish => {
      // Category match
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Dietary match
      if (selectedDietary === 'chef-special' && !dish.isChefSpecial) {
        return false;
      } else if (selectedDietary !== 'all' && selectedDietary !== 'chef-special') {
        if (!dish.dietary.includes(selectedDietary as DietaryPreference)) {
          return false;
        }
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesIng = dish.ingredients.some(ing => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      if (a.isChefSpecial && !b.isChefSpecial) return -1;
      if (!a.isChefSpecial && b.isChefSpecial) return 1;
      return 0;
    });
  }, [selectedCategory, selectedDietary, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            The Culinary Collection
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Artisanal Dining & Pairings
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every creation is prepared à la minute with biodynamic seasonal harvests, heirloom grains, and rare cellar reserves.
          </p>
        </div>

        {/* Category Bento Pill Dock */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-6 gap-1.5 no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 p-1.5 bg-[#141414] rounded-2xl border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-md shadow-gold-500/20 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Filter Toolbar: Search, Dietary Filters, Sort, Grid/List view */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-4 sm:p-5 mb-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dish, ingredients (e.g., Wagyu, Truffle, Caviar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-zinc-700/60 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary filter dropdown / pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs text-zinc-500 flex items-center gap-1 hidden sm:flex font-medium">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                Dietary:
              </span>
              <div className="flex gap-1.5 flex-nowrap">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedDietary(opt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedDietary === opt.id
                        ? 'bg-gold-500 text-black font-bold shadow-sm'
                        : 'bg-[#1a1a1e] text-zinc-400 hover:text-zinc-200 border border-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Toggle */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#1a1a1e] border border-zinc-700/60 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="featured">Featured Chef Picks</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <div className="flex items-center bg-[#1a1a1e] border border-zinc-700/60 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-gold-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-gold-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                  aria-label="List layout"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Dishes Listing */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#121214] rounded-3xl border border-white/10 p-8">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-white mb-1">No Dishes Found</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-4">
              We couldn't find any dishes matching your current filter criteria. Try adjusting your search query or selecting a different dietary filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-gold-500 text-black font-semibold text-xs hover:bg-gold-400 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Layout (Bento Dish Cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const isAdded = !!addedDishIds[dish.id];
              return (
                <div
                  key={dish.id}
                  id={`dish-card-${dish.id}`}
                  onClick={() => onSelectDish(dish)}
                  className="group bg-[#121214] border border-white/10 hover:border-gold-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image Frame */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      {dish.isChefSpecial && (
                        <span className="px-2.5 py-1 rounded-full bg-gold-500 text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          Chef Pick
                        </span>
                      )}
                      {dish.spicyLevel && dish.spicyLevel > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 font-medium text-[11px] flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-red-400" />
                          Spicy
                        </span>
                      ) : null}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-gold-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <span>{dish.rating}</span>
                    </div>

                    {/* Price tag over image */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-gold-300 font-display text-lg font-bold">
                      ${dish.price}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] text-gold-400 font-bold uppercase tracking-wider">
                          {dish.servingSize || dish.category}
                        </span>
                        {dish.dietary.slice(0, 2).map((d) => (
                          <span key={d} className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md capitalize border border-white/5">
                            {d.replace('-', ' ')}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors mb-2">
                        {dish.name}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                        {dish.description}
                      </p>

                      {/* Wine Pairing Pill */}
                      {dish.winePairing && (
                        <div className="mb-4 text-[11px] text-purple-300 bg-purple-950/30 border border-purple-800/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                          <Wine className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                          <span className="truncate">Pair with: {dish.winePairing}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                      <span className="text-xs text-zinc-400 font-medium group-hover:text-gold-400 transition-colors">
                        Details & Recipe Info →
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, dish)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAdded 
                            ? 'bg-emerald-500 text-black' 
                            : 'bg-[#1c1c20] hover:bg-gold-500 text-zinc-200 hover:text-black border border-white/10 hover:border-gold-400'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="space-y-4">
            {filteredDishes.map((dish) => {
              const isAdded = !!addedDishIds[dish.id];
              return (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group bg-[#121214] border border-white/10 hover:border-gold-500/40 rounded-3xl p-4 sm:p-5 shadow-lg transition-all flex flex-col sm:flex-row items-center gap-5 cursor-pointer"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full sm:w-36 h-36 rounded-2xl object-cover"
                  />
                  <div className="flex-1 w-full text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-gold-300">
                          {dish.name}
                        </h3>
                        {dish.isChefSpecial && (
                          <span className="px-2 py-0.5 rounded-full bg-gold-500 text-black text-[10px] font-bold uppercase">
                            Chef Pick
                          </span>
                        )}
                      </div>
                      <span className="font-display text-xl font-bold text-gold-300">
                        ${dish.price}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm mb-3 line-clamp-2">
                      {dish.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-gold-400">
                          <Star className="w-3.5 h-3.5 fill-gold-400" />
                          {dish.rating} ({dish.reviewsCount})
                        </span>
                        {dish.winePairing && (
                          <span className="text-purple-300 flex items-center gap-1 hidden md:inline-flex">
                            <Wine className="w-3.5 h-3.5" />
                            {dish.winePairing}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, dish)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isAdded 
                            ? 'bg-emerald-500 text-black' 
                            : 'bg-gold-500 hover:bg-gold-400 text-black'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isAdded ? 'Added' : 'Add to Order'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
