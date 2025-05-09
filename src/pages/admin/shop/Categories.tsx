
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  PenLine, 
  Trash2, 
  Loader2,
  ShoppingBag,
  Dumbbell,
  Shirt,
  Utensils
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';
import CategoryForm from '@/components/admin/shop/CategoryForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  
  const { 
    useCategoriesQuery, 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
  } = useCategories();
  
  const { data: categories = [], isLoading } = useCategoriesQuery();
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const handleCreateCategory = (formData: any) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        toast({
          title: "Category created",
          description: "The category has been successfully created."
        });
      }
    });
  };

  const handleUpdateCategory = (formData: any) => {
    if (!selectedCategory) return;
    
    updateMutation.mutate({ 
      id: selectedCategory.id, 
      data: formData 
    }, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setSelectedCategory(null);
        toast({
          title: "Category updated",
          description: "The category has been successfully updated."
        });
      }
    });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    
    deleteMutation.mutate(selectedCategory.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted."
        });
      }
    });
  };

  const openEditDialog = (category: any) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="h-5 w-5 text-gym-orange" />;
      case 'Dumbbell':
        return <Dumbbell className="h-5 w-5 text-gym-orange" />;
      case 'Shirt':
        return <Shirt className="h-5 w-5 text-gym-orange" />;
      default:
        return <ShoppingBag className="h-5 w-5 text-gym-orange" />;
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-500">Manage product categories for your shop</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Category List</CardTitle>
          <CardDescription>
            Manage the categories shown in your shop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <span className="mt-2 text-sm text-gray-500">Loading categories...</span>
                    </TableCell>
                  </TableRow>
                ) : filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <p className="text-gray-500">No categories found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="p-2 bg-gray-100 rounded-md inline-flex">
                          {getIconComponent(category.icon || 'ShoppingBag')}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {category.description}
                      </TableCell>
                      <TableCell>{category.productCount || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(category)}>
                              <PenLine className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(category)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for your products
            </DialogDescription>
          </DialogHeader>
          <CategoryForm 
            onSubmit={handleCreateCategory}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <CategoryForm 
              initialData={selectedCategory}
              onSubmit={handleUpdateCategory}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category "{selectedCategory?.name}"? 
              This action cannot be undone and may affect products associated with this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categories;
