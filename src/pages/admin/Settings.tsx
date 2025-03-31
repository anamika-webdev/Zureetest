
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Zuree Fashion",
    email: "contact@zuree.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street, New York, NY 10001",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStock: true,
  });

  const { toast } = useToast();

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const saveSettings = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="store">
        <TabsList className="mb-4">
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Manage your store's contact information and details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="storeName" className="text-sm font-medium">Store Name</label>
                <Input
                  id="storeName"
                  name="storeName"
                  value={storeSettings.storeName}
                  onChange={handleStoreSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={storeSettings.email}
                  onChange={handleStoreSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input
                  id="phone"
                  name="phone"
                  value={storeSettings.phone}
                  onChange={handleStoreSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <Input
                  id="address"
                  name="address"
                  value={storeSettings.address}
                  onChange={handleStoreSettingsChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Information</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure which notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="orderConfirmation" className="text-sm font-medium">Order Confirmation</label>
                <input
                  id="orderConfirmation"
                  name="orderConfirmation"
                  type="checkbox"
                  checked={notificationSettings.orderConfirmation}
                  onChange={handleNotificationChange}
                  className="h-4 w-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="orderShipped" className="text-sm font-medium">Order Shipped</label>
                <input
                  id="orderShipped"
                  name="orderShipped"
                  type="checkbox"
                  checked={notificationSettings.orderShipped}
                  onChange={handleNotificationChange}
                  className="h-4 w-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="orderDelivered" className="text-sm font-medium">Order Delivered</label>
                <input
                  id="orderDelivered"
                  name="orderDelivered"
                  type="checkbox"
                  checked={notificationSettings.orderDelivered}
                  onChange={handleNotificationChange}
                  className="h-4 w-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="lowStock" className="text-sm font-medium">Low Stock Alerts</label>
                <input
                  id="lowStock"
                  name="lowStock"
                  type="checkbox"
                  checked={notificationSettings.lowStock}
                  onChange={handleNotificationChange}
                  className="h-4 w-4"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Store Appearance</CardTitle>
              <CardDescription>
                Customize how your store looks to customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Appearance settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
