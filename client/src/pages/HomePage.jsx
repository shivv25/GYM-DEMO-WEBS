import React from 'react';
import AnnouncementBar from '../sections/AnnouncementBar';
import Hero from '../sections/Hero';
import Programs from '../sections/Programs';
import WhyChooseUs from '../sections/WhyChooseUs';
import Transformation from '../sections/Transformation';
import Trainers from '../sections/Trainers';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import Gallery from '../sections/Gallery';
import FAQ from '../sections/FAQ';
import LocationContact from '../sections/LocationContact';
import FinalCTA from '../sections/FinalCTA';

const HomePage = () => {
  return (
    <>
      <AnnouncementBar />
      <section id="home">
        <Hero />
      </section>
      <section id="programs">
        <Programs />
      </section>
      <section id="about">
        <WhyChooseUs />
      </section>
      <Transformation />
      <section id="trainers">
        <Trainers />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <LocationContact />
      </section>
      <section id="trial">
        <FinalCTA />
      </section>
    </>
  );
};

export default HomePage;
