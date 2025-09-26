export interface MassageShop {
  _id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  website?: string;
  images: string[];
  services: Service[];
  amenities: string[];
  operatingHours: OperatingHours;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: 'massage' | 'spa' | 'therapy' | 'beauty';
}

export interface OperatingHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  open: string; // HH:MM format
  close: string; // HH:MM format
}

export interface Booking {
  _id: string;
  shopId: string;
  userId: string;
  serviceId: string;
  date: Date;
  time: string; // HH:MM format
  duration: number; // minutes
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  shopId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'shop_owner';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  city?: string;
  district?: string;
  serviceType?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  amenities?: string[];
  location?: {
    region: string;
    district: string;
  };
}

export interface BookingFormData {
  shopId: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}


