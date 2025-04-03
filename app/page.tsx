"use client";

import { navItems } from "@/data/dentalPro";

import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import HeroDental from "@/components/dentalPro/HeroDental";
import ServiciosDentalAlt from "@/components/dentalPro/ServiciosDentalAlt";
import MetodologiaDental from "@/components/dentalPro/MetodologiaDental";
import EquipoDental from "@/components/dentalPro/EquipoDental"; 
import TestimoniosDental from "@/components/dentalPro/TestimoniosDental";
import ContactoDental from "@/components/dentalPro/ContactoDental";

const Home = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <div id="inicio">
          <HeroDental />
        </div>
        <div id="servicios">
          <ServiciosDentalAlt />
        </div>
        <div id="metodologia">
          <MetodologiaDental />
        </div>
        <div id="equipo">
          <EquipoDental />
        </div>
        <div id="testimonios">
          <TestimoniosDental />
        </div>
        <div id="contacto">
          <ContactoDental />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
