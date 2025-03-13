
import { Video } from 'lucide-react';

interface MediaItemProps {
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

const MediaGridItem = ({ item, isSelected, onClick }: MediaItemProps) => {
  return (
    <div
      className={`relative border rounded-lg overflow-hidden group cursor-pointer
        ${isSelected ? 'ring-2 ring-gym-orange' : ''}`}
      onClick={onClick}
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
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-gym-orange text-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MediaGridItem;
