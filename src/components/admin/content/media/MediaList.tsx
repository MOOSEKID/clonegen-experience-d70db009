
import MediaListItem from './MediaListItem';
import { MediaItem } from './MediaData';

interface MediaListProps {
  items: MediaItem[];
  selectedItems: string[];
  onItemClick: (id: string) => void;
}

const MediaList = ({ items, selectedItems, onItemClick }: MediaListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">No media files found</p>
      </div>
    );
  }

  return (
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
          {items.map(item => (
            <MediaListItem
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaList;
