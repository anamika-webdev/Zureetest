
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal } from "lucide-react";

// Sample men's product data
const mensProducts: ProductProps[] = [
  {
    id: "mens-shirt-white",
    name: "Premium White Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    category: "mens-shirts",
    isNew: true
  },
  {
    id: "mens-jacket-leather",
    name: "Classic Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    category: "mens-outerwear"
  },
  {
    id: "mens-jeans-blue",
    name: "Slim Fit Blue Jeans",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    category: "mens-pants",
    isSale: true
  },
  {
    id: "mens-sweater-navy",
    name: "Navy Wool Sweater",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    category: "mens-sweaters"
  },
  {
    id: "mens-shoes-oxford",
    name: "Classic Oxford Shoes",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "mens-shoes"
  },
  {
    id: "mens-tshirt-gray",
    name: "Fitted Gray T-Shirt",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "mens-tshirts",
    isSale: true
  }
];

const MensCollection = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = Array.from(new Set(mensProducts.map(p => p.category)));
  
  const filteredProducts = mensProducts.filter(product => {
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
          <h1 className="heading-md">Men's Collection</h1>
          <p className="text-gray-600 mt-2">Classic and modern styles for the contemporary man</p>
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
                        {category.replace('mens-', '')}
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

export default MensCollection;
