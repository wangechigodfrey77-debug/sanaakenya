export type Category = 'all' | 'soapstone' | 'beadwork' | 'woodcarving' | 'baskets' | 'glass' | 'batik';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'KES';

export type CarouselMode = '3d-coverflow' | 'hero-filmstrip' | 'category-snap' | 'artisan-stories' | 'craft-map' | 'shop-by-region';

export interface RegionTribeInfo {
  id: string;
  regionName: string;
  tribeName: string;
  artisanGroup: string;
  location: string;
  primaryMedium: string;
  historicalOrigins: string;
  artisticCharacteristics: {
    materialsAndTechniques: string;
    colorSymbolism: string;
    culturalSignificance: string;
  };
  keySymbols: string[];
  image: string;
  artisanCount: string;
}

export interface Artisan {
  id: string;
  name: string;
  location: string;
  coopName: string;
  bio: string;
  avatar: string;
  craftType: string;
  experienceYears: number;
}

export interface Artwork {
  id: string;
  title: string;
  kiswahiliTitle: string;
  category: Category;
  categoryLabel: string;
  priceUSD: number;
  image: string;
  additionalImages?: string[];
  region: string;
  artisan: Artisan;
  description: string;
  provenance: string;
  materials: string[];
  dimensions: string;
  weightKg: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  inStock: boolean;
  certificateId: string;
  craftedDays: number;
}

import { KenyaRegionKey } from './data/deliveryRegions';

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  kenyaRegion: KenyaRegionKey;
  postalCode: string;
  paymentMethod: 'card' | 'mpesa' | 'applepay';
  phoneNumber: string;
  artisanTipPercentage: number;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotalUSD: number;
  shippingUSD: number;
  shippingKsh: number;
  artisanTipUSD: number;
  totalUSD: number;
  totalKsh: number;
  shippingDetails: ShippingDetails;
  certificateNumber: string;
  estimatedDelivery: string;
  mpesaReceiptNo?: string;
}
