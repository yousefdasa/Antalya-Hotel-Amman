import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Room, Booking, BookingStatus } from '../types';
import { INITIAL_ROOMS } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  rooms: Room[];
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  resetDatabase: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  
  // Initialize rooms from localStorage immediately to avoid overwrite
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const stored = localStorage.getItem('rooms');
      return stored ? JSON.parse(stored) : INITIAL_ROOMS;
    } catch (e) {
      console.error("Failed to load rooms", e);
      return INITIAL_ROOMS;
    }
  });

  // Initialize bookings from localStorage immediately to avoid overwrite
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      return storedBookings ? JSON.parse(storedBookings) : [];
    } catch (e) {
      console.error("Failed to load bookings", e);
      return [];
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
     return localStorage.getItem('adminAuth') === 'true';
  });

  // Sync bookings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Sync rooms to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  // Sync auth state
  useEffect(() => {
    localStorage.setItem('adminAuth', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Handle HTML dir attribute for RTL/LTR
  useEffect(() => {
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (language === Language.AR) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const addRoom = (room: Room) => {
    setRooms(prev => [...prev, room]);
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const resetDatabase = () => {
    if (window.confirm("Are you sure? This will delete all bookings and reset rooms to default.")) {
      localStorage.removeItem('rooms');
      localStorage.removeItem('bookings');
      setRooms(INITIAL_ROOMS);
      setBookings([]);
      alert("Database has been reset.");
    }
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      rooms,
      addRoom,
      updateRoom,
      deleteRoom,
      bookings,
      addBooking,
      updateBookingStatus,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      resetDatabase
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};