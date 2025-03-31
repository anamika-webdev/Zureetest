
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEffect } from "react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  
  // Shipping info
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });
  
  // Payment info
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!paymentInfo.cardNumber || !paymentInfo.cardHolder || 
        !paymentInfo.expiryDate || !paymentInfo.cvv) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    // Simulate payment processing
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setCurrentStep("confirmation");
      window.scrollTo(0, 0);
      // Clear cart after successful payment
      clearCart();
    }, 2000);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: "shipping" | "payment"
  ) => {
    const { name, value } = e.target;
    if (form === "shipping") {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Calculate order total
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.07;
  const shipping = items.length > 0 ? (subtotal > 999 ? 0 : 99) : 0;
  const total = subtotal + tax + shipping;
  
  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-500" />
          </div>
          <h1 className="heading-lg mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">You need to have items in your cart to checkout.</p>
          <Button onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="heading-lg mb-6">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className={`flex flex-col items-center ${currentStep === "shipping" ? "text-zuree-red" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "shipping" ? "bg-zuree-red text-white" : 
                currentStep === "payment" || currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              currentStep === "shipping" ? "bg-gray-200" : "bg-green-500"
            }`}></div>
            
            <div className={`flex flex-col items-center ${currentStep === "payment" ? "text-zuree-red" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "payment" ? "bg-zuree-red text-white" : 
                currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              currentStep === "confirmation" ? "bg-green-500" : "bg-gray-200"
            }`}></div>
            
            <div className={`flex flex-col items-center ${currentStep === "confirmation" ? "text-green-500" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}>
                {currentStep === "confirmation" ? <CheckCircle2 className="h-4 w-4" /> : 3}
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <div className="border rounded-md p-6">
                <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange(e, "shipping")}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}
            
            {currentStep === "payment" && (
              <div className="border rounded-md p-6">
                <h2 className="text-xl font-medium mb-6">Payment Information</h2>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <CreditCard className="h-6 w-6 mr-2" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange(e, "payment")}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardHolder">Cardholder Name *</Label>
                        <Input
                          id="cardHolder"
                          name="cardHolder"
                          value={paymentInfo.cardHolder}
                          onChange={(e) => handleInputChange(e, "payment")}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date (MM/YY) *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange(e, "payment")}
                            placeholder="MM/YY"
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange(e, "payment")}
                            placeholder="123"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="flex-1"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      Back to Shipping
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="flex-1 bg-zuree-red hover:bg-zuree-red/90"
                      disabled={processingPayment}
                    >
                      {processingPayment ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {currentStep === "confirmation" && (
              <div className="border rounded-md p-8 text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                
                <h2 className="text-xl font-medium mb-2">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Order Number:</span>
                    <span>ZUR-{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Delivery:</span>
                    <span>
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <Button onClick={() => navigate("/shop")}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-md p-6 sticky top-24">
              <h2 className="font-medium text-lg mb-4">Order Summary</h2>
              
              {/* Only show items if not in confirmation step */}
              {currentStep !== "confirmation" && (
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <div className="h-16 w-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="text-sm text-gray-500">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>, Color: {item.selectedColor}</span>}
                        </div>
                        <div className="text-sm">
                          <span>₹{item.price.toFixed(2)}</span>
                          <span className="mx-1">×</span>
                          <span>{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="font-medium">Total</span>
                <span className="font-medium text-lg">₹{total.toFixed(2)}</span>
              </div>
              
              {currentStep === "shipping" && (
                <div className="text-sm text-gray-500 mt-4">
                  <p>Complete your shipping information to proceed to payment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
