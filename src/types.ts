export type DietaryPreference = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'halal' | 'nut-free';

export type DishCategory = 
  | 'starters'
  | 'mains'
  | 'steaks'
  | 'pasta'
  | 'seafood'
  | 'desserts'
  | 'cocktails'
  | 'wines';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  dietary: DietaryPreference[];
  isChefSpecial?: boolean;
  isSeasonal?: boolean;
  spicyLevel?: number; // 0 to 3
  calories?: number;
  prepTime?: string;
  allergens?: string[];
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  ingredients: string[];
  winePairing?: string;
  servingSize?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
  selectedSide?: string;
}

export type SeatingArea = 'main-hall' | 'garden-terrace' | 'wine-vault' | 'chef-counter';

export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  occasion: 'none' | 'birthday' | 'anniversary' | 'business' | 'date-night' | 'celebration';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  reservationCode: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  dishMentioned?: string;
  verifiedDiner: boolean;
  avatarUrl?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  established: string;
  phone: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    days: string;
    lunch?: string;
    dinner: string;
    bar: string;
  }[];
}
