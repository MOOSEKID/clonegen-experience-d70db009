import { useState } from 'react';
import { FileText, Image, Layout, Video, DollarSign, Search, Monitor } from 'lucide-react';
import ContentEditor from '@/components/admin/content/ContentEditor';
import MediaLibrary from '@/components/admin/content/MediaLibrary';
import PageSelector from '@/components/admin/content/PageSelector';
import SitePreview from '@/components/admin/content/SitePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminContent = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [isDirty, setIsDirty] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
    setIsDirty(false);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate publishing delay
    setTimeout(() => {
      toast.success("Changes published successfully");
      setIsDirty(false);
      setIsPublishing(false);
    }, 1500);
  };

  const handleRevert = () => {
    toast.info("Reverted to last published version");
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-500">Edit and manage your website content</p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className={showPreview ? "bg-gray-100" : ""}
          >
            <Monitor className="h-4 w-4 mr-2" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={!isDirty}
          >
            Save Draft
          </Button>
          <Button 
            variant="outline" 
            onClick={handleRevert}
            disabled={!isDirty}
          >
            Revert Changes
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={!isDirty || isPublishing}
            className="bg-gym-orange hover:bg-gym-orange/90"
          >
            {isPublishing ? "Publishing..." : "Publish Changes"}
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none p-0">
            <TabsTrigger value="editor" className="rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-gym-orange">
              <Layout className="h-4 w-4 mr-2" />
              Page Editor
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gym-orange">
              <Image className="h-4 w-4 mr-2" />
              Media Library
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gym-orange">
              <Search className="h-4 w-4 mr-2" />
              SEO Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="p-0">
            <div className="flex h-[calc(100vh-280px)]">
              <PageSelector selectedPage={selectedPage} onSelectPage={setSelectedPage} />
              
              <div className={`flex-1 ${showPreview ? 'flex' : ''}`}>
                <ContentEditor 
                  selectedPage={selectedPage} 
                  onContentChange={() => setIsDirty(true)}
                  className={showPreview ? 'w-1/2 border-r' : 'w-full'}
                />
                
                {showPreview && (
                  <div className="w-1/2 p-4 overflow-auto">
                    <SitePreview selectedPage={selectedPage} />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="p-6">
            <MediaLibrary onUpload={() => setIsDirty(true)} />
          </TabsContent>
          
          <TabsContent value="seo" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">SEO Settings for {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page</h3>
              <SeoSettingsForm selectedPage={selectedPage} onSettingsChange={() => setIsDirty(true)} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// SEO Settings Form Component
const SeoSettingsForm = ({ selectedPage, onSettingsChange }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-2">
        <label htmlFor="meta-title" className="text-sm font-medium">Meta Title</label>
        <input 
          id="meta-title" 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Page title for search engines"
          defaultValue={`Uptown Gym - ${selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}`}
          onChange={onSettingsChange}
        />
        <p className="text-xs text-gray-500">Recommended length: 50-60 characters</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="meta-description" className="text-sm font-medium">Meta Description</label>
        <textarea 
          id="meta-description" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Brief description for search engine results"
          rows={3}
          defaultValue={`Uptown Gym offers premium fitness facilities and expert trainers. Visit our ${selectedPage} page to learn more.`}
          onChange={onSettingsChange}
        />
        <p className="text-xs text-gray-500">Recommended length: 150-160 characters</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="keywords" className="text-sm font-medium">Keywords</label>
        <input 
          id="keywords" 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Comma-separated keywords"
          defaultValue="gym, fitness, workout, health, wellness"
          onChange={onSettingsChange}
        />
      </div>
    </div>
  );
};

export default AdminContent;
