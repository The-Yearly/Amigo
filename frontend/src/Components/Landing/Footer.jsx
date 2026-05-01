import React from 'react';
import { Globe, AtSign } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f3f3f3] pt-16 pb-8 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">The Editorial Marketplace</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            © 2024 The Editorial Marketplace. Curating excellence across campus by connecting talent with intent.
          </p>
          <div className="flex space-x-4 mt-6">
             {/* Social Icons here */}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Marketplace</h4>
          <ul className="text-sm text-gray-600 space-y-3">
            <li><a href="#">Editorial Standards</a></li>
            <li><a href="#">Trust & Safety</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Connect</h4>
          <ul className="text-sm text-gray-600 space-y-3">
            <li><a href="#">About the Gallery</a></li>
            <li><a href="#">Contact Curator</a></li>
            <li><a href="#">Support Hub</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;