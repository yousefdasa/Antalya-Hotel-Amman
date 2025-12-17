import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { BookingStatus, Room, RoomType } from '../types';
import { Users, DollarSign, Calendar, BedDouble, Plus, Trash2, Edit, Save, X, Settings, LogOut, Database } from 'lucide-react';

const Admin: React.FC = () => {
  const { bookings, isAdminAuthenticated, loginAdmin, logoutAdmin, updateBookingStatus, rooms, addRoom, updateRoom, deleteRoom, resetDatabase } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'rooms' | 'settings'>('dashboard');

  // Room Editing State
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Partial<Room>>({});

  // Login Logic
  if (!isAdminAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === 'admin' && password === 'admin123') {
        loginAdmin();
      } else {
        alert('Invalid credentials (Use: admin / admin123)');
      }
    };

    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" 
              />
            </div>
            <button type="submit" className="w-full bg-navy-800 text-white py-2 rounded-md hover:bg-navy-700 transition">
              Login
            </button>
          </form>
          <div className="mt-4 text-xs text-gray-400 text-center">
            Demo: admin / admin123
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats
  const totalRevenue = bookings
    .filter(b => b.status !== BookingStatus.CANCELLED)
    .reduce((sum, b) => sum + b.totalPrice, 0);
  
  const pendingBookings = bookings.filter(b => b.status === BookingStatus.PENDING).length;

  const getRoomName = (id: string) => rooms.find(r => r.id === id)?.titleEn || id;

  const revenueData = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
    { name: 'Jul', uv: 3490 },
  ];

  // Room Management Handlers
  const handleEditRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsEditingRoom(true);
  };

  const handleAddRoom = () => {
    setCurrentRoom({
      id: Date.now().toString(),
      type: RoomType.DELUXE,
      amenities: ['wifi', 'ac'],
      available: true
    });
    setIsEditingRoom(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRoom.id || !currentRoom.titleEn) return;

    // Check if updating or adding
    const exists = rooms.find(r => r.id === currentRoom.id);
    if (exists) {
      updateRoom(currentRoom as Room);
    } else {
      addRoom(currentRoom as Room);
    }
    setIsEditingRoom(false);
    setCurrentRoom({});
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(id);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${activeTab === id ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon size={16} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Admin Dashboard</h1>
            <span className="text-sm bg-gold-100 text-gold-800 px-3 py-1 rounded-full">Logged in as Super Admin</span>
          </div>
          <div className="flex flex-wrap space-x-2 bg-white p-1 rounded-lg shadow-sm">
            <TabButton id="dashboard" label="Overview" icon={BarChart} />
            <TabButton id="bookings" label="Bookings" icon={Calendar} />
            <TabButton id="rooms" label="Rooms" icon={BedDouble} />
            <TabButton id="settings" label="Settings" icon={Settings} />
            <button 
               onClick={logoutAdmin}
               className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500 flex items-center justify-between">
                 <div>
                   <p className="text-gray-500 text-sm font-medium uppercase">Total Revenue</p>
                   <p className="text-2xl font-bold text-navy-900">${totalRevenue.toLocaleString()}</p>
                 </div>
                 <DollarSign className="text-gold-500" size={32} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-navy-500 flex items-center justify-between">
                 <div>
                   <p className="text-gray-500 text-sm font-medium uppercase">Total Bookings</p>
                   <p className="text-2xl font-bold text-navy-900">{bookings.length}</p>
                 </div>
                 <Calendar className="text-navy-500" size={32} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 flex items-center justify-between">
                 <div>
                   <p className="text-gray-500 text-sm font-medium uppercase">Pending Actions</p>
                   <p className="text-2xl font-bold text-navy-900">{pendingBookings}</p>
                 </div>
                 <Users className="text-red-500" size={32} />
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Revenue Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="uv" stroke="#C5A028" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h3 className="text-lg font-bold text-navy-900 mb-4">Room Occupancy</h3>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={rooms.map(r => ({ name: r.titleEn.split(' ')[0], bookings: Math.floor(Math.random() * 20) + 5 }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#1B2A41" />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BOOKINGS TAB --- */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-navy-900">All Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{booking.id.slice(-4)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getRoomName(booking.roomId)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.checkIn} <br/> to {booking.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === BookingStatus.CONFIRMED ? 'bg-green-100 text-green-800' :
                          booking.status === BookingStatus.CANCELLED ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {booking.status === BookingStatus.PENDING && (
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => updateBookingStatus(booking.id, BookingStatus.CONFIRMED)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button 
                               onClick={() => updateBookingStatus(booking.id, BookingStatus.CANCELLED)}
                               className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                     <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                           No bookings found.
                        </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ROOMS TAB --- */}
        {activeTab === 'rooms' && (
          <div>
            {isEditingRoom ? (
               <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-navy-900">{currentRoom.id && rooms.some(r => r.id === currentRoom.id) ? 'Edit Room' : 'Add New Room'}</h3>
                   <button onClick={() => setIsEditingRoom(false)}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
                 </div>
                 <form onSubmit={handleSaveRoom} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type</label>
                        <select 
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          value={currentRoom.type}
                          onChange={e => setCurrentRoom({...currentRoom, type: e.target.value as RoomType})}
                        >
                          {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($/night)</label>
                        <input 
                          type="number" 
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          value={currentRoom.price || ''}
                          onChange={e => setCurrentRoom({...currentRoom, price: Number(e.target.value)})}
                          required
                        />
                      </div>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
                     <input 
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={currentRoom.titleEn || ''}
                        onChange={e => setCurrentRoom({...currentRoom, titleEn: e.target.value})}
                        required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Title (AR)</label>
                     <input 
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md font-arabic"
                        value={currentRoom.titleAr || ''}
                        onChange={e => setCurrentRoom({...currentRoom, titleAr: e.target.value})}
                        dir="rtl"
                        required
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Capacity</label>
                        <input 
                          type="number" 
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          value={currentRoom.capacity || 2}
                          onChange={e => setCurrentRoom({...currentRoom, capacity: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          value={currentRoom.imageUrl || ''}
                          onChange={e => setCurrentRoom({...currentRoom, imageUrl: e.target.value})}
                        />
                      </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
                     <textarea 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={currentRoom.descriptionEn || ''}
                        onChange={e => setCurrentRoom({...currentRoom, descriptionEn: e.target.value})}
                        rows={3}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Description (AR)</label>
                     <textarea 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md font-arabic"
                        value={currentRoom.descriptionAr || ''}
                        onChange={e => setCurrentRoom({...currentRoom, descriptionAr: e.target.value})}
                        rows={3}
                        dir="rtl"
                     />
                   </div>

                   <button type="submit" className="w-full bg-gold-500 text-navy-900 font-bold py-2 rounded-md hover:bg-gold-600 transition flex items-center justify-center gap-2">
                     <Save size={18} /> Save Room
                   </button>
                 </form>
               </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-navy-900">Hotel Rooms</h3>
                  <button onClick={handleAddRoom} className="bg-navy-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-navy-800 transition">
                    <Plus size={16} /> Add Room
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {rooms.map(room => (
                    <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition">
                      <div className="h-48 overflow-hidden relative">
                         <img src={room.imageUrl} alt={room.titleEn} className="w-full h-full object-cover" />
                         <div className="absolute top-2 right-2 flex gap-1">
                            <button onClick={() => handleEditRoom(room)} className="p-2 bg-white rounded-full shadow-md hover:text-gold-600 text-gray-600">
                               <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteRoom(room.id)} className="p-2 bg-white rounded-full shadow-md hover:text-red-600 text-gray-600">
                               <Trash2 size={16} />
                            </button>
                         </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-serif font-bold text-lg text-navy-900">{room.titleEn}</h4>
                           <span className="font-bold text-gold-600">${room.price}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{room.descriptionEn}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                           <span className="flex items-center gap-1"><Users size={12} /> {room.capacity} Guests</span>
                           <span className="flex items-center gap-1"><BedDouble size={12} /> {room.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
           <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                 <Settings className="text-gray-500" /> Database Management
              </h3>
              
              <div className="max-w-xl">
                 <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                       <Database size={18} /> Reset Database
                    </h4>
                    <p className="text-red-600 text-sm mb-4">
                       This action will completely wipe all bookings and return room configurations to their default state. This cannot be undone.
                    </p>
                    <button 
                       onClick={resetDatabase}
                       className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
                    >
                       <Trash2 size={16} /> Reset All Data
                    </button>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default Admin;