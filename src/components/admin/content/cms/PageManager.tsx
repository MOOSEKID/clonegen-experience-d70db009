
import React, { useState } from 'react';
import { useCmsPages } from '@/hooks/cms/useCmsPages';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CmsPage } from '@/services/cms/cmsService';
import { Pencil, Trash2, Plus, ExternalLink, Eye, EyeOff, FileSymlink } from 'lucide-react';

const PageManager: React.FC = () => {
  const { pages, isLoading, error, createPage, updatePage, deletePage } = useCmsPages();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<CmsPage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'custom',
    parent_id: '',
    visible: true,
    meta_description: '',
    meta_keywords: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const openCreateDialog = () => {
    setFormData({
      title: '',
      slug: '',
      type: 'custom',
      parent_id: '',
      visible: true,
      meta_description: '',
      meta_keywords: '',
    });
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (page: CmsPage) => {
    setCurrentPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      type: page.type as 'custom',
      parent_id: page.parent_id || '',
      visible: page.visible,
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || '',
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (page: CmsPage) => {
    setCurrentPage(page);
    setIsDeleteDialogOpen(true);
  };

  const handleCreatePage = () => {
    createPage({
      title: formData.title,
      slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
      type: formData.type as 'custom' | 'system' | 'dynamic',
      parent_id: formData.parent_id || null,
      visible: formData.visible,
      meta_description: formData.meta_description || null,
      meta_keywords: formData.meta_keywords || null,
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdatePage = () => {
    if (currentPage) {
      updatePage({
        id: currentPage.id,
        page: {
          title: formData.title,
          slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
          type: formData.type as 'custom' | 'system' | 'dynamic',
          parent_id: formData.parent_id || null,
          visible: formData.visible,
          meta_description: formData.meta_description || null,
          meta_keywords: formData.meta_keywords || null,
        }
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePage = () => {
    if (currentPage) {
      deletePage(currentPage.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleVisibility = (page: CmsPage) => {
    updatePage({
      id: page.id,
      page: { visible: !page.visible }
    });
  };

  // Helper to get parent page title
  const getParentTitle = (parentId: string | null | undefined) => {
    if (!parentId) return '-';
    const parent = pages.find(p => p.id === parentId);
    return parent ? parent.title : '-';
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading pages...</div>;
  }

  if (error) {
    return (
      <Alert className="m-4" variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load pages</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pages</h2>
        <Button onClick={openCreateDialog} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> New Page
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No pages found. Create your first page to get started.
              </TableCell>
            </TableRow>
          ) : (
            pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    page.type === 'dynamic' ? 'bg-purple-100 text-purple-800' : 
                    page.type === 'system' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {page.type}
                  </span>
                </TableCell>
                <TableCell>{getParentTitle(page.parent_id)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleToggleVisibility(page)}
                    title={page.visible ? "Visible" : "Hidden"}
                  >
                    {page.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditDialog(page)}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openDeleteDialog(page)}
                      title="Delete"
                      disabled={page.type !== 'custom'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="View page"
                    >
                      <a 
                        href={page.slug === 'home' ? '/' : `/${page.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Create Page Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    placeholder="About Us" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input 
                    id="slug" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleInputChange} 
                    placeholder="about-us"
                  />
                  <p className="text-xs text-gray-500">
                    This will be the URL path: /{formData.slug}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Page Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select page type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="dynamic">Dynamic</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Custom: User-defined content | System: Core pages | Dynamic: Content from other modules
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent_id">Parent Page</Label>
                  <Select 
                    value={formData.parent_id} 
                    onValueChange={(value) => handleSelectChange('parent_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (Top Level)</SelectItem>
                      {pages.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="visible" 
                    checked={formData.visible} 
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('visible', checked as boolean)
                    } 
                  />
                  <Label htmlFor="visible">Visible in navigation</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Input 
                    id="meta_description" 
                    name="meta_description" 
                    value={formData.meta_description} 
                    onChange={handleInputChange} 
                    placeholder="Brief description for search engines" 
                  />
                  <p className="text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <Input 
                    id="meta_keywords" 
                    name="meta_keywords" 
                    value={formData.meta_keywords} 
                    onChange={handleInputChange} 
                    placeholder="keyword1, keyword2, keyword3" 
                  />
                  <p className="text-xs text-gray-500">
                    Comma-separated keywords
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePage}>
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Page Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    placeholder="About Us" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input 
                    id="slug" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleInputChange} 
                    placeholder="about-us"
                    disabled={currentPage?.type === 'system' || currentPage?.type === 'dynamic'}
                  />
                  <p className="text-xs text-gray-500">
                    This will be the URL path: /{formData.slug}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Page Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                    disabled={currentPage?.type === 'system' || currentPage?.type === 'dynamic'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select page type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="dynamic">Dynamic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent_id">Parent Page</Label>
                  <Select 
                    value={formData.parent_id} 
                    onValueChange={(value) => handleSelectChange('parent_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (Top Level)</SelectItem>
                      {pages
                        .filter(p => p.id !== currentPage?.id) // Cannot set self as parent
                        .map(p => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.title}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="visible" 
                    checked={formData.visible} 
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('visible', checked as boolean)
                    } 
                  />
                  <Label htmlFor="visible">Visible in navigation</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Input 
                    id="meta_description" 
                    name="meta_description" 
                    value={formData.meta_description} 
                    onChange={handleInputChange} 
                    placeholder="Brief description for search engines" 
                  />
                  <p className="text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <Input 
                    id="meta_keywords" 
                    name="meta_keywords" 
                    value={formData.meta_keywords} 
                    onChange={handleInputChange} 
                    placeholder="keyword1, keyword2, keyword3" 
                  />
                  <p className="text-xs text-gray-500">
                    Comma-separated keywords
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePage}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Page Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the page "{currentPage?.title}"?</p>
            <p className="text-sm text-red-600 mt-2">
              This action cannot be undone. Any content blocks on this page will also be deleted.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageManager;
