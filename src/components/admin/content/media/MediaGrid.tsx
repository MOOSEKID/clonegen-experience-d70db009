
import MediaGridItem from './MediaGridItem';
import { MediaItem } from './MediaData';

interface MediaGridProps {
  items: MediaItem[];
  selectedItems: string[];
  onItemClick: (id: string) => void;
}

const MediaGrid = ({ items, selectedItems, onItemClick }: MediaGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">No media files found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map(item => (
        <MediaGridItem
          key={item.id}
          item={item}
          isSelected={selectedItems.includes(item.id)}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
