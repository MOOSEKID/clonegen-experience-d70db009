
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Plus, Loader2, Tag, Trash2 } from 'lucide-react';
import { useCategoryManagement } from '@/hooks/admin/useCategoryManagement';
import { Category } from '@/hooks/useCategories';

const Categories = () => {
  const { categories, loading, submitting, createCategory, updateCategory, deleteCategory } = useCategoryManagement();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    is_active: true,
    featured: false,
    icon: ''
  });

  // Reset form when dialog opens/closes
  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      is_active: true,
      featured: false,
      icon: ''
    });
  };

  // Open edit dialog and populate form
  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      is_active: category.is_active ?? true,
      featured: category.featured ?? false,
      icon: category.icon || ''
    });
    setShowEditDialog(true);
  };

  // Handle add category form submission
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createCategory(formData);
    if (result) {
      setShowAddDialog(false);
      resetForm();
    }
  };
  
  // Handle edit category form submission  
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentCategory) return;
    
    const result = await updateCategory(currentCategory.id, formData);
    if (result) {
      setShowEditDialog(false);
      setCurrentCategory(null);
      resetForm();
    }
  };
  
  // Handle delete category
  const handleDeleteConfirm = async () => {
    if (!currentCategory) return;
    
    const result = await deleteCategory(currentCategory.id);
    if (result) {
      setCurrentCategory(null);
    }
  };
  
  // Generate slug from name
  const generateSlug = (name: string) => {
    const slug = name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
      
    setFormData(prev => ({...prev, slug}));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Categories</h1>
          <p className="text-gray-500">Manage your product categories and organization</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gym-orange hover:bg-gym-orange/90" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <form onSubmit={handleAddSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category to organize your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (e.target.value && !formData.slug) {
                        generateSlug(e.target.value);
                      }
                    }} 
                    className="col-span-3" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">Slug</Label>
                  <Input 
                    id="slug" 
                    value={formData.slug} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                    className="col-span-3" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">Icon</Label>
                  <Input 
                    id="icon" 
                    value={formData.icon} 
                    onChange={(e) => setFormData({...formData, icon: e.target.value})} 
                    className="col-span-3" 
                    placeholder="CSS class name or icon name" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">Options</div>
                  <div className="col-span-3 space-y-4">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <Label htmlFor="is_active">Active Category</Label>
                      <Switch 
                        id="is_active" 
                        checked={formData.is_active} 
                        onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <Label htmlFor="featured">Featured Category</Label>
                      <Switch 
                        id="featured" 
                        checked={formData.featured} 
                        onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-gym-orange" />
            <span>Product Categories</span>
          </CardTitle>
          <CardDescription>
            Organize your products into categories for easier customer navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-gym-orange animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 border rounded-md">
              <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-1">No Categories Found</h3>
              <p className="text-gray-500">Create your first category to organize your products.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${category.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {category.featured ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Featured</span>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setCurrentCategory(category)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the category
                                "{currentCategory?.name}" and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the details for this product category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input 
                  id="edit-name" 
                  value={formData.name} 
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                  }} 
                  className="col-span-3" 
                  required 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-slug" className="text-right">Slug</Label>
                <Input 
                  id="edit-slug" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  className="col-span-3" 
                  required 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-icon" className="text-right">Icon</Label>
                <Input 
                  id="edit-icon" 
                  value={formData.icon} 
                  onChange={(e) => setFormData({...formData, icon: e.target.value})} 
                  className="col-span-3" 
                  placeholder="CSS class name or icon name" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Options</div>
                <div className="col-span-3 space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="edit-is_active">Active Category</Label>
                    <Switch 
                      id="edit-is_active" 
                      checked={formData.is_active} 
                      onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="edit-featured">Featured Category</Label>
                    <Switch 
                      id="edit-featured" 
                      checked={formData.featured} 
                      onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
