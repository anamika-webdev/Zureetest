
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Minus, Plus, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

// Sample products data
const products = [
  {
    id: "summer-linen-shirt",
    name: "Summer Linen Shirt",
    price: 1499,
    originalPrice: 1699,
    description: "Premium pure cotton shirt for a casual summer day look. The slim fit design is ideal for a modern look. Made from high-quality fabric that ensures comfort throughout the day.",
    features: [
      "100% Pure Linen",
      "Breathable fabric",
      "Button-down collar",
      "Slim fit design",
      "Machine washable"
    ],
    colors: ["White", "Blue", "Pink"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"
    ],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    category: "shirts",
    isSale: true
  },
  {
    id: "white-shirt-slim",
    name: "White Shirt Slim Fit Plain",
    price: 69.99,
    description: "A classic white shirt that's a staple in every wardrobe. Made from high-quality cotton for comfort and durability.",
    features: [
      "100% Cotton",
      "Regular fit",
      "Button-down collar",
      "Machine washable"
    ],
    colors: ["White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  },
  {
    id: "checkered-shirt-slim",
    name: "White Blue Checkered Shirt",
    price: 74.99,
    description: "A stylish checkered pattern shirt perfect for both casual and semi-formal occasions.",
    features: [
      "Cotton blend",
      "Regular fit",
      "Button-down collar",
      "Checkered pattern",
      "Machine washable"
    ],
    colors: ["Blue/White"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  },
];

// Related products
const relatedProducts = [
  {
    id: "white-shirt-slim",
    name: "White Shirt Slim Fit Plain",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "checkered-shirt-slim",
    name: "White Blue Checkered Shirt",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "pink-shirt-slim",
    name: "Pink Shirt Slim Fit Plain",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "dotted-shirt-slim",
    name: "Dotted Black Slim Fit Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593757147298-e064ed51a29d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
  }
];

const ProductDetail = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addItem(product, quantity, selectedSize, selectedColor);
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            {/* Product Images */}
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full object-cover rounded-md aspect-[3/4]" 
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border rounded-md overflow-hidden ${
                      selectedImage === index ? 'border-zuree-red' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            {/* Product Info */}
            <div className="text-sm text-gray-500 mb-2">
              {product.category.toUpperCase()}
            </div>
            
            <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              {product.originalPrice ? (
                <>
                  <span className="text-xl font-medium text-zuree-red">₹{product.price.toFixed(2)}</span>
                  <span className="ml-2 text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 bg-zuree-red text-white text-xs px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium">₹{product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Color: {selectedColor}</h3>
                <div className="flex space-x-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border ${
                        selectedColor === color ? 'ring-2 ring-zuree-red ring-offset-2' : ''
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase().includes('white') ? 'white' : 
                                        color.toLowerCase().includes('blue') ? '#b3d4fc' : 
                                        color.toLowerCase().includes('pink') ? '#ffc0cb' : color
                      }}
                      aria-label={`Select ${color} color`}
                    ></button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Size</h3>
                  <button className="text-xs text-zuree-red underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[2.5rem] px-3 border rounded-md font-medium text-sm
                        ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-400'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex border border-gray-300 rounded-md w-28">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 h-10 text-center border-x border-gray-300"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart} 
                className="btn-primary flex-grow"
              >
                Add to Cart
              </button>
              <button
                className="border border-gray-300 rounded p-3 hover:bg-gray-50 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
            
            {/* Features */}
            {product.features && (
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <ProductGrid 
            title="You Might Also Like" 
            products={relatedProducts}
            viewAllLink="/shop"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
