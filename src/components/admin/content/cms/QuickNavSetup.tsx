
import React, { useState } from 'react';
import { useCmsPages } from '@/hooks/cms/useCmsPages';
import { useNavItems } from '@/hooks/cms/useNavItems';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const QuickNavSetup: React.FC = () => {
  const { pages, isLoading: pagesLoading } = useCmsPages();
  const { createNavItem, isPending } = useNavItems();
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  
  const mainMenuPages = pages.filter(page => 
    // Filter out pages that should not be in main navigation
    !page.slug.includes('dashboard') && 
    !page.slug.includes('admin') && 
    page.visible
  );
  
  const handleSelectPage = (pageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId]);
    } else {
      setSelectedPages(selectedPages.filter(id => id !== pageId));
    }
  };
  
  const handleCreateNavItems = async () => {
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page");
      return;
    }
    
    try {
      const selectedPageObjects = pages.filter(page => selectedPages.includes(page.id));
      
      // Create navigation items
      for (let i = 0; i < selectedPageObjects.length; i++) {
        const page = selectedPageObjects[i];
        await createNavItem({
          label: page.title,
          linked_page_id: page.id,
          nav_group: 'Main Navigation',
          order_index: i,
          visible: true
        });
      }
      
      toast.success(`${selectedPageObjects.length} navigation items created successfully`);
      setSelectedPages([]);
    } catch (error) {
      console.error("Error creating navigation items:", error);
      toast.error("Failed to create navigation items");
    }
  };
  
  if (pagesLoading) {
    return <div className="p-8 text-center">Loading pages...</div>;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Navigation Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Select pages to add to the main navigation:</p>
        
        <div className="space-y-2 mb-6">
          {mainMenuPages.length > 0 ? (
            mainMenuPages.map(page => (
              <div key={page.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`page-${page.id}`}
                  checked={selectedPages.includes(page.id)}
                  onCheckedChange={(checked) => handleSelectPage(page.id, checked === true)}
                />
                <label 
                  htmlFor={`page-${page.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {page.title}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No eligible pages found. Please sync routes first.</p>
          )}
        </div>
        
        <Button 
          onClick={handleCreateNavItems} 
          disabled={selectedPages.length === 0 || isPending}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Navigation Items'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickNavSetup;
