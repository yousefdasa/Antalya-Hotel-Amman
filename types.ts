export enum Language {
  EN = 'en',
  AR = 'ar'
}

export enum RoomType {
  DELUXE = 'Deluxe Room',
  SUITE = 'Royal Suite',
  FAMILY = 'Family Suite',
  EXECUTIVE = 'Executive Room'
}

export interface Room {
  id: string;
  type: RoomType;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled'
}

export interface Booking {
  id: string;
  roomId: string;
  customerName: string;
  customerEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface ContentText {
  en: string;
  ar: string;
}

export interface StatData {
  name: string;
  value: number;
}