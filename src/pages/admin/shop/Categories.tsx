
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Loader2, Tag, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { useCategoryManagement } from '@/hooks/admin/useCategoryManagement';
import { Category } from '@/hooks/useCategories';
import { CategoryWithChildren } from '@/hooks/shop/shopTypes';
import CategoryForm from '@/components/admin/shop/CategoryForm';
import { Badge } from '@/components/ui/badge';

const Categories = () => {
  const { 
    categories, 
    hierarchicalCategories,
    loading, 
    submitting, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    hasChildCategories 
  } = useCategoryManagement();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'flat' | 'hierarchical'>('hierarchical');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    is_active: true,
    featured: false,
    parent_id: null as string | null
  });

  // Reset form when dialog opens/closes
  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      is_active: true,
      featured: false,
      icon: '',
      parent_id: null
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
      icon: category.icon || '',
      parent_id: category.parent_id || null
    });
    setShowEditDialog(true);
  };

  // Handle add category form submission
  const handleAddSubmit = async (formData: typeof formData) => {
    const result = await createCategory(formData);
    if (result) {
      setShowAddDialog(false);
      resetForm();
    }
  };
  
  // Handle edit category form submission  
  const handleEditSubmit = async (formData: typeof formData) => {
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
  
  // Toggle category expansion in hierarchical view
  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Render a hierarchical category row
  const renderCategoryRow = (category: CategoryWithChildren, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories[category.id] ?? false;
    
    return (
      <React.Fragment key={category.id}>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <div style={{ width: `${level * 24}px` }} /> {/* Indentation */}
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-6 mr-1"
                  onClick={() => toggleCategoryExpand(category.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              {level > 0 && !hasChildren && <div className="w-6 mr-1" />}
              <span>{category.name}</span>
              {level > 0 && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Sub-category
                </Badge>
              )}
            </div>
          </TableCell>
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
        {hasChildren && isExpanded && (
          category.children?.map(child => renderCategoryRow(child, level + 1))
        )}
      </React.Fragment>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Categories</h1>
          <p className="text-gray-500">Manage your product categories and organization</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border p-1">
            <Button
              variant={viewMode === 'flat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('flat')}
            >
              Flat View
            </Button>
            <Button
              variant={viewMode === 'hierarchical' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('hierarchical')}
            >
              Tree View
            </Button>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gym-orange hover:bg-gym-orange/90" onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category to organize your inventory.
                </DialogDescription>
              </DialogHeader>
              <CategoryForm 
                onSubmit={handleAddSubmit} 
                isLoading={submitting}
                categories={categories}
              />
            </DialogContent>
          </Dialog>
        </div>
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
                  {viewMode === 'hierarchical' ? (
                    hierarchicalCategories.map(category => renderCategoryRow(category))
                  ) : (
                    categories.map(category => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span>{category.name}</span>
                            {category.parent_id && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Sub-category
                              </Badge>
                            )}
                          </div>
                        </TableCell>
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details for this product category.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm 
            initialData={formData}
            onSubmit={handleEditSubmit}
            isLoading={submitting}
            categories={categories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
