
import { useState } from 'react';
import { FileText, Image, Layout, Video, DollarSign, Search, Monitor, Smartphone, Tablet } from 'lucide-react';
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
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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

  const togglePreviewMode = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-500">Edit and manage your website content</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={togglePreviewMode}
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
          <TabsList className="w-full justify-start border-b rounded-none p-0 overflow-x-auto">
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
            <div className="flex flex-col h-[calc(100vh-280px)]">
              <div className="flex md:hidden p-2 border-b">
                <PageSelector 
                  selectedPage={selectedPage} 
                  onSelectPage={setSelectedPage} 
                  isMobileSidebarOpen={true}
                />
              </div>
              
              <div className="flex flex-1 h-full">
                <PageSelector 
                  selectedPage={selectedPage} 
                  onSelectPage={setSelectedPage}
                  className="hidden md:block"
                />
                
                <div className={`flex-1 ${showPreview ? 'flex flex-col lg:flex-row' : ''} h-full overflow-hidden`}>
                  <ContentEditor 
                    selectedPage={selectedPage} 
                    onContentChange={() => setIsDirty(true)}
                    className={showPreview ? 'lg:w-1/2 lg:border-r flex-shrink-0' : 'w-full'}
                    showPreview={showPreview}
                  />
                  
                  {showPreview && (
                    <div className="h-80 lg:h-auto w-full lg:w-1/2 p-4 overflow-auto border-t lg:border-t-0">
                      <div className="flex justify-end mb-4">
                        <div className="flex border rounded-md overflow-hidden">
                          <button 
                            className={`p-2 ${previewDevice === 'desktop' ? 'bg-gray-100' : ''}`}
                            onClick={() => setPreviewDevice('desktop')}
                          >
                            <Monitor size={16} />
                          </button>
                          <button
                            className={`p-2 ${previewDevice === 'tablet' ? 'bg-gray-100' : ''}`}
                            onClick={() => setPreviewDevice('tablet')}
                          >
                            <Tablet size={16} />
                          </button>
                          <button
                            className={`p-2 ${previewDevice === 'mobile' ? 'bg-gray-100' : ''}`}
                            onClick={() => setPreviewDevice('mobile')}
                          >
                            <Smartphone size={16} />
                          </button>
                        </div>
                      </div>
                      <div className={`mx-auto transition-all ${
                        previewDevice === 'mobile' ? 'max-w-sm' : 
                        previewDevice === 'tablet' ? 'max-w-2xl' : 
                        'max-w-full'
                      }`}>
                        <SitePreview selectedPage={selectedPage} deviceType={previewDevice} />
                      </div>
                    </div>
                  )}
                </div>
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
