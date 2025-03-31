
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[];
  sizes?: string[];
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    
    // If product has sizes, open dialog for size selection
    if (product.sizes && product.sizes.length > 0) {
      setIsOpen(true);
    } else {
      // If no sizes, navigate to product detail page
      navigate(`/product/${product.id}`);
    }
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addItem(product, 1, selectedSize);
    setIsOpen(false);
    setSelectedSize("");
  };

  return (
    <>
      <div className="group">
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {product.isSale && (
            <div className="absolute top-2 right-2 bg-zuree-red text-white text-xs py-1 px-2 font-medium">
              SALE
            </div>
          )}
          
          {product.isNew && !product.isSale && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs py-1 px-2 font-medium">
              NEW
            </div>
          )}
        </Link>
        
        <div className="mt-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium">{product.name}</h3>
          </Link>
          <div className="text-sm mt-1 flex items-center">
            {product.originalPrice ? (
              <>
                <span className="text-zuree-red font-medium">₹{product.price.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-medium">₹{product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="mt-3">
            <Button
              size="sm"
              className="w-full bg-black hover:bg-zuree-red text-white transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              {product.sizes && product.sizes.length > 0 ? "Select Size" : "View Product"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Size</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 py-4">
            {product.sizes?.map(size => (
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAddToCart}>
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
