/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ChefSpecials } from './components/ChefSpecials';
import { ReservationSection } from './components/ReservationSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AICulinaryConciergeModal } from './components/AICulinaryConciergeModal';
import { QuickOrderFloatingBar } from './components/QuickOrderFloatingBar';
import { Dish, CartItem, SeatingArea } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('savoria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);
  const [isAIConciergeOpen, setIsAIConciergeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Reservation prefill state from hero quick selector
  const [reservationPrefill, setReservationPrefill] = useState<{
    date?: string;
    time?: string;
    guests?: number;
    area?: SeatingArea;
  }>({
    guests: 2,
    area: 'main-hall'
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('savoria_cart', JSON.stringify(cart));
    } catch {
      // safe fallback
    }
  }, [cart]);

  // Track active section for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'chef-specials', 'reservations', 'about', 'gallery', 'reviews', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (dish: Dish, quantity = 1, instructions?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.dish.id === dish.id && (item.specialInstructions || '') === (instructions || '')
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          dish,
          quantity,
          specialInstructions: instructions,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const handleQuickAddToCart = (dish: Dish) => {
    handleAddToCart(dish, 1);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Quick navigation handlers
  const handleQuickBook = (date: string, time: string, guests: number, area: SeatingArea) => {
    setReservationPrefill({ date, time, guests, area });
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8e6e3] font-sans relative selection:bg-gold-500 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleScrollToSection('reservations')}
        onOpenAIConcierge={() => setIsAIConciergeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Live Booking Bar */}
        <Hero
          onQuickBook={handleQuickBook}
          onExploreMenu={() => handleScrollToSection('menu')}
          onExploreTasting={() => handleScrollToSection('chef-specials')}
        />

        {/* Artisanal Categorized Menu */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDishForModal(dish)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* 7-Course Chef Tasting Feature & Julian Vance Profile */}
        <ChefSpecials
          onReserveTasting={() => handleScrollToSection('reservations')}
        />

        {/* Complete Table Reservation Engine */}
        <ReservationSection
          initialDate={reservationPrefill.date}
          initialTime={reservationPrefill.time}
          initialGuests={reservationPrefill.guests}
          initialArea={reservationPrefill.area}
        />

        {/* Heritage Story, Dry Aging & Sourcing Pillars */}
        <AboutSection />

        {/* Dining Rooms & Culinary Lightbox Gallery */}
        <GallerySection />

        {/* Verified Diner Testimonials & Review Submissions */}
        <ReviewsSection />

        {/* Operating Hours, Directions & Private Events */}
        <LocationHours />
      </main>

      {/* Footer with Newsletter & Quick Links */}
      <Footer />

      {/* Dish Detail & Pairing Modal */}
      <DishDetailModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Online Ordering Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* AI Sommelier & Culinary Concierge Modal */}
      <AICulinaryConciergeModal
        isOpen={isAIConciergeOpen}
        onClose={() => setIsAIConciergeOpen(false)}
        onSelectDish={(dish) => setSelectedDishForModal(dish)}
        onAddToCart={handleQuickAddToCart}
      />

      {/* Floating Quick Action Bar */}
      <QuickOrderFloatingBar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleScrollToSection('reservations')}
        onOpenAI={() => setIsAIConciergeOpen(true)}
      />

    </div>
  );
}
