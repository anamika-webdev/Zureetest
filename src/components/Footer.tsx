
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">ZUREE DISEÑO</h3>
            <p className="text-gray-600 text-sm mb-4">
              A clothing brand that celebrates the artistry of design, 
              combining modern style with timeless elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-zuree-red transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-zuree-red transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-zuree-red transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium uppercase text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/men" className="text-gray-600 hover:text-zuree-red transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="text-gray-600 hover:text-zuree-red transition-colors">Women's Collection</Link></li>
              <li><Link to="/kids" className="text-gray-600 hover:text-zuree-red transition-colors">Kids' Collection</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-zuree-red transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-zuree-red transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium uppercase text-sm mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/customer-service" className="text-gray-600 hover:text-zuree-red transition-colors">Customer Service</Link></li>
              <li><Link to="/my-account" className="text-gray-600 hover:text-zuree-red transition-colors">My Account</Link></li>
              <li><Link to="/store-locator" className="text-gray-600 hover:text-zuree-red transition-colors">Find a Store</Link></li>
              <li><Link to="/size-guide" className="text-gray-600 hover:text-zuree-red transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-zuree-red transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium uppercase text-sm mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p> USA:  2320 Ponce De Leon Blvd, Coral Gables, FL 33134</p>
               <p>India: Plot no. 23, Udyog Vihar Phase 1, Dundahera Village, Sector 20, Gurugram, Haryana 122022 </p>
              <p>Mobile: +91 97114 11526</p>
              <p>Mobile: +91 97113 08198</p>
              <p>Contact@zuree.in</p>
            </address>
          </div>
        </div>
       



        <div className="border-t mt-12 pt-6 text-sm text-gray-600 text-center">
          <p>&copy; {new Date().getFullYear()} Zuree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
