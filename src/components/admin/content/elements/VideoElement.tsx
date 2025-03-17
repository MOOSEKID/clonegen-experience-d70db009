
import { ElementProperties } from '@/types/content.types';

interface VideoElementProps {
  content: string;
  properties: ElementProperties;
  videoUrl?: string;
  isEditing: boolean;
}

const VideoElement = ({ properties, videoUrl, isEditing }: VideoElementProps) => {
  const getSizeClass = () => {
    switch (properties.size) {
      case 'sm': return 'max-w-[300px] aspect-video';
      case 'md': return 'max-w-[500px] aspect-video';
      case 'lg': return 'max-w-[700px] aspect-video';
      case 'full': return 'w-full aspect-video';
      default: return 'max-w-[500px] aspect-video';
    }
  };

  const getAlignClass = () => {
    switch (properties.align) {
      case 'left': return 'mr-auto';
      case 'center': return 'mx-auto';
      case 'right': return 'ml-auto';
      default: return 'mx-auto';
    }
  };

  const getPaddingClass = () => {
    switch (properties.padding) {
      case 'sm': return 'p-2';
      case 'md': return 'p-4';
      case 'lg': return 'p-6';
      default: return '';
    }
  };

  // Basic function to get embed URL from YouTube or Vimeo URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }
    
    // Return original URL if no matches
    return url;
  };

  return (
    <div className={`${getPaddingClass()}`}>
      <div className={`${getSizeClass()} ${getAlignClass()}`}>
        {videoUrl ? (
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-muted-foreground">
              {isEditing ? "Enter a video URL in the properties panel" : "No video URL provided"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoElement;
