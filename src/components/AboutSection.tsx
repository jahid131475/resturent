import React from 'react';
import { 
  Leaf, 
  Wine, 
  Flame, 
  Award, 
  ShieldCheck, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Biodynamic & Local Farms',
      description: 'We partner directly with family-run farms in Sonoma and Napa valleys, receiving daily morning harvests within hours of being picked.'
    },
    {
      icon: Flame,
      title: '45-Day In-House Dry Aging',
      description: 'Our Himalayan salt-brick aging chamber enhances the tender texture and intense nutty depth of our USDA Prime & Japanese Wagyu beef.'
    },
    {
      icon: Wine,
      title: '3,000+ Bottle Cellar',
      description: 'Guided by Master Sommelier Lucile Bernard, our temperature-controlled vault preserves iconic Bordeaux, Super Tuscans, and rare grower Champagnes.'
    },
    {
      icon: HeartHandshake,
      title: 'Zero-Waste Kitchen Craft',
      description: 'From nose-to-tail butchery to composting and heirloom seed preservation, sustainability is embedded in every single dish we serve.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0a0a0c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Bento Card Split */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Text Narrative */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Our Culinary Heritage
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                A Symphony of Heritage, Fire & Passion
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Founded in 2018 along the San Francisco waterfront promenade, Savoria was born from a singular vision: to strip away culinary pretension and celebrate the raw, transcendent beauty of exceptional ingredients.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Under the culinary direction of Chef Julian Vance, our kitchen pays homage to Old World French and Italian methods, invigorated by Japanese binchotan charcoal grilling and the bountiful micro-climates of Northern California.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-gold-400 block">2018</span>
                  <span className="text-xs text-zinc-400">Year Established</span>
                </div>
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-gold-400 block">3,000+</span>
                  <span className="text-xs text-zinc-400">Rare Cellar Vintages</span>
                </div>
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-gold-400 block">100%</span>
                  <span className="text-xs text-zinc-400">Organic Sustainable</span>
                </div>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                      alt="Restaurant Ambiance & Bar"
                      className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                      alt="Culinary Meat & Fire"
                      className="w-full h-36 sm:h-44 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
                      alt="Chefs in Kitchen"
                      className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                      alt="Sommelier Wine Vault"
                      className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#18181c]/95 backdrop-blur-xl border border-gold-500/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 hidden sm:flex">
                <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">Michelin Guide Selection</span>
                  <span className="text-[11px] text-gold-300">Continuous Excellence 2024 & 2025</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The 4 Core Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-[#121214] border border-white/10 hover:border-gold-500/40 rounded-3xl p-6 transition-all duration-300 text-left space-y-3.5 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1a1a1e] border border-white/10 group-hover:border-gold-500/50 flex items-center justify-center text-gold-400 transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
