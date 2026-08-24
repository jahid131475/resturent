import React from 'react';
import { 
  Sparkles, 
  Wine, 
  Award, 
  Leaf, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';
import { CHEF_HIGHLIGHTS } from '../data/restaurantData';

interface ChefSpecialsProps {
  onReserveTasting: () => void;
}

export const ChefSpecials: React.FC<ChefSpecialsProps> = ({ onReserveTasting }) => {
  const tastingCourses = [
    {
      course: 'Course I',
      name: 'Amuse-Bouche & Petrossian Caviar Tartlet',
      description: 'Crispy buckwheat croustade, smoked crème fraîche, chive pollen',
      pairing: '2015 Dom Pérignon Brut Champagne'
    },
    {
      course: 'Course II',
      name: 'Torched Hamachi Crudo & Finger Lime',
      description: 'White ponzu, compressed green apple, shiso oil, sea salt pearls',
      pairing: '2022 Sancerre Domaine Vacheron'
    },
    {
      course: 'Course III',
      name: 'Wild Forest Morel & Truffle Agnolotti',
      description: 'Handcrafted yolk pasta, 36-month vacche rosse parmigiano foam',
      pairing: '2020 Meursault Clos des Perrières'
    },
    {
      course: 'Course IV',
      name: 'Chilean Sea Bass Glacier in Saikyo Miso',
      description: 'Charred baby bok choy, ginger dashi broth, crispy lotus root',
      pairing: '2021 Chablis Grand Cru Les Clos'
    },
    {
      course: 'Course V',
      name: 'A5 Miyazaki Wagyu Ribeye & Bone Marrow Confit',
      description: 'Binchotan embers, fermented black garlic reduction, parsnip cloud',
      pairing: '2018 Opus One Napa Valley Red'
    },
    {
      course: 'Course VI',
      name: 'Pre-Dessert Yuzu & Elderflower Sorbet',
      description: 'Champagne granita, candied mint, finger lime pearls',
      pairing: 'Moscato d’Asti Vietti'
    },
    {
      course: 'Course VII',
      name: 'Valrhona 70% Dark Chocolate Grand Cru Sphere',
      description: 'Warm salted caramel pour-over, hazelnut feuillantine, bourbon gelato',
      pairing: '20-Year Tawny Port Taylor Fladgate'
    }
  ];

  return (
    <section id="chef-specials" className="py-20 sm:py-28 bg-[#0a0a0c] relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chef Bio Header Bento Card */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Chef Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={CHEF_HIGHLIGHTS.image}
                  alt={CHEF_HIGHLIGHTS.name}
                  className="w-full h-[380px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-semibold inline-flex items-center gap-1.5 mb-1 shadow-lg">
                    <Award className="w-3.5 h-3.5 text-gold-400" />
                    <span>{CHEF_HIGHLIGHTS.pedigree}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef Information */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Culinary Leadership
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {CHEF_HIGHLIGHTS.name}
              </h2>

              <p className="text-gold-300 text-sm font-semibold">
                {CHEF_HIGHLIGHTS.title}
              </p>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {CHEF_HIGHLIGHTS.bio}
              </p>

              <blockquote className="border-l-2 border-gold-500 pl-4 py-1 italic text-gold-200/90 text-sm sm:text-base font-display">
                {CHEF_HIGHLIGHTS.quote}
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Leaf className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Biodynamic</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Wine className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Grand Cru Cellar</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Seasonal Micro-Harvests</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The 7-Course Autumn Tasting Menu Feature (Bento Compartment) */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-zinc-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-gold-400 mb-2">
                <Compass className="w-4 h-4" />
                Special Gastronomic Experience
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
                Autumn 7-Course Symphony Tasting Menu
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 max-w-xl">
                A multi-sensory culinary journey curated nightly by Chef Vance. Available at the Main Dining Hall and Chef's Omakase Counter.
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">Tasting Experience</span>
                <span className="font-display text-3xl font-bold text-gold-300">$185 <span className="text-xs text-zinc-400 font-sans font-normal">/ guest</span></span>
              </div>
              <div className="text-xs text-purple-300 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full">
                Optional Grand Cru Wine Flight: +$95
              </div>
            </div>
          </div>

          {/* Courses Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {tastingCourses.map((c, index) => (
              <div 
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-[#18181c] border border-zinc-800/80 hover:border-gold-500/40 transition-colors text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    {c.course}
                  </span>
                  <span className="text-[10px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded-md">
                    Course {index + 1} of 7
                  </span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-white mb-1">
                  {c.name}
                </h4>
                <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                  {c.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-purple-300 bg-purple-950/30 px-2.5 py-1 rounded-xl">
                  <Wine className="w-3 h-3 text-purple-400 flex-shrink-0" />
                  <span className="truncate">Sommelier: {c.pairing}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Book Tasting CTA Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#18181c] border border-gold-500/30">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-6 h-6 text-gold-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Limited to 24 Seatings Per Evening</h4>
                <p className="text-xs text-zinc-400">Dietary modifications accommodate pescatarian and vegetarian with 24-hr advance notice.</p>
              </div>
            </div>

            <button
              onClick={onReserveTasting}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs sm:text-sm shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Reserve Tasting Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
