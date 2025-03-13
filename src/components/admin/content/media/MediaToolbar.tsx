
import { Search, Grid2X2, List, UploadCloud, Trash, Download } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MediaUploadDialog from './MediaUploadDialog';

interface MediaToolbarProps {
  mediaType: 'images' | 'videos';
  setMediaType: (type: 'images' | 'videos') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedItems: string[];
  handleUpload: () => void;
  handleDelete: () => void;
}

const MediaToolbar = ({
  mediaType,
  setMediaType,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedItems,
  handleUpload,
  handleDelete
}: MediaToolbarProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <TabsList>
          <TabsTrigger 
            value="images" 
            onClick={() => setMediaType('images')}
            className={mediaType === 'images' ? 'bg-gray-200' : ''}
          >
            <Grid2X2 className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger 
            value="videos" 
            onClick={() => setMediaType('videos')}
            className={mediaType === 'videos' ? 'bg-gray-200' : ''}
          >
            <List className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
        </TabsList>
        
        <div className="border rounded-md flex">
          <button 
            className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <Grid2X2 size={16} />
          </button>
          <button
            className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media..."
            className="pl-8 w-52"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-1 bg-gym-orange hover:bg-gym-orange/90">
              <UploadCloud className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </DialogTrigger>
          <MediaUploadDialog mediaType={mediaType} handleUpload={handleUpload} />
        </Dialog>
        
        {selectedItems.length > 0 && (
          <>
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="flex items-center space-x-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button 
              variant="outline"
              className="flex items-center space-x-1"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaToolbar;
