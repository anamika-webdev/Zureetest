
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, User } from "lucide-react";

// Sample user data
const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", orders: 5, lastLogin: "2 hours ago" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", orders: 3, lastLogin: "1 day ago" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Customer", orders: 8, lastLogin: "5 days ago" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Customer", orders: 1, lastLogin: "1 hour ago" },
  { id: 5, name: "Admin User", email: "admin@zuree.com", role: "Admin", orders: 0, lastLogin: "Just now" },
];

const UserManagement = () => {
  const [users] = useState(dummyUsers);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl">All Users ({users.length})</h2>
          <p className="text-sm text-muted-foreground">View and manage user accounts</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <div className="bg-gray-200 rounded-full p-2">
                  <User className="h-4 w-4" />
                </div>
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100"
                }`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell>{user.orders}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
