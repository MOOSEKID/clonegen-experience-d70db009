
import { Video } from 'lucide-react';

interface MediaListItemProps {
  item: {
    id: string;
    url: string;
    thumbnail: string;
    name: string;
    type: string;
    size: string;
    date: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const MediaListItem = ({ item, isSelected, onClick }: MediaListItemProps) => {
  return (
    <tr 
      className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-orange-50' : ''}`}
      onClick={onClick}
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
  );
};

export default MediaListItem;
