
export interface Property {
  id: string;
  title: string;
  price: number;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Commercial';
  bhk: number;
  area: number;
  address: string;
  city: string;
  images: string[];
  description: string;
  features: string[];
  isFeatured?: boolean;
  owner: {
    id: string;
    name: string;
    contact: string;
    verified: boolean;
    avatar: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  // New fields for My Listings
  status?: 'Active' | 'Pending' | 'Rejected' | 'Expired';
  stats?: {
    views: number;
    leads: number;
    saved: number;
  };
  createdAt?: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface FilterState {
  query: string;
  type: string[];
  priceRange: [number, number];
  bhk: number[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: number;
  isRead: boolean;
}

export interface ChatSession {
  id: string;
  propertyId?: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  messages: ChatMessage[];
  lastUpdated: number;
}
