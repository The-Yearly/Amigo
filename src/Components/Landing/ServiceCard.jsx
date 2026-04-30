import React from 'react';
import { Star } from 'lucide-react';

const ServiceCard = ({ title, price, description, author }) => {
  return (
    <div className="bg-white group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
        <img src="service-image.jpg" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-[#8b2e5f] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">
          Top Curator
        </span>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-[#1a1a1a] leading-snug w-2/3">
          {title}
        </h3>
        <p className="text-lg font-bold text-[#1a1a1a]">{price}</p>
      </div>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-xs">
          EC
        </div>
        <div>
            <p className="text-xs font-bold">{author}</p>
            <p className="text-[10px] text-gray-400">Ph.D. Candidate, Yale</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;