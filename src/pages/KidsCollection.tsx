
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal, X } from "lucide-react";

// Sample kids' product data
const kidsProducts: ProductProps[] = [
  {
    id: "kids-tshirt-stripe",
    name: "Striped Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "kids-tops",
    isNew: true
  },
  {
    id: "kids-jeans-blue",
    name: "Comfortable Blue Jeans",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    category: "kids-pants"
  },
  {
    id: "kids-dress-flowers",
    name: "Floral Summer Dress",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    category: "kids-dresses",
    isSale: true
  },
  {
    id: "kids-jacket-winter",
    name: "Warm Winter Jacket",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "kids-outerwear"
  },
  {
    id: "kids-shoes-sport",
    name: "Colorful Sports Shoes",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80",
    category: "kids-shoes"
  },
  {
    id: "kids-pajama-set",
    name: "Cotton Pajama Set",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1626380414057-69a7e739e571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    category: "kids-sleepwear",
    isSale: true
  }
];

const KidsCollection = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = Array.from(new Set(kidsProducts.map(p => p.category)));
  
  const filteredProducts = kidsProducts.filter(product => {
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
    setPriceRange([0, 100]);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-zuree-beige py-8 px-4">
        <div className="container mx-auto">
          <h1 className="heading-md">Kids' Collection</h1>
          <p className="text-gray-600 mt-2">Comfortable, durable and fun clothing for children</p>
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
                  max={100}
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
                        {category.replace('kids-', '')}
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

export default KidsCollection;
