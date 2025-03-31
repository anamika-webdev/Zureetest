import { Link, useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="heading-lg mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-md overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4">
                  <div className="col-span-6">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium">Total</span>
                  </div>
                </div>
                
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="border-t">
                    {isMobile ? (
                      // Mobile layout to prevent text overlapping
                      <div className="p-4">
                        <div className="flex gap-4 mb-3">
                          <div className="h-20 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            {item.selectedSize && (
                              <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-sm">
                            <span className="font-medium">Price:</span> ₹{item.price.toFixed(2)}
                          </div>
                          
                          <div className="text-sm text-right">
                            <span className="font-medium">Total:</span> ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Quantity:</span>
                            <div className="inline-flex border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <div className="w-8 h-8 flex items-center justify-center border-x border-gray-300">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-zuree-red text-sm flex items-center gap-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Desktop layout (unchanged)
                      <div className="grid grid-cols-1 sm:grid-cols-12 p-4 items-center">
                        <div className="col-span-6 flex gap-4">
                          <div className="h-20 w-16 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {item.selectedSize && (
                              <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                            )}
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-zuree-red text-sm flex items-center gap-1 mt-2 sm:hidden"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-center">
                          <span className="sm:hidden inline-block mr-2 font-medium">Price:</span>
                          <span>₹{item.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="col-span-2 text-center py-2">
                          <span className="sm:hidden inline-block mr-2 font-medium">Quantity:</span>
                          <div className="inline-flex border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <div className="w-8 h-8 flex items-center justify-center border-x border-gray-300">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <span className="sm:hidden inline-block mr-2 font-medium">Total:</span>
                          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-zuree-red ml-4 hidden sm:inline-block"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link to="/shop" className="flex items-center text-sm font-medium">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-md p-6">
                <h2 className="font-medium text-lg mb-4">Order Summary</h2>
                
                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{(getTotalPrice() * 0.07).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-lg">₹{(getTotalPrice() + (getTotalPrice() * 0.07)).toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-zuree-red hover:bg-zuree-red/90"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
