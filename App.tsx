import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';
import { MapPin, Phone, Mail } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import BookingPage from './pages/Booking';
import Admin from './pages/Admin';

const Contact = () => (
    <div className="pt-24 min-h-screen bg-stone-50 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-navy-900 mb-8 text-center">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Contact Info Card */}
                <div className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-navy-900 mb-6 font-serif border-b pb-4">Get in Touch</h3>
                    <div className="space-y-6 text-gray-600">
                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-2 rounded-full text-gold-600"><MapPin size={20} /></div>
                            <div>
                                <span className="block font-bold text-navy-900">Address</span>
                                <span>Amman, Jordan</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-2 rounded-full text-gold-600"><Phone size={20} /></div>
                            <div>
                                <span className="block font-bold text-navy-900">Phone</span>
                                <span dir="ltr">+962 7 9908 6087</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-2 rounded-full text-gold-600"><Mail size={20} /></div>
                            <div>
                                <span className="block font-bold text-navy-900">Email</span>
                                <span>reservations@antalyahotelamman.com</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t">
                         <a 
                            href="https://maps.app.goo.gl/vDy1wtCaDj5bJNXs7" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full bg-gold-500 text-navy-900 font-bold py-3 px-6 rounded-sm hover:bg-gold-600 transition shadow-sm gap-2"
                        >
                            <MapPin size={18} /> Open in Google Maps
                        </a>
                    </div>
                </div>
                
                {/* Map Embed */}
                <div className="bg-white p-2 rounded-lg shadow-md h-96 md:h-auto min-h-[400px]">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.975440266023!2d35.9106!3d31.9539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d198a67%3A0x3030303030303030!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1600000000000!5m2!1sen!2sjo" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, borderRadius: '4px' }} 
                        allowFullScreen 
                        loading="lazy" 
                        title="Hotel Location"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
);

const Facilities = () => (
    <div className="pt-24 min-h-screen bg-stone-50 text-center px-4">
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-4">Facilities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {['Spa', 'Gym', 'Pool', 'Restaurant', 'Meeting Rooms', 'Parking'].map(f => (
                <div key={f} className="bg-white p-8 rounded shadow-md h-40 flex items-center justify-center font-bold text-xl text-gold-600">{f}</div>
            ))}
        </div>
    </div>
);

const Gallery = () => (
    <div className="pt-24 min-h-screen bg-stone-50 text-center px-4">
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-8">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
             {[1,2,3,4,5,6].map(i => (
                 <img key={i} src={`https://picsum.photos/id/${i+50}/400/300`} className="rounded shadow-sm hover:opacity-90 transition" alt="Gallery" />
             ))}
        </div>
    </div>
);

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => (
    <>
        <Navbar />
        {children}
        <AIConcierge />
        <Footer />
    </>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
          <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          
          {/* Admin Route - No Layout/Navbar/Footer for focus */}
          <Route path="/admin" element={<Admin />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;