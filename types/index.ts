export interface Listing {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  location: string;
  category: string;
  rating: number;
  superhost: boolean;
  available: boolean;
  availableFrom: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'GUEST' | 'HOST' | 'ADMIN';
}
