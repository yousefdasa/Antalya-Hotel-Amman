import { Room, RoomType, Language, ContentText } from './types';

export const HOTEL_INFO = {
  name: "Antalya Hotel Amman",
  location: "Amman, Jordan",
  coords: { lat: 31.9539, lng: 35.9106 },
  phone: "+962 7 9908 6087",
  email: "reservations@antalyahotelamman.com"
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: '1',
    type: RoomType.DELUXE,
    titleEn: 'Deluxe City View',
    titleAr: 'غرفة ديلوكس مطلة على المدينة',
    descriptionEn: 'Elegant 40sqm room with a stunning view of Amman.',
    descriptionAr: 'غرفة أنيقة بمساحة 40 متر مربع مع إطلالة خلابة على عمان.',
    price: 120,
    capacity: 2,
    amenities: ['wifi', 'ac', 'tv', 'minibar'],
    imageUrl: 'https://picsum.photos/id/10/800/600',
    available: true
  },
  {
    id: '2',
    type: RoomType.SUITE,
    titleEn: 'Royal Suite',
    titleAr: 'الجناح الملكي',
    descriptionEn: 'Experience ultimate luxury in our 100sqm Royal Suite with private jacuzzi.',
    descriptionAr: 'جرب الرفاهية المطلقة في الجناح الملكي بمساحة 100 متر مربع مع جاكوزي خاص.',
    price: 350,
    capacity: 4,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'jacuzzi', 'breakfast'],
    imageUrl: 'https://picsum.photos/id/14/800/600',
    available: true
  },
  {
    id: '3',
    type: RoomType.FAMILY,
    titleEn: 'Family Connecting Room',
    titleAr: 'غرفة عائلية متصلة',
    descriptionEn: 'Perfect for families, offering two connecting bedrooms and spacious living area.',
    descriptionAr: 'مثالية للعائلات، وتوفر غرفتي نوم متصلتين ومنطقة معيشة واسعة.',
    price: 220,
    capacity: 5,
    amenities: ['wifi', 'ac', 'tv', 'kitchen'],
    imageUrl: 'https://picsum.photos/id/20/800/600',
    available: true
  }
];

export const TRANSLATIONS: Record<string, ContentText> = {
  heroTitle: {
    en: "Where Comfort Meets Elegance",
    ar: "حيث تلتقي الراحة بالأناقة"
  },
  heroSubtitle: {
    en: "Experience the heart of Amman in luxury.",
    ar: "استمتع بقلب عمان في فخامة."
  },
  bookNow: {
    en: "Book Now",
    ar: "احجز الآن"
  },
  viewRooms: {
    en: "View Rooms",
    ar: "عرض الغرف"
  },
  aboutUs: {
    en: "About Us",
    ar: "معلومات عنا"
  },
  facilities: {
    en: "Facilities",
    ar: "المرافق"
  },
  contact: {
    en: "Contact",
    ar: "اتصل بنا"
  },
  admin: {
    en: "Admin",
    ar: "مشرف"
  },
  home: {
    en: "Home",
    ar: "الرئيسية"
  },
  rooms: {
    en: "Rooms & Suites",
    ar: "الغرف والأجنحة"
  },
  gallery: {
    en: "Gallery",
    ar: "المعرض"
  },
  reviews: {
    en: "Reviews",
    ar: "التقييمات"
  },
  night: {
    en: "/ night",
    ar: "/ ليلة"
  },
  checkIn: {
    en: "Check-in",
    ar: "تسجيل الوصول"
  },
  checkOut: {
    en: "Check-out",
    ar: "المغادرة"
  },
  guests: {
    en: "Guests",
    ar: "الضيوف"
  },
  search: {
    en: "Check Availability",
    ar: "تحقق من التوفر"
  },
  footerText: {
    en: "© 2024 Antalya Hotel Amman. All rights reserved.",
    ar: "© 2024 فندق أنطاليا عمان. جميع الحقوق محفوظة."
  },
  aiPrompt: {
    en: "Ask our AI Concierge...",
    ar: "اسأل المساعد الذكي..."
  }
};