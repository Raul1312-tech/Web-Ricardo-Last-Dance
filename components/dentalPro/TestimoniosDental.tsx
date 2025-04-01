import { testimonios } from "@/data/dentalPro";
import { InfiniteMovingCards } from "../ui/InfiniteCards";

const TestimoniosDental = () => {
  return (
    <div className="py-20">
      <h2 className="heading text-center mb-10">
        Lo que dicen <span className="text-purple">nuestros clientes</span>
      </h2>
      
      <div className="mb-20">
        <InfiniteMovingCards 
          items={testimonios}
          speed="normal"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};

export default TestimoniosDental; 