
import { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import MediaToolbar from './media/MediaToolbar';
import MediaGrid from './media/MediaGrid';
import MediaList from './media/MediaList';
import { mockImages, mockVideos } from './media/MediaData';

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
      <MediaToolbar 
        mediaType={mediaType}
        setMediaType={setMediaType}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedItems={selectedItems}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
      />
      
      {viewMode === 'grid' ? (
        <MediaGrid 
          items={filteredItems}
          selectedItems={selectedItems}
          onItemClick={handleItemClick}
        />
      ) : (
        <MediaList 
          items={filteredItems}
          selectedItems={selectedItems}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default MediaLibrary;
