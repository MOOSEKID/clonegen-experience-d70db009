
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Video, 
  Trash, 
  Download, 
  Search,
  Grid2X2,
  List
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Update the mock data to include thumbnail property for both images and videos
const mockImages = [
  {
    id: 'img1',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    name: 'gym-interior.jpg',
    type: 'image',
    size: '1.2 MB',
    date: '2023-05-15'
  },
  {
    id: 'img2',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    name: 'trainer.jpg',
    type: 'image',
    size: '856 KB',
    date: '2023-06-22'
  },
  {
    id: 'img3',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    name: 'weights.jpg',
    type: 'image',
    size: '1.5 MB',
    date: '2023-04-10'
  },
  {
    id: 'img4',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop',
    name: 'boxing.jpg',
    type: 'image',
    size: '984 KB',
    date: '2023-07-05'
  },
  {
    id: 'img5',
    url: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop',
    name: 'yoga.jpg',
    type: 'image',
    size: '1.1 MB',
    date: '2023-03-18'
  },
  {
    id: 'img6',
    url: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop',
    name: 'swimming.jpg',
    type: 'image',
    size: '1.3 MB',
    date: '2023-08-12'
  }
];

const mockVideos = [
  {
    id: 'vid1',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    name: 'workout-tutorial.mp4',
    type: 'video',
    size: '24.5 MB',
    date: '2023-06-10'
  },
  {
    id: 'vid2',
    url: 'https://www.youtube.com/embed/UBMk30rjy0o',
    thumbnail: 'https://img.youtube.com/vi/UBMk30rjy0o/hqdefault.jpg',
    name: 'stretching-guide.mp4',
    type: 'video',
    size: '18.2 MB',
    date: '2023-07-22'
  }
];

interface MediaLibraryProps {
  onUpload: () => void;
}

const MediaLibrary = ({ onUpload }: MediaLibraryProps) => {
  const [mediaType, setMediaType] = useState<'images' | 'videos'>('images');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const mediaItems = mediaType === 'images' ? mockImages : mockVideos;
  
  const filteredItems = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleItemClick = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const handleUpload = () => {
    toast.success('Media uploaded successfully');
    onUpload();
  };
  
  const handleDelete = () => {
    toast.success(`${selectedItems.length} item(s) deleted`);
    setSelectedItems([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <TabsList>
            <TabsTrigger 
              value="images" 
              onClick={() => setMediaType('images')}
              className={mediaType === 'images' ? 'bg-gray-200' : ''}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              onClick={() => setMediaType('videos')}
              className={mediaType === 'videos' ? 'bg-gray-200' : ''}
            >
              <Video className="h-4 w-4 mr-2" />
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
              </DialogHeader>
              <div className="border-2 border-dashed rounded-lg p-10 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <Label htmlFor="media-upload" className="cursor-pointer">
                  <span className="bg-gym-orange text-white px-4 py-2 rounded-md hover:bg-gym-orange/90 transition-colors inline-block">
                    Select Files
                  </span>
                  <input
                    id="media-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept={mediaType === 'images' ? 'image/*' : 'video/*'}
                  />
                </Label>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={handleUpload}
              >
                Upload Files
              </Button>
            </DialogContent>
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
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No media files found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`relative border rounded-lg overflow-hidden group cursor-pointer
                ${selectedItems.includes(item.id) ? 'ring-2 ring-gym-orange' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.name} 
                  className="w-full h-24 object-cover"
                />
              ) : (
                <div className="relative w-full h-24">
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                      <Video className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              )}
              <div className="p-2">
                <p className="text-xs truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              
              {selectedItems.includes(item.id) && (
                <div className="absolute top-2 right-2 bg-gym-orange text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map(item => (
                <tr 
                  key={item.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedItems.includes(item.id) ? 'bg-orange-50' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {item.type === 'image' ? (
                        <div className="h-10 w-10 rounded overflow-hidden">
                          <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-1">
                              <Video className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
