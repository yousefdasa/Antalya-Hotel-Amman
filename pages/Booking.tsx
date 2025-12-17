import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Booking, BookingStatus, Room } from '../types';

const BookingPage: React.FC = () => {
  const { language, rooms, addBooking } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const t = (key: string) => TRANSLATIONS[key][language];

  // Parse query param for initial room selection
  const searchParams = new URLSearchParams(location.search);
  const initialRoomId = searchParams.get('roomId') || rooms[0].id;

  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !selectedRoom) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays * selectedRoom.price : 0;
  };

  const total = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const newBooking: Booking = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      customerName: name,
      customerEmail: email,
      checkIn,
      checkOut,
      guests,
      totalPrice: total,
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    addBooking(newBooking);
    setSuccess(true);
    // Simulate email notification here
    console.log("Email sent to:", email);
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">
            {language === 'en' ? 'Booking Confirmed!' : 'تم تأكيد الحجز!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? `Thank you ${name}. Your reservation for the ${selectedRoom?.titleEn} is pending approval.`
              : `شكراً ${name}. حجزك لـ ${selectedRoom?.titleAr} قيد الموافقة.`}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-navy-900 text-white px-6 py-2 rounded-sm font-bold uppercase w-full hover:bg-navy-800"
          >
            {language === 'en' ? 'Back Home' : 'العودة للرئيسية'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-stone-50">
      <div className="bg-navy-900 text-white py-12 text-center">
        <h1 className="text-3xl font-serif font-bold">{t('search')}</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-navy-900 mb-6 border-b pb-2">
                {language === 'en' ? 'Guest Details' : 'تفاصيل الضيف'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkIn')}</label>
                     <div className="relative">
                       <input 
                         type="date" 
                         required
                         className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                         onChange={(e) => setCheckIn(e.target.value)}
                       />
                       <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkOut')}</label>
                     <div className="relative">
                       <input 
                         type="date" 
                         required
                         className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                         onChange={(e) => setCheckOut(e.target.value)}
                       />
                       <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                     </div>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t('guests')}</label>
                   <div className="relative">
                     <input 
                       type="number" 
                       min="1" 
                       max="6"
                       value={guests}
                       onChange={(e) => setGuests(parseInt(e.target.value))}
                       className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                     <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                     </label>
                     <input 
                       type="text" 
                       required
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                     <input 
                       type="email" 
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                   </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 rounded-sm uppercase tracking-wider transition shadow-lg">
                    {language === 'en' ? `Confirm Booking • $${total}` : `تأكيد الحجز • $${total}`}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-lg font-serif font-bold text-navy-900 mb-4">
                  {language === 'en' ? 'Reservation Summary' : 'ملخص الحجز'}
                </h3>
                
                <div className="mb-4">
                   <label className="block text-sm text-gray-500 mb-2">{language === 'en' ? 'Selected Room' : 'الغرفة المختارة'}</label>
                   <select 
                     value={selectedRoomId} 
                     onChange={(e) => setSelectedRoomId(e.target.value)}
                     className="w-full p-2 border border-gray-300 rounded-sm text-sm"
                   >
                     {rooms.map(r => (
                       <option key={r.id} value={r.id}>{language === 'en' ? r.titleEn : r.titleAr}</option>
                     ))}
                   </select>
                </div>

                {selectedRoom && (
                  <>
                     <img src={selectedRoom.imageUrl} alt="Room" className="w-full h-32 object-cover rounded-sm mb-4" />
                     <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
                        <div className="flex justify-between">
                           <span>{language === 'en' ? 'Price per night' : 'سعر الليلة'}</span>
                           <span className="font-bold text-navy-900">${selectedRoom.price}</span>
                        </div>
                        {checkIn && checkOut && (
                           <div className="flex justify-between border-t border-dashed pt-2">
                             <span>{language === 'en' ? 'Total' : 'المجموع'}</span>
                             <span className="font-bold text-gold-600 text-lg">${total}</span>
                           </div>
                        )}
                     </div>
                  </>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;