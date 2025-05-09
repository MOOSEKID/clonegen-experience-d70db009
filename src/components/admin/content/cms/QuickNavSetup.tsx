
import React, { useState } from 'react';
import { useCmsPages } from '@/hooks/cms/useCmsPages';
import { useNavItems } from '@/hooks/cms/useNavItems';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2, RefreshCw, Check } from 'lucide-react';

const QuickNavSetup: React.FC = () => {
  const { pages, isLoading: pagesLoading } = useCmsPages();
  const { createNavItem, isPending, navItems } = useNavItems();
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  
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
      setProcessing(true);
      const selectedPageObjects = pages.filter(page => selectedPages.includes(page.id));
      
      // Create navigation items
      for (let i = 0; i < selectedPageObjects.length; i++) {
        const page = selectedPageObjects[i];
        await createNavItem({
          label: page.title,
          linked_page_id: page.id,
          nav_group: 'header',
          order_index: i,
          visible: true
        });
      }
      
      toast.success(`${selectedPageObjects.length} navigation items created successfully`);
      setSelectedPages([]);
      setSetupComplete(true);
    } catch (error) {
      console.error("Error creating navigation items:", error);
      toast.error("Failed to create navigation items");
    } finally {
      setProcessing(false);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedPages.length === mainMenuPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(mainMenuPages.map(page => page.id));
    }
  };
  
  // Automatically select common pages for convenience
  const handleSelectCommonPages = () => {
    const commonSlugs = ['home', 'shop', 'membership', 'classes', 'blogs', 'contact-us'];
    const commonPageIds = pages
      .filter(page => commonSlugs.includes(page.slug))
      .map(page => page.id);
    
    setSelectedPages(commonPageIds);
  };
  
  // Show success message if we already have navigation items
  if (navItems.length > 0 && !setupComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Check className="mr-2 h-5 w-5 text-green-500" />
            Navigation Setup Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your site navigation has been set up with {navItems.length} navigation items.</p>
          <p className="mt-2">Visit your home page to see the navigation in action.</p>
        </CardContent>
      </Card>
    );
  }
  
  if (pagesLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading pages...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Navigation Setup</CardTitle>
        <CardDescription>
          Set up your site navigation by selecting pages to include in the main menu
        </CardDescription>
      </CardHeader>
      <CardContent>
        {setupComplete ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Navigation Created Successfully!</h3>
            <p className="text-muted-foreground">
              Your site navigation has been set up. Visit your home page to see it in action.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="mt-2"
            >
              View Site
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-4">Select pages to add to the main navigation:</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAll}
              >
                {selectedPages.length === mainMenuPages.length && mainMenuPages.length > 0 
                  ? "Deselect All" 
                  : "Select All"
                }
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectCommonPages}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Select Common Pages
              </Button>
            </div>
            
            <div className="space-y-2 mb-6">
              {mainMenuPages.length > 0 ? (
                mainMenuPages.map(page => (
                  <div key={page.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                    <Checkbox 
                      id={`page-${page.id}`}
                      checked={selectedPages.includes(page.id)}
                      onCheckedChange={(checked) => handleSelectPage(page.id, checked === true)}
                    />
                    <label 
                      htmlFor={`page-${page.id}`}
                      className="flex flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {page.title}
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({page.slug === 'home' ? '/' : `/${page.slug}`})
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center border rounded-md bg-muted">
                  <p className="text-gray-500 text-sm">No eligible pages found. Please sync routes first.</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleCreateNavItems} 
              disabled={selectedPages.length === 0 || isPending || processing}
              className="w-full"
            >
              {(isPending || processing) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Navigation Items'
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickNavSetup;
