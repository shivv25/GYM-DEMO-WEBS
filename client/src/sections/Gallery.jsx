import React from 'react';
import { useGym } from '../context/GymContext';
import SectionHeading from '../components/SectionHeading';
import GalleryCard from '../components/GalleryCard';

const Gallery = () => {
  const { gym } = useGym();
  
  if (!gym?.gallery) return null;

  return (
    <section className="py-24 bg-[#050505] text-white" id="gallery">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Facility Gallery" 
          subtitle="Take a look inside our state-of-the-art facility." 
          centered 
        />
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-16 space-y-4">
          {gym.gallery.map((item, idx) => (
            <GalleryCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
