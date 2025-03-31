
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { ProductProps } from "./ProductCard";

// Featured products for the carousel
const saleProducts: ProductProps[] = [
  {
    id: "summer-linen-shirt",
    name: "Summer Linen Shirt",
    price: 1499,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    category: "shirts",
    isSale: true
  },
  {
    id: "blue-denim-jacket",
    name: "Blue Denim Jacket",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80",
    category: "jackets",
    isSale: true
  },
  {
    id: "floral-summer-dress",
    name: "Floral Summer Dress",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
    category: "dresses",
    isSale: true
  },
  {
    id: "leather-sneakers",
    name: "Premium Leather Sneakers",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
    category: "shoes",
    isSale: true
  }
];

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = saleProducts;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const handleViewProduct = () => {
    navigate(`/product/${slides[currentSlide].id}`);
  };

  return (
    <section className="py-16 bg-zuree-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-zuree-red uppercase text-sm font-medium tracking-wider">Limited Time Offer</span>
          <h2 className="heading-md mt-2">Summer Sale</h2>
          <p className="text-gray-600 mt-2">Up to 30% off on selected items</p>
        </div>
        
        <div className="bg-white p-4 md:p-8 rounded-md shadow-sm max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative w-full md:w-1/2 overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].name}
                className="w-full h-80 md:h-96 object-cover"
              />
              
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                aria-label="Previous product"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                aria-label="Next product"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="md:w-1/2 pt-6 md:pt-0 md:pl-8">
              <div className="text-sm text-gray-600 mb-1">SALE | {slides[currentSlide].category.toUpperCase()}</div>
              <h3 className="text-xl font-medium">{slides[currentSlide].name}</h3>
              
              <div className="flex items-center mt-2 mb-4">
                <span className="text-xl font-medium">₹{slides[currentSlide].price.toFixed(2)}</span>
                {slides[currentSlide].originalPrice && (
                  <span className="ml-2 text-gray-500 line-through">₹{slides[currentSlide].originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">
                Don't miss our amazing seasonal sale! Limited stock available at these special prices.
              </p>
              
              <Button className="btn-primary w-full md:w-auto" onClick={handleViewProduct}>
                View Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
