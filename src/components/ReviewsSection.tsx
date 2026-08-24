import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  Quote, 
  Award, 
  X, 
  Check,
  ThumbsUp
} from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Review form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [dishMentioned, setDishMentioned] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewComment) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: authorName,
      rating,
      date: 'Just now',
      title: reviewTitle || 'Exceptional Dining Experience',
      comment: reviewComment,
      dishMentioned: dishMentioned || undefined,
      verifiedDiner: true,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&q=80`
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setAuthorName('');
      setReviewTitle('');
      setReviewComment('');
      setDishMentioned('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            Verified Experiences
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Praised by Food Lovers & Critics
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Discover what our distinguished diners and culinary critics have to say about their evenings at Savoria.
          </p>
        </div>

        {/* Bento Rating Breakdown Banner */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="font-display text-5xl sm:text-6xl font-bold text-white">4.9</span>
                <div className="space-y-1">
                  <div className="flex text-gold-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 block font-medium">Out of 5.0 Rating</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Based on 1,420+ verified dining reviews across OpenTable, Google & Michelin Guide.
              </p>
              
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-black border border-gold-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all mx-auto md:mx-0 cursor-pointer shadow-sm"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Diner Review</span>
              </button>
            </div>

            {/* Category Sub-Scores */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left">
              <div className="p-3.5 bg-[#18181c] rounded-2xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1 font-semibold">Culinary Taste</span>
                <span className="font-display text-xl font-bold text-gold-400">5.0 / 5.0</span>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gold-400 h-full w-[99%]" />
                </div>
              </div>

              <div className="p-3.5 bg-[#18181c] rounded-2xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1 font-semibold">Atmosphere</span>
                <span className="font-display text-xl font-bold text-gold-400">4.9 / 5.0</span>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gold-400 h-full w-[96%]" />
                </div>
              </div>

              <div className="p-3.5 bg-[#18181c] rounded-2xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1 font-semibold">Hospitality</span>
                <span className="font-display text-xl font-bold text-gold-400">4.9 / 5.0</span>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gold-400 h-full w-[97%]" />
                </div>
              </div>

              <div className="p-3.5 bg-[#18181c] rounded-2xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1 font-semibold">Wine Selection</span>
                <span className="font-display text-xl font-bold text-gold-400">5.0 / 5.0</span>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gold-400 h-full w-[100%]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121214] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between text-left space-y-4 hover:border-gold-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-medium">{rev.date}</span>
                </div>

                <h4 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-3">
                  {rev.comment}
                </p>

                {rev.dishMentioned && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-gold-300 bg-gold-500/10 px-2.5 py-1 rounded-xl border border-gold-500/20 font-medium">
                    <ThumbsUp className="w-3 h-3 text-gold-400" />
                    <span>Praised: {rev.dishMentioned}</span>
                  </div>
                )}
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 overflow-hidden border border-white/10">
                    <img 
                      src={rev.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'} 
                      alt={rev.author} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{rev.author}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Verified Guest
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowReviewModal(false);
          }}
        >
          <div className="w-full max-w-lg bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-2xl font-bold text-white mb-1">Share Your Dining Experience</h3>
            <p className="text-zinc-400 text-xs mb-6">Your feedback helps our culinary and sommelier brigade uphold the highest standards.</p>

            <form onSubmit={handleAddReview} className="space-y-4">
              
              {/* Star selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-gold-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${rating >= star ? 'fill-gold-400' : 'text-zinc-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Jonathan Sterling"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Review Title</label>
                <input
                  type="text"
                  placeholder="e.g., An unforgettable anniversary dinner"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Favorite Dish Mentioned</label>
                <input
                  type="text"
                  placeholder="e.g., A5 Miyazaki Wagyu or Scallops"
                  value={dishMentioned}
                  onChange={(e) => setDishMentioned(e.target.value)}
                  className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the flavors, service, ambiance..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#18181c] border border-zinc-700/80 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-sm shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitted ? <Check className="w-5 h-5" /> : null}
                <span>{submitted ? 'Review Published!' : 'Submit Review'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
