
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Sample categories
const categories = [
  "All Designs",
  "Traditional",
  "Contemporary",
  "Casual",
  "Formal",
  "Ethnic",
  "Fusion"
];

// Sample design products
const designProducts = [
  {
    id: "traditional-saree-1",
    name: "Traditional Silk Saree",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1610030469668-76cd5af39a19?q=80&w=1000&auto=format&fit=crop",
    category: "traditional"
  },
  {
    id: "contemporary-dress-1",
    name: "Contemporary A-Line Dress",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1000&auto=format&fit=crop",
    category: "contemporary"
  },
  {
    id: "fusion-kurta-1",
    name: "Modern Fusion Kurta",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
    category: "fusion"
  },
  {
    id: "formal-suit-1",
    name: "Classic Formal Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop",
    category: "formal"
  },
  {
    id: "ethnic-lehenga-1",
    name: "Embroidered Ethnic Lehenga",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    category: "ethnic"
  },
  {
    id: "casual-dress-1",
    name: "Casual Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?q=80&w=1000&auto=format&fit=crop",
    category: "casual"
  },
  {
    id: "traditional-kurta-1",
    name: "Hand-Embroidered Kurta",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1625258902572-7bfd19d7fc72?q=80&w=1000&auto=format&fit=crop",
    category: "traditional"
  },
  {
    id: "contemporary-blouse-1",
    name: "Contemporary Blouse Design",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop",
    category: "contemporary"
  }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Designs");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Filter designs based on search term and category
  const filteredDesigns = designProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Designs" || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="heading-lg mb-4">Explore Designs</h1>
          <p className="text-gray-600 max-w-3xl">
            Discover our exclusive range of designs that blend tradition with modern aesthetics. 
            Browse through our carefully curated collection that showcases the best of fashion.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="relative">
            <Button 
              variant="outline" 
              className="w-full md:w-auto flex items-center justify-between gap-2"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Filter className="h-4 w-4" />
              <span>{selectedCategory}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {showCategoryDropdown && (
              <div className="absolute mt-2 w-full z-10 bg-white border rounded-md shadow-lg">
                <div className="py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Design Grid */}
        <div className="mb-8">
          {filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredDesigns.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No designs found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Designs");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
