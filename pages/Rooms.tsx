import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Wifi, Wind, Tv } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { RoomType, Room } from '../types';

const Rooms: React.FC = () => {
  const { language, rooms } = useAppContext();
  const navigate = useNavigate();
  const t = (key: string) => TRANSLATIONS[key][language];

  const handleBookClick = (roomId: string) => {
    navigate(`/booking?roomId=${roomId}`);
  };

  const getAmenityIcon = (key: string) => {
    switch (key) {
      case 'wifi': return <Wifi size={14} />;
      case 'ac': return <Wind size={14} />;
      case 'tv': return <Tv size={14} />;
      default: return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      
      {/* Header */}
      <div className="bg-navy-900 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t('rooms')}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          {language === 'en' 
            ? "Discover our collection of elegantly designed rooms and suites, tailored for your utmost comfort."
            : "اكتشف مجموعتنا من الغرف والأجنحة المصممة بأناقة، والمجهزة لراحتك القصوى."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-12">
           {rooms.map(room => (
             <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative group">
                   <img 
                    src={room.imageUrl} 
                    alt={room.titleEn} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                   />
                   {/* Price Badge */}
                   <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 font-bold px-4 py-2 rounded-sm shadow-md z-10">
                     ${room.price} <span className="text-xs font-normal opacity-80">{t('night')}</span>
                   </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{room.type}</span>
                        <div className="flex items-center text-gray-500 text-sm gap-1">
                          <Users size={16} />
                          <span>{room.capacity} {t('guests')}</span>
                        </div>
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                       {language === 'en' ? room.titleEn : room.titleAr}
                     </h3>
                     <p className="text-gray-600 mb-6 leading-relaxed">
                       {language === 'en' ? room.descriptionEn : room.descriptionAr}
                     </p>
                     
                     <div className="flex flex-wrap gap-2 mb-8">
                       {room.amenities.slice(0, 4).map(am => (
                         <span key={am} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium uppercase">
                           {getAmenityIcon(am)} {am}
                         </span>
                       ))}
                     </div>
                   </div>

                   <div className="flex gap-4 mt-auto">
                     <button 
                       onClick={() => handleBookClick(room.id)}
                       className="flex-1 bg-navy-900 text-white py-3 px-6 rounded-sm font-bold uppercase tracking-wide hover:bg-navy-800 transition"
                     >
                       {t('bookNow')}
                     </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;