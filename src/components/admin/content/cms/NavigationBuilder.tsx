import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useNavItems } from '@/hooks/cms/useNavItems';
import { useCmsPages } from '@/hooks/cms/useCmsPages';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NavItem } from '@/services/cms/cmsService';
import { Pencil, Trash2, Plus, GripVertical, Eye, EyeOff, ExternalLink } from 'lucide-react';

const NavigationBuilder = () => {
  const { navItems, isLoading, reorderNavItems, createNavItem, updateNavItem, deleteNavItem } = useNavItems();
  const { pages } = useCmsPages();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNavItem, setCurrentNavItem] = useState<NavItem | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    linkedPageId: '',
    externalUrl: '',
    navGroup: 'header',
    visible: true,
    orderIndex: 0,
  });
  
  const navGroups = Array.from(new Set([...navItems.map(item => item.nav_group)].filter(Boolean))) as string[];
  const groupedNavItems = navItems.reduce((acc: Record<string, NavItem[]>, item) => {
    const group = item.nav_group || 'header';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  // Sort groups alphabetically but ensure header is first
  const sortedNavGroups = ['header', ...navGroups.filter(g => g !== 'header').sort()];
  
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
      label: '',
      linkedPageId: '',
      externalUrl: '',
      navGroup: 'header',
      visible: true,
      orderIndex: navItems.length,
    });
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (navItem: NavItem) => {
    setCurrentNavItem(navItem);
    setFormData({
      label: navItem.label,
      linkedPageId: navItem.linked_page_id || '',
      externalUrl: navItem.external_url || '',
      navGroup: navItem.nav_group || 'header',
      visible: navItem.visible,
      orderIndex: navItem.order_index,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (navItem: NavItem) => {
    setCurrentNavItem(navItem);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateNavItem = () => {
    createNavItem({
      label: formData.label,
      linked_page_id: formData.linkedPageId || null,
      external_url: formData.externalUrl || null,
      nav_group: formData.navGroup,
      order_index: formData.orderIndex,
      visible: formData.visible,
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateNavItem = () => {
    if (currentNavItem) {
      updateNavItem({
        id: currentNavItem.id,
        navItem: {
          label: formData.label,
          linked_page_id: formData.linkedPageId || null,
          external_url: formData.externalUrl || null,
          nav_group: formData.navGroup,
          visible: formData.visible,
        }
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteNavItem = () => {
    if (currentNavItem) {
      deleteNavItem(currentNavItem.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleVisibility = (navItem: NavItem) => {
    updateNavItem({
      id: navItem.id,
      navItem: { visible: !navItem.visible }
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;
    
    // Reordering within the same group
    const sourceGroup = source.droppableId;
    const destGroup = destination.droppableId;
    
    if (sourceGroup === destGroup) {
      const items = Array.from(groupedNavItems[sourceGroup] || []);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      
      // Update order indices
      const updatedItems = items.map((item, index) => ({
        id: item.id,
        order_index: index
      }));
      
      reorderNavItems(updatedItems);
    } else {
      // Moving between groups
      const sourceItems = Array.from(groupedNavItems[sourceGroup] || []);
      const destItems = Array.from(groupedNavItems[destGroup] || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      
      // Update the group of the moved item
      updateNavItem({
        id: movedItem.id,
        navItem: { 
          nav_group: destGroup,
          order_index: destination.index
        }
      });
      
      // Update all indices
      destItems.splice(destination.index, 0, {
        ...movedItem,
        nav_group: destGroup
      });
      
      const sourceUpdates = sourceItems.map((item, index) => ({
        id: item.id,
        order_index: index
      }));
      
      const destUpdates = destItems.map((item, index) => ({
        id: item.id,
        order_index: index
      }));
      
      reorderNavItems([...sourceUpdates, ...destUpdates]);
    }
  };

  const getItemStyle = (isDragging: boolean) => ({
    background: isDragging ? 'rgba(249, 250, 251, 1)' : 'white',
    boxShadow: isDragging ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading navigation items...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Navigation Builder</h2>
        <Button onClick={openCreateDialog} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> New Nav Item
        </Button>
      </div>

      <p className="text-gray-600 text-sm">
        Drag and drop navigation items to reorder them. You can move items between groups to create dropdown menus.
      </p>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-6">
          {sortedNavGroups.map((group) => (
            <Card key={group} className="overflow-hidden">
              <h3 className="text-md font-medium p-4 bg-muted">
                {group === 'header' ? 'Main Navigation' : `Dropdown: ${group}`}
              </h3>
              <CardContent className="p-0">
                <Droppable droppableId={group}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[50px]"
                    >
                      {(groupedNavItems[group] || [])
                        .sort((a, b) => a.order_index - b.order_index)
                        .map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="p-3 border-b last:border-b-0 flex items-center justify-between"
                                style={{
                                  ...getItemStyle(snapshot.isDragging),
                                  ...provided.draggableProps.style
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <span>{item.label}</span>
                                  {!item.visible && (
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                                      Hidden
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleToggleVisibility(item)}
                                    title={item.visible ? "Hide" : "Show"}
                                  >
                                    {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openEditDialog(item)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openDeleteDialog(item)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  {item.linked_page_id && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      asChild
                                    >
                                      <a 
                                        href={getPagePath(item.linked_page_id, pages)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  )}
                                  {item.external_url && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      asChild
                                    >
                                      <a 
                                        href={item.external_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                      {(!groupedNavItems[group] || groupedNavItems[group].length === 0) && (
                        <div className="p-4 text-center text-gray-500">
                          No navigation items in this group. Drag items here or add a new one.
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>

      {/* Create Navigation Item Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Navigation Item</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Navigation Label</Label>
              <Input 
                id="label" 
                name="label" 
                value={formData.label} 
                onChange={handleInputChange} 
                placeholder="About Us" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Link Target (Choose one)</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedPageId" className="text-sm font-normal">Internal Page</Label>
                  <Select 
                    value={formData.linkedPageId} 
                    onValueChange={(value) => {
                      handleSelectChange('linkedPageId', value);
                      if (value) handleSelectChange('externalUrl', '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (External URL)</SelectItem>
                      {pages.map(page => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="externalUrl" className="text-sm font-normal">External URL</Label>
                  <Input 
                    id="externalUrl" 
                    name="externalUrl" 
                    value={formData.externalUrl} 
                    onChange={(e) => {
                      handleInputChange(e);
                      if (e.target.value) handleSelectChange('linkedPageId', '');
                    }} 
                    placeholder="https://example.com" 
                    disabled={!!formData.linkedPageId}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="navGroup">Navigation Group</Label>
              <div className="flex gap-2 items-center">
                <Select 
                  value={formData.navGroup} 
                  onValueChange={(value) => handleSelectChange('navGroup', value)}
                >
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Main Navigation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Main Navigation</SelectItem>
                    {navGroups.filter(g => g !== 'header').map(group => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {formData.navGroup === 'new' && (
              <div className="space-y-2">
                <Label htmlFor="newNavGroup">New Group Name</Label>
                <Input 
                  id="newNavGroup" 
                  name="newNavGroup" 
                  placeholder="Services" 
                  onChange={(e) => handleSelectChange('navGroup', e.target.value)}
                />
              </div>
            )}
            
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNavItem}
              disabled={!formData.label || (!formData.linkedPageId && !formData.externalUrl)}
            >
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Navigation Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Navigation Item</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Navigation Label</Label>
              <Input 
                id="label" 
                name="label" 
                value={formData.label} 
                onChange={handleInputChange} 
                placeholder="About Us" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Link Target (Choose one)</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedPageId" className="text-sm font-normal">Internal Page</Label>
                  <Select 
                    value={formData.linkedPageId} 
                    onValueChange={(value) => {
                      handleSelectChange('linkedPageId', value);
                      if (value) handleSelectChange('externalUrl', '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (External URL)</SelectItem>
                      {pages.map(page => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="externalUrl" className="text-sm font-normal">External URL</Label>
                  <Input 
                    id="externalUrl" 
                    name="externalUrl" 
                    value={formData.externalUrl} 
                    onChange={(e) => {
                      handleInputChange(e);
                      if (e.target.value) handleSelectChange('linkedPageId', '');
                    }} 
                    placeholder="https://example.com" 
                    disabled={!!formData.linkedPageId}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="navGroup">Navigation Group</Label>
              <div className="flex gap-2 items-center">
                <Select 
                  value={formData.navGroup} 
                  onValueChange={(value) => handleSelectChange('navGroup', value)}
                >
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Main Navigation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Main Navigation</SelectItem>
                    {navGroups.filter(g => g !== 'header').map(group => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {formData.navGroup === 'new' && (
              <div className="space-y-2">
                <Label htmlFor="newNavGroup">New Group Name</Label>
                <Input 
                  id="newNavGroup" 
                  name="newNavGroup" 
                  placeholder="Services" 
                  onChange={(e) => handleSelectChange('navGroup', e.target.value)}
                />
              </div>
            )}
            
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateNavItem}
              disabled={!formData.label || (!formData.linkedPageId && !formData.externalUrl)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Navigation Item Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Navigation Item</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the navigation item "{currentNavItem?.label}"?</p>
            <p className="text-sm text-red-600 mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteNavItem}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to get page path from page ID
function getPagePath(pageId: string, pages: any[]): string {
  const page = pages.find(p => p.id === pageId);
  if (page) {
    return page.slug === 'home' ? '/' : `/${page.slug}`;
  }
  return '/';
}

export default NavigationBuilder;
