import { testimonios } from "@/data/dentalPro";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimoniosDental = () => {
  return (
    <div className="py-20">
      <h2 className="heading text-center mb-10">
        Lo que dicen <span className="text-purple">nuestros clientes</span>
      </h2>
      
      <div className="mb-10">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default TestimoniosDental; 