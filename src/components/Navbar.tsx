
import { Link } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, LogOut, ChevronDown, Plus, Trash, Edit, Eye, Scissors } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, loginAsGuest, logout, isAuthenticated, isGuest } = useAuth();
  const cartItemCount = getTotalItems();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-2xl font-serif">
          <Link to="/" className="font-medium flex items-center">
            <img src="/lovable-uploads/logo.png" alt="Zuree" className="h-14" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:block`}>
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/" className="text-sm font-medium hover:text-zuree-red transition-colors">
                Home
              </Link>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-zuree-red transition-colors">
                  Shop
                  <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/shop" className="w-full">All Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/men" className="w-full">Men</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/women" className="w-full">Women</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/kids" className="w-full">Kids</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link to="/explore" className="text-sm font-medium hover:text-zuree-red transition-colors">
                Explore Designs
              </Link>
            </li>
            <li>
              <Link to="/tailor" className="text-sm font-medium hover:text-zuree-red transition-colors flex items-center">
                <Scissors className="h-4 w-4 mr-1" /> Custom Design
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm font-medium hover:text-zuree-red transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm font-medium hover:text-zuree-red transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-white p-4 shadow-md z-50' : 'hidden'} lg:hidden`}>
          <ul className="flex flex-col space-y-3">
            <li><Link to="/" className="text-sm font-medium hover:text-zuree-red transition-colors">Home</Link></li>
            <li>
              <div className="flex flex-col space-y-1">
                <Link to="/shop" className="text-sm font-medium hover:text-zuree-red transition-colors">Shop</Link>
                <div className="pl-4 space-y-1">
                  <Link to="/men" className="text-sm font-medium hover:text-zuree-red transition-colors block">Men</Link>
                  <Link to="/women" className="text-sm font-medium hover:text-zuree-red transition-colors block">Women</Link>
                  <Link to="/kids" className="text-sm font-medium hover:text-zuree-red transition-colors block">Kids</Link>
                </div>
              </div>
            </li>
            <li><Link to="/explore" className="text-sm font-medium hover:text-zuree-red transition-colors">Explore Designs</Link></li>
            <li><Link to="/tailor" className="text-sm font-medium hover:text-zuree-red transition-colors flex items-center">
              <Scissors className="h-4 w-4 mr-1" /> Custom Design
            </Link></li>
            <li><Link to="/about" className="text-sm font-medium hover:text-zuree-red transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-sm font-medium hover:text-zuree-red transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-6">
          <button aria-label="Search" className="hidden md:block">
            <Search className="h-5 w-5" />
          </button>
          
          <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
            <DialogTrigger asChild>
              <button aria-label="Account">
                <User className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isAuthenticated ? 'Account' : 'Sign In'}</DialogTitle>
                <DialogDescription>
                  {isAuthenticated 
                    ? `You are signed in ${isGuest ? 'as a guest' : ''}.` 
                    : 'Sign in to your account or continue as a guest.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col space-y-3 py-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <p className="text-sm">Signed in as: <span className="font-medium">{user?.name}</span></p>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center" 
                      onClick={() => {
                        logout();
                        setIsAuthDialogOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        loginAsGuest();
                        setIsAuthDialogOpen(false);
                      }}
                    >
                      Continue as Guest
                    </Button>
                    {user?.isAdmin && (
                      <Link to="/admin" className="w-full">
                        <Button variant="outline" className="w-full">
                          Admin Portal
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-zuree-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
