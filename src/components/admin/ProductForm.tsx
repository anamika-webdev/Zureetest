
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

type ProductFormData = Omit<Product, 'id'>;

interface ProductFormProps {
  initialData: ProductFormData;
  onCancel: () => void;
  onSave: (formData: ProductFormData) => void;
}

const ProductForm = ({ initialData, onCancel, onSave }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, we would upload the file to a server here
      // For now, we'll just create a local URL to display the image preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Product Name</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Men, Women, or Kids"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="stock" className="text-sm font-medium">Stock</label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Product Image</label>
        <div className="flex flex-col items-center space-y-4">
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Product preview" 
              className="h-32 w-32 object-cover border rounded"
            />
          )}
          
          <div className="flex w-full space-x-2">
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="flex-1"
            />
            
            <Button type="button" variant="outline" onClick={triggerFileInput}>
              <Upload className="h-4 w-4 mr-2" />
              Browse
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  );
};

export default ProductForm;
