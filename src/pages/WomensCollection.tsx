
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Sample women's product data
const womensProducts: ProductProps[] = [
  {
    id: "womens-blouse-white",
    name: "White Silk Blouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    category: "womens-tops",
    isNew: true
  },
  {
    id: "womens-dress-floral",
    name: "Floral Summer Dress",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
    category: "womens-dresses",
    isSale: true
  },
  {
    id: "womens-jeans-high-waist",
    name: "High Waist Slim Jeans",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "womens-jeans"
  },
  {
    id: "womens-blazer-black",
    name: "Black Tailored Blazer",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "womens-jackets"
  },
  {
    id: "womens-skirt-pleated",
    name: "Pleated Midi Skirt",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80",
    category: "womens-skirts"
  },
  {
    id: "womens-sweater-knit",
    name: "Cashmere Knit Sweater",
    price: 119.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    category: "womens-sweaters",
    isSale: true
  }
];

const WomensCollection = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const categories = Array.from(new Set(womensProducts.map(p => p.category)));
  
  const filteredProducts = womensProducts.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesPrice && matchesCategory;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-zuree-beige py-8 px-4">
        <div className="container mx-auto">
          <h1 className="heading-md">Women's Collection</h1>
          <p className="text-gray-600 mt-2">Elegant designs for the modern woman</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="lg:flex gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
          </div>
          
          {/* Filters sidebar */}
          <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-6 rounded-md shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-medium text-lg">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-gray-500 text-sm hover:text-zuree-red transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  max={200}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label 
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {category.replace('womens-', '')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                <span className="text-sm font-medium">Sort by: Featured</span>
              </div>
              
              <span className="text-sm text-gray-500">
                {filteredProducts.length} products
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters} 
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WomensCollection;
